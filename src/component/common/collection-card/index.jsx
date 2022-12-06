import React from 'react';
import Image from 'next/image';
import styles from './collectionCard.module.scss';

const CollectionCard = ({ nftdata }) => {
  const ImageLoader = ({ src }) => {
    return `${src}`;
  };

  return (
    <div className={styles.nftCard_wrap}>
      <Image
        loader={ImageLoader}
        src={nftdata}
        width={310}
        height={250}
        layout="fixed"
        alt="nft-img"
      />
    </div>
  );
};

export default CollectionCard;
