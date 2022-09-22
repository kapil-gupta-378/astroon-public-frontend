import React from 'react';
import Banner from '../../component/ui/banner';
import Roadmap from '../../component/ui/Roadmap';
import Whitepaper from '../../component/ui/whitepaper';
import styles from './home.module.scss';
const Home = () => {
  return (
    <div className={styles.home_wrp}>
     <Banner/>
     <Roadmap/>
     <Whitepaper/>
    </div>
  );
};
export default Home;