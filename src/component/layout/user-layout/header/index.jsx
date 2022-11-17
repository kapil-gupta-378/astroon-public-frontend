import React, { useState } from 'react';
import styles from './header.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import walletIcon from '../../../../../public/assets/images/wallet.png';
import Button from '../../../common/button';
import { useEffect } from 'react';
import DialogBox from '../../../common/dialoag-box';
import metamaskIcon from '../../../../../public/assets/images/metamask-icon.svg';
import { Container, Nav, Navbar, ToastContainer } from 'react-bootstrap';
import logoIcon from '../../../../../public/assets/images/Logo.png';
import UserProfileDropDown from '../../../ui/user-profile-dropdown';
import {
  getNonceApi,
  varivarifieSignatureApi,
} from '../../../../../services/api/user';
import {
  setBalance,
  setIsUserConnected,
  setToken,
  setWalletAddress,
} from '../../../../redux/persist/wallet/walletSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getWeb3Provider } from '../../../../../services/web3/web3ProviderMethods';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { getWalletAstTokenBalance } from '../../../../../services/web3/walletMothods';
import { fetchCurrencyData } from '../../../../redux/currency/currencyAction';
import { fetchUserDataAction } from '../../../../redux/user/userAction';
const envNetworkId = process.env.NEXT_PUBLIC_ETHEREUM_NETWORK_ID;
const envNetworkIdInHex = process.env.NEXT_PUBLIC_ETHEREUM_NETWORK_ID_IN_HEX;
const Header = () => {
  const dispatch = useDispatch();
  const [MobileNavExpended, setMobileNavExpended] = useState(false);
  const route = useRouter();
  const [walletConnetDialog, setwalletConnectDialog] = useState(false);
  const { isUserConnected } = useSelector((state) => state.walletReducer);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', function () {});
      window.ethereum.on('networkChanged', async () => {
        window.location.reload();
      });
    }
    dispatch(fetchCurrencyData());
    dispatch(fetchCurrencyData());
    dispatch(fetchUserDataAction());
  }, []);

  const connectWallet = async () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      const { web3 } = await getWeb3Provider();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      if (envNetworkId !== networkId) {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: envNetworkIdInHex }],
        });
      }
      varifieSignature(accounts[0], networkId);
    } else {
      toast.error('Please download metamask extention', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      window.location.href =
        process.env.NEXT_PUBLIC_METAMASK_DOWNLOAD_LINK_FOR_MOBILE;
    }
  };

  const varifieSignature = async (address, networkId) => {
    try {
      const { web3 } = await getWeb3Provider();
      const data = {
        walletAddress: address,
      };
      const responseNonce = await getNonceApi(data);
      if (responseNonce.success) {
        let sign = await web3.eth.personal.sign(responseNonce.data, address);
        const data = {
          nonce: responseNonce.data,
          signature: sign,
          networkId: networkId,
        };
        const responseSignature = await varivarifieSignatureApi(data);
        const walletBalance = await getWalletAstTokenBalance(address);

        if (responseSignature.success) {
          localStorage.setItem('isConnected', true);
          localStorage.setItem('userToken', responseSignature.data.token);
          dispatch(setIsUserConnected(true));
          dispatch(setToken(responseSignature.data.token));
          dispatch(setWalletAddress(address));
          dispatch(setBalance(walletBalance));
          setwalletConnectDialog(false);
          toast.success('Wallet Connected', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          route.push(`/user-profile/${address}`);
        }
      }
    } catch (error) {
      setwalletConnectDialog(false);
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
                    onClick={() => setwalletConnectDialog(true)}
                  >
                    <Image src={walletIcon} alt="wallet" />
                  </Button>
                </Nav.Item>
              )}
              {isUserConnected && (
                <Nav.Item>
                  <UserProfileDropDown />
                </Nav.Item>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <DialogBox
        closeButtonHandler={() => setwalletConnectDialog(false)}
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
            onClick={connectWallet}
            className={styles.wallet_connect_modal_btn}
          >
            {'Wallet Connect'}
          </button>
        </div>
      </DialogBox>
      <ToastContainer />
    </div>
  );
};

export { Header };
