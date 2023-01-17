import Image from 'next/image';
import React from 'react';
import styles from './astroonNFT.module.scss';
import NFTImage from '../../../../public/assets/images/NFT.png';
const AstroonNFT = () => {
  return (
    <div className={`container ${styles.astroon_NFT_wrap}`}>
      <h3 className={styles.astroon_NFT_heading}>ASTROON NFT</h3>
      <div className={styles.content_wrap}>
        <div className={styles.left_wrap}>
          <p>
            {
              'Each NFT consists of four different assets, each with its own score. The total score of the four assets that your NFT contains determines the value of your NFT. Our collection, which has four different value categories, includes 6625 bronze,1303 silver, 70 gold, and 2 platinum NFTs.If you have;'
            }
          </p>
          <div>
            <h3 className={styles.point_heading}>If you have</h3>
            <ol>
              <li>a bronze NFT you will be rewarded with $1 AST per day.</li>
              <li>a silver NFT you will be rewarded with $2 AST per day.</li>
              <li>a gold NFT you will be rewarded with $3 AST per day.</li>
              <li>a platinum NFT you will be rewarded with $4 AST per day.</li>
            </ol>
          </div>
          <p>
            Our collection of 8000 pieces includes 4000 different versions of
            Astro and 4000 different versions of Roon.
          </p>
        </div>

        <div className={styles.right_wrap}>
          <Image src={NFTImage} layout="fill" alt="NFTimage" />
        </div>
      </div>
    </div>
  );
};

export default AstroonNFT;
