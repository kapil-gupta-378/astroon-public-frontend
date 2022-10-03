import React from 'react';
import Image from 'next/image';
import styles from './nftcard.module.scss';
const NftCard = ({ nftdata }) => {
  return (
    <div className={styles.nftCard_wrap}>
      <Image
        src={nftdata.imglink}
        layout="responsive"
        alt="nftImage"
        priority
      />
    </div>
  );
};

export default NftCard;
