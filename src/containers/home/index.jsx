import React from 'react';
import FAQ from '../../component/ui/faq';
import Team from '../../component/ui/team';
import styles from './home.module.scss';
import Banner from '../../component/ui/banner';
import Roadmap from '../../component/ui/roadmap';
import Whitepaper from '../../component/ui/whitepaper';
import NftCollection from '../../component/ui/nft-collection';
import NftSlider from '../../component/ui/nft-slider-home';
const Home = () => {
  return (
    <div className={styles.home_wrp}>
      <Banner />
      <NftCollection />
      <Roadmap />
      <NftSlider />
      <Whitepaper />
      <FAQ />
      <Team />
    </div>
  );
};

export default Home;
