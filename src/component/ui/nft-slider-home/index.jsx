import React from 'react';
import NftCard from '../../common/nft-card';
import styles from './nftSlider.module.scss';
import cardImage1 from '../../../../public/assets/images/nftimag.svg';
import cardImage2 from '../../../../public/assets/images/nft2.svg';
import cardImage3 from '../../../../public/assets/images/nft3.svg';
import cardImage4 from '../../../../public/assets/images/nft4.svg';
import cardImage5 from '../../../../public/assets/images/nft5.svg';
import Slider from 'react-slick';
const nftCollectionData = [
  { imglink: cardImage1, id: 1 },
  { imglink: cardImage2, id: 2 },
  { imglink: cardImage3, id: 3 },
  { imglink: cardImage4, id: 4 },
  { imglink: cardImage5, id: 5 },
  { imglink: cardImage1, id: 1 },
  { imglink: cardImage2, id: 2 },
  { imglink: cardImage3, id: 3 },
  { imglink: cardImage4, id: 4 },
  { imglink: cardImage5, id: 5 },
  { imglink: cardImage1, id: 1 },
  { imglink: cardImage2, id: 2 },
  { imglink: cardImage3, id: 3 },
  { imglink: cardImage4, id: 4 },
  { imglink: cardImage5, id: 5 },
  { imglink: cardImage1, id: 1 },
  { imglink: cardImage2, id: 2 },
  { imglink: cardImage3, id: 3 },
  { imglink: cardImage4, id: 4 },
  { imglink: cardImage5, id: 5 },
  { imglink: cardImage1, id: 1 },
  { imglink: cardImage2, id: 2 },
  { imglink: cardImage3, id: 3 },
  { imglink: cardImage4, id: 4 },
  { imglink: cardImage5, id: 5 },
];
const NftSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: 'linear',
  };
  return (
    <div className={styles.nft_slider_home}>
      <Slider {...settings}>
        {nftCollectionData.map((nft) => {
          return <NftCard key={nft.id} nftdata={nft} />;
        })}
      </Slider>
      <Slider {...settings}>
        {nftCollectionData.map((nft) => {
          return <NftCard key={nft.id} nftdata={nft} />;
        })}
      </Slider>
    </div>
  );
};

export default NftSlider;
