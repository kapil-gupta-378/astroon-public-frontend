import React from 'react';
import Image from 'next/image';
import styles from './collectionCard.module.scss';
const CollectionCard = ({ nftdata }) => {
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

export default CollectionCard;
