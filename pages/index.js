import Head from 'next/head';
import Image from 'next/image';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Web3 from 'web3';
import { setHome } from '../src/redux/home/homeSlice';
import styles from '../styles/Home.module.css';
// import "bootstrap/dist/css/bootstrap.min.css";
export default function Home() {
  const dispatch = useDispatch();
  const address = useSelector((state) => state.homeReducer.data);

  useEffect(() => {
    const check = async () => {
      const web3 = new Web3(window.ethereum);
      const account = await web3.eth.getAccounts();
      if (address !== account[0]) {
        dispatch(setHome(account[0]));
      }
    };
    check();
  }, [address]);

  return (
    <div className={styles.container}>
      <div className="dropdown">Astroon</div>
    </div>
  );
}
