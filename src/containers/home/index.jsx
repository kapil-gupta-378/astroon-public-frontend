import React from 'react';
import FAQ from '../../component/ui/faq';
import Team from '../../component/ui/team';
import styles from './home.module.scss';
import Banner from '../../component/ui/banner';
import Roadmap from '../../component/ui/roadmap';
import Whitepaper from '../../component/ui/whitepaper';
import Blog from '../../component/ui/blog';
const Home = () => {
  return (
    <div className={styles.home_wrp}>
      <Banner />
      <Roadmap />
      <Whitepaper />
      <Team />
      <FAQ />
      <Blog />
    </div>
  );
};

export default Home;
