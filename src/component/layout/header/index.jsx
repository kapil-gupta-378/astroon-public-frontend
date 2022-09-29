import React, { useRef } from 'react';
import styles from './header.module.scss';
import Image from 'next/image';
import searchIcon from '../../../../public/assets/images/search.png';
import walletIcon from '../../../../public/assets/images/wallet.png';
import Button from '../../common/button';

const Header = () => {
  const header = useRef();

  const handleNav = () => {
    header.current.classList.toggle(styles.open_nav);
  };

  return (
    <>
      <div ref={header} className={styles.header_wrapper}>
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <a className={`${styles.logo} navbar-brand text-white`} href="#">
              Logo
            </a>
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
                  <a
                    className="nav-link text-white active"
                    aria-current="page"
                    href="#"
                  >
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="#">
                    Animation
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="#">
                    Token
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="#">
                    NFT
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="#">
                    App
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="#">
                    Games
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="#">
                    Merch
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="#">
                    Gallery
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="#">
                    Blog
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`${styles.header_search} nav-link text-white`}
                    href="#"
                  >
                    <Image src={searchIcon} alt="search" />
                  </a>
                </li>
                <li className="nav-item">
                  <Button data-content="WalletConnect" kind="wallet-connect">
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

export default Header;
