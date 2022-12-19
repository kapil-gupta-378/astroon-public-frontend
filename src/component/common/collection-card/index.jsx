import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './collectionCard.module.scss';
import image_not_found_image from '../../../../public/assets/images/image_not_found.png';

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
            src={
              nftdata.nft.image_thumbnail_url
                ? nftdata.nft.image_thumbnail_url
                : image_not_found_image
            }
            width={310}
            height={250}
            layout="fixed"
            alt="nft-img"
            priority
          />
        </a>
      </Link>
    </div>
  );
};

export default CollectionCard;
