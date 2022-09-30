import React from 'react';
import NftCard from '../../common/nft-card';
import styles from './nftSlider.module.scss';
import cardImage1 from '../../../../public/assets/images/nftimag.svg';
import cardImage2 from '../../../../public/assets/images/nft2.svg';
import cardImage3 from '../../../../public/assets/images/nft3.svg';
import cardImage4 from '../../../../public/assets/images/nft4.svg';
import cardImage5 from '../../../../public/assets/images/nft5.svg';
// import cardImage6 from '../../../../public/assets/images/nft6.svg';
const nftCollectionData = [
  { imglink: cardImage1, id: 1 },
  { imglink: cardImage2, id: 2 },
  { imglink: cardImage3, id: 3 },
  { imglink: cardImage4, id: 4 },
  { imglink: cardImage5, id: 5 },
  //   { imglink: cardImage6, id: 6 },
];
const NftSlider = () => {
  return (
    <div className={styles.nft_slider_home}>
      <div className={styles.nft_slider_top}>
        {nftCollectionData.map((nft) => {
          return <NftCard key={nft.id} nftdata={nft} />;
        })}
      </div>
      <div className={styles.nft_slider_buttom}>
        {nftCollectionData.map((nft) => {
          return <NftCard key={nft.id} nftdata={nft} />;
        })}
      </div>
    </div>
  );
};

export default NftSlider;
