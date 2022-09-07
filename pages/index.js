import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  setBalance,
  setNetworkId,
  setWalletAddress,
} from '../src/redux/persist/wallet/walletSlice';
import { connectWallet } from '../src/utils/connectWallet';
import styles from '../styles/Home.module.css';
// import "bootstrap/dist/css/bootstrap.min.css";
export default function Home() {
  const dispatch = useDispatch();
  const route = useRouter;
  useEffect(() => {
    connetWallet();
    addEventListenerForWallet();
  }, [connetWallet, addEventListenerForWallet]);

  const connetWallet = useCallback(async () => {
    const { accounts, networkId, balance } = await connectWallet();
    dispatch(setWalletAddress(accounts[0]));
    dispatch(setNetworkId(networkId));
    dispatch(setBalance(balance));
  }, [dispatch]);

  const addEventListenerForWallet = useCallback(() => {
    ethereum.on('accountsChanged', (accounts) => {
      dispatch(setWalletAddress(accounts[0]));
    });
    ethereum.on('chainChanged', (networkId) => {
      dispatch(setNetworkId(networkId));
    });
    ethereum.on('connect', () => route.push('/'));
  }, [route, dispatch]);

  return (
    <div className={styles.container}>
      <div className="dropdown">Astroon</div>
    </div>
  );
}
