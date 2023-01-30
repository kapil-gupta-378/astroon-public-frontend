import Image from 'next/image';
import React from 'react';
import styles from './astroonHistory.module.scss';
import historyImage from '../../../../public/assets/images/ASTROON HISTORY.svg';
import planetImage from '../../../../public/assets/images/planets/Group 76.svg';
import planetImage2 from '../../../../public/assets/images/planets/Group 78.svg';
import planetImage3 from '../../../../public/assets/images/planets/Group 89.svg';
import planetImage4 from '../../../../public/assets/images/planets/Group 91.svg';

const AstroonHistory = () => {
  return (
    <div className={`container ${styles.astroon_history_wrap}`}>
      <div className={styles.planet_image1}>
        <Image src={planetImage} alt="planet" layout="responsive" />
      </div>
      <h3 className={styles.astroon_history_heading}>ASTROON History</h3>
      <div className={styles.planet_image2}>
        <Image src={planetImage2} alt="planet" layout="responsive" />
      </div>
      <div className={styles.content_wrap}>
        <div className={styles.left_wrap}>
          <p>
            Welcome to ASTROON, a revolutionary crypto project featuring two
            cute characters, Astro and Roon! This project is designed to provide
            users with an enchanting journey from the earth to the moon, beside
            the experience you will be taking part in this journey also creating
            our own and unique community.
          </p>
          <p>
            Our project features a token called $AST, which can be used to
            purchase and trade NFT collections and in-game items. Through these
            NFT collections, holders can earn daily $AST’s. Furthermore, we have
            developed a series of mobile games based on Astro and Roon’s
            exciting adventures, in order to spend more time with Astro and
            Roon.
          </p>
          <p>Join us on our mission to the moon, and let your journey begin!</p>
        </div>

        <div className={styles.right_wrap}>
          <Image src={historyImage} layout="responsive" alt="historyimage" />
        </div>
      </div>
      <div className={styles.planet_image3}>
        <Image src={planetImage3} alt="planet" layout="responsive" />
      </div>
      <div className={styles.planet_image4}>
        <Image src={planetImage4} alt="planet" layout="responsive" />
      </div>
    </div>
  );
};

export default AstroonHistory;
