import Image from 'next/image';
import React from 'react';
import styles from './gamescard.module.scss';

const GamesCard = () => {
  return (
    <div className={`container ${styles.nft_card_wrap}`}>
      <div className={styles.nft_card_img_wrap}>
        <div className={styles.img_nft_card}>
          <Image
            src={'/assets/images/treasure.svg'}
            width={322}
            height={287}
            layout="fixed"
            alt="treasure"
          />
        </div>
      </div>
      <div className={styles.nft_card_price}>
        <h5>+5000</h5>
      </div>
    </div>
  );
};

export default GamesCard;
