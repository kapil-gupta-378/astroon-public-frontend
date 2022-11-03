import Image from 'next/image';
import React from 'react';
import styles from './nftcard.module.scss';
import cardback from '../../../../public/assets/images/card_back.svg';

const NFTCard = () => {
  return (
    <div className={`container ${styles.nft_card_wrap}`}>
      <div className={styles.nft_card_img_wrap}>
        <div className={styles.backgroud_nft_card}>
          <Image
            src={cardback}
            width={420}
            height={283}
            alt="img"
            layout="fixed"
          />
        </div>
        <div className={styles.img_nft_card}>
          <Image
            src={'/assets/images/nft_card.svg'}
            width={322}
            height={287}
            layout="fixed"
            alt="nft_card"
          />
        </div>
      </div>
      <div className={styles.nft_card_sec}>
        <div className={styles.nft_card_art}>
          <div className={styles.nft_card_heading_wrap}>
            <div>
              <p>Art</p>
              <Image
                src={'/assets/images/art.svg'}
                width={15}
                height={15}
                layout="fixed"
                alt="art"
              />
            </div>

            <h6>Art #1234</h6>
          </div>
          <button className={styles.opensea_btn}>View on Opensea</button>
        </div>
        <div className={styles.nft_card_price}>
          <h5>0.207 ETH</h5>
          <p>$281.21</p>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
