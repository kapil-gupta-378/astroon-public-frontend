import Image from 'next/image';
import React from 'react';
import NFTCard from '../../common/nft-card';
import styles from './ourartworks.module.scss';
import cardBackIcon from '../../../../public/assets/images/forword_icon.svg';
import cardForwordIcon from '../../../../public/assets/images/backword_icon.svg';
import Button from '../../common/button';
import Slider from 'react-slick';

const OurArtworks = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: false,
    speed: 1000,
    autoplaySpeed: 2000,
    cssEase: 'linear',
  };
  return (
    <div className={`container ${styles.nft_card_wrap}`}>
      <h3 className={styles.nft_card_heading}>Our Artworks</h3>
      <div className={styles.nft_cards_wrap}>
        <Slider {...settings}>
          {[...Array(8).keys()].map((_, idx) => (
            <NFTCard key={idx} />
          ))}
        </Slider>
      </div>

      <div className={styles.nft_card_navigation_btn}>
        <button className={styles.back_btn}>
          <Image
            src={cardForwordIcon}
            width={10}
            height={10}
            alt="btnback"
            layout="fixed"
          />
        </button>
        <Button kind="text">View More</Button>
        <button className={styles.forword_btn}>
          <Image
            src={cardBackIcon}
            width={10}
            height={10}
            alt="btnback"
            layout="fixed"
          />
        </button>
      </div>
    </div>
  );
};

export default OurArtworks;
