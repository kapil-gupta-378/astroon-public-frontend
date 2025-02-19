import Image from 'next/image';
import React, { useRef, useState, useEffect } from 'react';
import styles from './nftcard.module.scss';
import cardback from '../../../../public/assets/images/card_back.svg';
import image_not_found_image from '../../../../public/assets/images/image_not_found.png';
const NFTCard = ({ nftData }) => {
  const myRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [category, setCategory] = useState({ value: 'NA' });
  const ImageLoader = ({ src }) => {
    return `${src}`;
  };

  const getDimensions = () => ({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions(getDimensions());
    };

    if (myRef.current) {
      setDimensions(getDimensions());
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [myRef]);

  // find category data from nft data in traints array comming from opensea setting it to usstate
  useEffect(() => {
    if (nftData.traits !== undefined) {
      setCategory(
        nftData.traits.find((value) => value.trait_type === 'category'),
      );
    }
  }, [nftData]);

  return (
    <div
      ref={myRef}
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
          {nftData && (
            <Image
              loader={ImageLoader}
              src={
                nftData.image_thumbnail_url
                  ? nftData.image_thumbnail_url
                  : image_not_found_image
              }
              alt="img"
              layout="fill"
              priority
            />
          )}
          {!nftData && (
            <Image
              src={cardback}
              // eslint-disable-next-line prettier/prettier
              width={
                dimensions?.width < 430
                  ? 300
                  : dimensions?.width > 550 && dimensions?.width < 775
                  ? 350
                  : 420
              }
              height={283}
              alt="img"
              layout="fixed"
              priority
            />
          )}
        </div>
        {!nftData && (
          <div className={styles.img_nft_card}>
            <Image
              src={'/assets/images/nft_card.svg'}
              width={290}
              height={287}
              layout="fixed"
              alt="nft_card"
              priority
            />
          </div>
        )}
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
                priority
              />
            </div>

            <h6>{nftData?.name ? nftData.name : 'Nft art #123'}</h6>
          </div>
          <a
            href={nftData?.permalink ? nftData.permalink : ''}
            target="_blank"
            className={styles.opensea_btn}
            rel="noreferrer"
          >
            View on Opensea
          </a>
        </div>
        {nftData?.traits[1]?.value && (
          <h6 className={styles.category_wrap}>
            {'Category  '}
            <span>{category.value}</span>
          </h6>
        )}
        <div className={styles.nft_card_price}>
          <h5>0.207 ETH</h5>
          <p>$281.21</p>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
