import React, { useState } from 'react';
import styles from './header.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import walletIcon from '../../../../../public/assets/images/wallet.png';
import Button from '../../../common/button';
import { useEffect } from 'react';
import { useAccount, useConnectModal } from '@web3modal/react';
import DialogBox from '../../../common/dialoag-box';
import metamaskIcon from '../../../../../public/assets/images/metamask-icon.svg';
import { Container, Nav, Navbar } from 'react-bootstrap';
import UserProfileDropDown from '../../../ui/user-profile-dropdown';
const Header = () => {
  const { open } = useConnectModal();
  const { isConnected } = useAccount();

  const [MobileNavExpended, setMobileNavExpended] = useState(false);

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
    <div className="user_header_wrap">
      <Navbar
        expanded={MobileNavExpended}
        collapseOnSelect={true}
        bg="trans"
        variant="dark"
        expand="lg"
      >
        <Container>
          <Navbar.Brand>
            <Link href={'/'}>Logo</Link>
          </Navbar.Brand>
          <Navbar.Toggle
            onClick={() => setMobileNavExpended((value) => !value)}
            aria-controls="basic-navbar-nav"
          />
          <Navbar.Collapse className="items_wrap" id="basic-navbar-nav">
            <Nav className="">
              <Nav.Item onClick={() => setMobileNavExpended(false)}>
                <Link href={'/'}>Home</Link>
              </Nav.Item>
              <Nav.Item
                onClick={() => setMobileNavExpended(false)}
                href="/animation"
              >
                <Link href={'/animation'}>Animation</Link>
              </Nav.Item>
              <Nav.Item onClick={() => setMobileNavExpended(false)}>
                <Link href={'/ast'}>Token</Link>
              </Nav.Item>
              <Nav.Item onClick={() => setMobileNavExpended(false)}>
                <Link href={'/app'}>App</Link>
              </Nav.Item>
              <Nav.Item onClick={() => setMobileNavExpended(false)}>
                <Link href={'/games'}>Games</Link>
              </Nav.Item>
              <Nav.Item onClick={() => setMobileNavExpended(false)}>
                Merch
              </Nav.Item>
              <Nav.Item onClick={() => setMobileNavExpended(false)}>
                <Link href={'/gallery'}>Gallery</Link>
              </Nav.Item>
              <Nav.Item onClick={() => setMobileNavExpended(false)}>
                <Link href={'blog'}>Blog</Link>
              </Nav.Item>
              <Nav.Item onClick={() => setMobileNavExpended(false)}>
                <Button
                  data-content={isConnected ? 'Connected' : 'Connect Wallet'}
                  kind="wallet-connect"
                  onClick={() => setwalletConnetDialog(true)}
                >
                  <Image src={walletIcon} alt="wallet" />
                </Button>
              </Nav.Item>
              <Nav.Item onClick={() => setMobileNavExpended(false)}>
                <UserProfileDropDown />
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
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
  );
};

export { Header };
