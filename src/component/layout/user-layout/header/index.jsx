import React, { useRef, useState } from 'react';
import styles from './header.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import searchIcon from '../../../../../public/assets/images/search.png';
import walletIcon from '../../../../../public/assets/images/wallet.png';
import Button from '../../../common/button';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import { useEffect } from 'react';

const Header = () => {
  const [chainId, setChainId] = useState();
  const header = useRef();
  const handleNav = () => {
    header.current.classList.toggle(styles.open_nav);
  };

  async function connectwallet() {
    const INFURA_ID = '460f40a260564ac4a4f4b3fffb032dad';

    const providerOptions = {
      walletconnect: {
        // package: WalletConnectProvider, // required
        options: {
          infuraId: INFURA_ID, // required
        },
      },
    };
    let web3Modal;

    if (typeof window !== 'undefined') {
      web3Modal = new Web3Modal({
        network: 'mainnet', // optional
        cacheProvider: true,
        providerOptions, // required
      });
    }
    try {
      const provider = await web3Modal.connect();
      const web3 = new Web3(provider);
      const chainId = await web3.eth.getChainId();
      setChainId(chainId);
    } catch (error) {
      return chainId;
    }
  }
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', function () {});
      window.ethereum.on('networkChanged', async () => {
        window.location.reload();
      });
    }
  }, []);

  return (
    <>
      <div ref={header} className={styles.header_wrapper}>
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <Link href="/">
              <a className={`${styles.logo} navbar-brand text-white`}>Logo</a>
            </Link>
            <button
              className={`${styles.nav_toggeler} navbar-toggler`}
              type="button"
              onClick={handleNav}
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="menu 1">
                  <path
                    id="off"
                    d="M3 12H21"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="openfirst"
                    d="M3 6H21"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="openlast"
                    d="M3 18H21"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
            </button>
            <div
              className={`collapse navbar-collapse ${styles.nav_items_wrapper}`}
              id="navbarSupportedContent"
            >
              <ul
                className={`${styles.nav_items} navbar-nav mx-auto mb-2 mb-lg-0`}
              >
                <li className="nav-item">
                  <Link href="/">
                    <a
                      className="nav-link text-white active"
                      aria-current="page"
                    >
                      Home
                    </a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/animation">
                    <a className="nav-link text-white">Animation</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/ast">
                    <a className="nav-link text-white">Token</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/app">
                    <a className="nav-link text-white">App</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/games">
                    <a className="nav-link text-white">Games</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white">Merch</a>
                </li>
                <li className="nav-item">
                  <Link href="/gallery">
                    <a className="nav-link text-white">Gallery</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/blog">
                    <a className="nav-link text-white">Blog</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <a className={`${styles.header_search} nav-link text-white`}>
                    <Image src={searchIcon} alt="search" />
                  </a>
                </li>
                <li className="nav-item">
                  <Button
                    data-content="WalletConnect"
                    kind="wallet-connect"
                    onClick={connectwallet}
                  >
                    <Image src={walletIcon} alt="wallet" />
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export { Header };
