import React from 'react';
import FAQ from '../../component/ui/faq';
import styles from './home.module.scss';
const Home = () => {
  return (
    <div className={styles.home_wrp}>
      <FAQ />
    </div>
  );
};

export default Home;
