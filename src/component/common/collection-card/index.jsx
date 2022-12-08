import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './collectionCard.module.scss';

const CollectionCard = ({ nftdata }) => {
  const ImageLoader = ({ src }) => {
    return `${src}`;
  };

  return (
    <div className={styles.nftCard_wrap}>
      <Link href={nftdata.url}>
        <a target="_blank" className={styles.nftCard}>
          <Image
            loader={ImageLoader}
            src={nftdata.nft.image_thumbnail_url}
            width={310}
            height={250}
            layout="fixed"
            alt="nft-img"
          />
        </a>
      </Link>
    </div>
  );
};

export default CollectionCard;
