import Head from 'next/head';
import Image from 'next/image';
import { useEffect } from 'react';
import Web3 from 'web3';
import styles from '../styles/Home.module.css';
// import "bootstrap/dist/css/bootstrap.min.css";
export default function Home() {
  useEffect(() => {
    const check = async () => {
      const web3 = new Web3(window.ethereum);
      const account = await web3.eth.getAccounts();
    };
    check();
  }, []);

  return (
    <div className={styles.container}>
      <div className="dropdown">Astroon</div>
    </div>
  );
}
