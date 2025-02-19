import React from 'react';
import styles from './nftCollection.module.scss';
import cardImage1 from '../../../../public/assets/images/nftimag.svg';
import cardImage2 from '../../../../public/assets/images/nft2.svg';
import cardImage3 from '../../../../public/assets/images/nft3.svg';
import cardImage4 from '../../../../public/assets/images/nft4.svg';
import cardImage5 from '../../../../public/assets/images/nft5.svg';
import cardImage6 from '../../../../public/assets/images/nft6.svg';
import Button from '../../common/button';
import CollectionCard from '../../common/collection-card';
const nftCollectionData = [
  { imglink: cardImage1, id: 1 },
  { imglink: cardImage2, id: 2 },
  { imglink: cardImage3, id: 3 },
  { imglink: cardImage4, id: 4 },
  { imglink: cardImage5, id: 5 },
  { imglink: cardImage6, id: 6 },
];

const NftCollection = () => {
  return (
    <div className={`container ${styles.nft_collection}`}>
      <h3 className={styles.nft_collection_heading}>NFT Collection</h3>
      <div className={styles.nfts_wrap}>
        {nftCollectionData.map((nft) => {
          return <CollectionCard key={nft.id} nftdata={nft} />;
        })}
      </div>
      <div className={styles.btn_wrap}>
        <Button kind="text">View All</Button>
      </div>
    </div>
  );
};

export default NftCollection;
