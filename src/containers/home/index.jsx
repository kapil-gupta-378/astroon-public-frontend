import React from 'react';
import FAQ from '../../component/ui/faq';
import Team from '../../component/ui/team';
import styles from './home.module.scss';
import Banner from '../../component/ui/banner';
import Roadmap from '../../component/ui/roadmap';
import Whitepaper from '../../component/ui/whitepaper';
// import BlogRow from '../../component/ui/blog-row';
import NftSlider from '../../component/ui/nft-slider-home';
// import LeaderBoard from '../../component/ui/leader-board';
import AstroonHistory from '../../component/ui/astroon-history';
import AstroonProduct from '../../component/ui/astroon-products';

const Home = () => {
  return (
    <div className={styles.home_wrp}>
      <Banner />
      <AstroonHistory />
      <AstroonProduct />
      {/* <LeaderBoard /> */}
      <NftSlider />
      <Whitepaper />
      <Roadmap />
      <Team />
      <FAQ />
      {/* <BlogRow /> */}
    </div>
  );
};

export default Home;
