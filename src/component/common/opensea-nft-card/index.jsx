import Image from 'next/image';
import React from 'react';
import styles from './openseaNftCard.module.scss';

const OpenseaNFTCard = ({ nftData }) => {
  const ImageLoader = ({ src }) => {
    return `${src}`;
  };

  return (
    <div
      key={nftData.id}
      className={`container ${styles.nft_card_wrap} ${
        !nftData && styles.card_height
      }`}
    >
      <div className={styles.nft_card_img_wrap}>
        <div
          className={`${
            nftData
              ? styles.backgroud_nft_card
              : styles.backgroud_nft_card_position
          }`}
        >
          <Image
            loader={ImageLoader}
            src={
              nftData.nft.image_thumbnail_url
                ? nftData.nft.image_thumbnail_url
                : '/assets/images/nft_card.svg'
            }
            alt="img"
            layout="fill"
            priority
          />
        </div>
      </div>
      <div className={styles.nft_card_sec}>
        <div className={styles.nft_card_art}>
          <div className={styles.nft_card_heading_wrap}>
            <div>
              <p>{nftData.category}</p>
              <Image
                src={'/assets/images/art.svg'}
                width={15}
                height={15}
                layout="fixed"
                alt="art"
              />
            </div>
            <h6>{nftData.nft.name}</h6>
          </div>
          <a
            href={nftData.url}
            target="_blank"
            className={styles.opensea_btn}
            rel="noreferrer"
          >
            View on Opensea
          </a>
        </div>
        <div className={styles.nft_card_price}>
          <h5>{nftData.nft.ether_price} ETH</h5>
          <p>${nftData.nft.dollar_price}</p>
        </div>
      </div>
    </div>
  );
};

export default OpenseaNFTCard;
