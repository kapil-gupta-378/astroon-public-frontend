import React from 'react';
import styles from './header.module.scss';
import Image from 'next/image';
import searchIcon from '../../../../images/search.png';
import walletIcon from '../../../../images/wallet.png';
import Button from '../../common/Button';

const Header = () => {
  return (
    <>
      <div className={styles.header_wrapper}>
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <a className={`${styles.logo} navbar-brand text-white`} href="#">
              Logo
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
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
                  <Button
                    data-content="WalletConnect"
                    className={`${styles.header_wallet_btn}`}
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

export default Header;
