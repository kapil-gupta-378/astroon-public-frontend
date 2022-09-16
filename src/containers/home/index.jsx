import React from 'react';
import FAQ from '../../component/ui/faq';
import Team from '../../component/ui/team';
import styles from './home.module.scss';
const Home = () => {
  return (
    <div className={styles.home_wrp}>
      <FAQ />
      <Team />
    </div>
  );
};

export default Home;
