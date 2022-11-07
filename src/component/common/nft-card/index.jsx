import Image from 'next/image';
import React from 'react';
import styles from './nftcard.module.scss';

const NFTCard = ({ nftData }) => {
  const ImageLoader = ({ src }) => {
    return `${src}`;
  };
  return (
    <div className={`${styles.nft_card_wrap}`}>
      <div className={styles.nft_card_img_wrap}>
        <div className={styles.backgroud_nft_card}>
          <Image
            loader={ImageLoader}
            src={nftData.image_thumbnail_url}
            alt="img"
            layout="fill"
            priority
          />
        </div>
        {/* <div className={styles.img_nft_card}>
          <Image
            src={'/assets/images/nft_card.svg'}
            width={322}
            height={287}
            layout="fixed"
            alt="nft_card"
            priority
          />
        </div> */}
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

            <h6>{nftData.name}</h6>
          </div>
          <a
            href={nftData.permalink}
            target="_blank"
            className={styles.opensea_btn}
            rel="noreferrer"
          >
            View on Opensea
          </a>
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
