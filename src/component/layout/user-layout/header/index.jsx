import React, { useState } from 'react';
import styles from './header.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import walletIcon from '../../../../../public/assets/images/wallet.png';
import Button from '../../../common/button';
import { useEffect } from 'react';
import DialogBox from '../../../common/dialoag-box';
import metamaskIcon from '../../../../../public/assets/images/metamask-icon.svg';
import { Container, Nav, Navbar } from 'react-bootstrap';
import logoIcon from '../../../../../public/assets/images/Logo.png';
import UserProfileDropDown from '../../../ui/user-profile-dropdown';
import {
  getNonceApi,
  varivarifieSignatureApi,
} from '../../../../../services/api/user';
import {
  setIsUserConnected,
  setToken,
} from '../../../../redux/persist/wallet/walletSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getWeb3Provider } from '../../../../../services/web3';
const Header = () => {
  const dispatch = useDispatch();
  const [MobileNavExpended, setMobileNavExpended] = useState(false);

  const [walletConnetDialog, setwalletConnetDialog] = useState(false);
  const { isUserConnected } = useSelector((state) => state.walletReducer);
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', function () {});
      window.ethereum.on('networkChanged', async () => {
        window.location.reload();
      });
    }
  }, []);

  const varifieSignatureAndLogin = async () => {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const { web3 } = await getWeb3Provider();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const data = {
        walletAddress: accounts[0],
      };
      const responseNonce = await getNonceApi(data);
      if (responseNonce.success) {
        let sign = await web3.eth.personal.sign(
          responseNonce.data,
          accounts[0],
        );
        const data = {
          nonce: responseNonce.data,
          signature: sign,
          networkId: networkId,
        };
        const responseSignature = await varivarifieSignatureApi(data);
        if (responseSignature.success) {
          localStorage.setItem('isConnected', true);
          dispatch(setIsUserConnected(true));
          dispatch(setToken(responseSignature.data));
          setwalletConnetDialog(false);
        }
      }
    } catch (error) {
      setwalletConnetDialog(false);
      return error;
    }
  };

  return (
    <div className={`user_header_wrap ${styles.header_wrapper}`}>
      <Navbar
        expanded={MobileNavExpended}
        collapseOnSelect={true}
        bg="trans"
        variant="dark"
        expand="lg"
      >
        <Container>
          <Navbar.Brand>
            <Link href={'/'}>
              <Image
                src={logoIcon}
                height={100}
                width={150}
                layout="fixed"
                alt="logo"
              />
            </Link>
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
                <Link href={'/nft'}>NFT</Link>
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
                <Link href={'/blog'}>Blog</Link>
              </Nav.Item>
              {!isUserConnected && (
                <Nav.Item onClick={() => setMobileNavExpended(false)}>
                  <Button
                    data-content={'Connect Wallet'}
                    kind="wallet-connect"
                    onClick={() => setwalletConnetDialog(true)}
                  >
                    <Image src={walletIcon} alt="wallet" />
                  </Button>
                </Nav.Item>
              )}
              {isUserConnected && (
                <Nav.Item onClick={() => setMobileNavExpended(false)}>
                  <UserProfileDropDown />
                </Nav.Item>
              )}
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
          <button
            onClick={varifieSignatureAndLogin}
            className={styles.wallet_connect_modal_btn}
          >
            {'Wallet Connect'}
          </button>
        </div>
      </DialogBox>
    </div>
  );
};

export { Header };
