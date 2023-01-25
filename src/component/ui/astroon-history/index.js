import Image from 'next/image';
import React from 'react';
import styles from './astroonHistory.module.scss';
import historyImage from '../../../../public/assets/images/ASTROON HISTORY.svg';

const AstroonHistory = () => {
  return (
    <div className={`container ${styles.astroon_history_wrap}`}>
      <h3 className={styles.astroon_history_heading}>ASTROON History</h3>
      <div className={styles.content_wrap}>
        <div className={styles.left_wrap}>
          <p>
            Welcome to ASTROON, a revolutionary crypto project featuring two
            cute characters, Astro and Roon! This project is designed to provide
            users with an enchanting journey from the earth to the moon, while
            experiencing and building a community.
          </p>
          <p>
            Our project features a token called $AST, which can be used to
            purchase and trade NFT collections and in-game items. Through these
            NFT collections, holders can earn daily $AST’s. Furthermore, we have
            developed a series of mobile games based on Astro and Roon&#8217;s
            exciting adventures, in order to spend more time with Astro and
            Soon.
          </p>
          <p>Join us on our mission to the moon, and let your journey begin!</p>
        </div>

        <div className={styles.right_wrap}>
          <Image src={historyImage} layout="responsive" alt="historyimage" />
        </div>
      </div>
    </div>
  );
};

export default AstroonHistory;
