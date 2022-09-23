import React from 'react';
import FAQ from '../../component/ui/faq';
import Team from '../../component/ui/team';
import styles from './home.module.scss';
import Banner from '../../component/ui/banner';
import Roadmap from '../../component/ui/Roadmap';
import Whitepaper from '../../component/ui/whitepaper';
const Home = () => {
  return (
    <div className={styles.home_wrp}>
      <Banner />
      <Roadmap />
      <Whitepaper />
      <FAQ />
      <Team />
    </div>
  );
};

export default Home;
