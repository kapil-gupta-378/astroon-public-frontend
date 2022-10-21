import React, { useRef, useState } from 'react';
import styles from './header.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import searchIcon from '../../../../../public/assets/images/search.png';
import walletIcon from '../../../../../public/assets/images/wallet.png';
import Button from '../../../common/button';
import { useEffect } from 'react';
import { useAccount, useConnectModal } from '@web3modal/react';
import DialogBox from '../../../common/dialoag-box';
import metamaskIcon from '../../../../../public/assets/images/metamask-icon.svg';
const Header = () => {
  const { open } = useConnectModal();
  const { isConnected } = useAccount();
  const header = useRef();
  const handleNav = () => {
    header.current.classList.toggle(styles.open_nav);
  };

  const [walletConnetDialog, setwalletConnetDialog] = useState(false);

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
                {/* <li className="nav-item">
                  <a className={`${styles.header_search} nav-link text-white`}>
                    <Image src={searchIcon} alt="search" />
                  </a>
                </li> */}
                <li className="nav-item">
                  <Button
                    data-content={isConnected ? 'Connected' : 'Connect Wallet'}
                    kind="wallet-connect"
                    onClick={() => setwalletConnetDialog(true)}
                  >
                    <Image src={walletIcon} alt="wallet" />
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <DialogBox
          closeButtonHandler={() => setwalletConnetDialog(false)}
          mainHading={'Connect Your Wallet'}
          handleShow={walletConnetDialog}
        >
          <div className={styles.wallet_connect_modal}>
            <div className={styles.wallet_connect_modal_icon_wrap}>
              <Image
                src={metamaskIcon}
                width={40}
                height={40}
                alt="metamask-icon"
              />
              <span>Metamask</span>
            </div>
            <button onClick={open} className={styles.wallet_connect_modal_btn}>
              {isConnected ? 'Connected ' : 'Wallet Connect'}
            </button>
          </div>
        </DialogBox>
      </div>
    </>
  );
};

export { Header };
