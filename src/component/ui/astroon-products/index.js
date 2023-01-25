import Image from 'next/image';
import React, { useState } from 'react';
import Slider from 'react-slick';
import styles from './astroonProduct.module.scss';
import cardBackIcon from '../../../../public/assets/images/forword_icon.svg';
import backwordEnable from '../../../../public/assets/images/backwordEnable.svg';
import token from '../../../../public/assets/images/2TOKEN.svg';
import animation from '../../../../public/assets/images/ANIMATION1.svg';
import nft from '../../../../public/assets/images/NFT3.svg';
import game from '../../../../public/assets/images/GAME4.svg';
const AstroonProduct = () => {
  const [slider] = useState('');
  const [, setIsIndex] = useState({
    prev: 0,
    next: 0,
    index: 0,
  });

  const beforeChange = (prev, next) => {
    setIsIndex((value) => ({ ...value, prev: prev, next: next }));
  };
  const afterChange = (index) => {
    setIsIndex((value) => ({ ...value, index: index }));
  };

  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: false,
    speed: 1000,
    autoplaySpeed: 2000,
    cssEase: 'linear',
    beforeChange: beforeChange,
    afterChange: afterChange,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const next = () => {
    slider.slickNext();
  };
  const previous = () => {
    slider.slickPrev();
  };

  return (
    <div className={`container ${styles.astroon_products_wrap}`}>
      <h3 className={styles.astroon_products_heading}>ASTROON Product</h3>
      <div className={styles.products_content_wrap}>
        <div className={styles.card_wrap_Animation}>
          <div className={styles.image_Animation}>
            <Image alt="pro-image" src={animation} layout="fill" />
          </div>
          <h3>{'Animation'}</h3>
        </div>
        <div className={styles.card_wrap_Token}>
          <div className={styles.image_Animation}>
            <Image alt="pro-image" src={token} layout="fill" />
          </div>

          <h3>{'Token'}</h3>
        </div>
        <div className={styles.card_wrap_NFT}>
          <div className={styles.image_Animation}>
            <Image alt="pro-image" src={nft} layout="fill" />
          </div>

          <h3>{'NFT'}</h3>
        </div>
        <div className={styles.card_wrap_Game}>
          <div className={styles.image_Animation}>
            <Image alt="pro-image" src={game} layout="fill" />
          </div>

          <h3>{'Game'}</h3>
        </div>
      </div>
      <div className={styles.products_content_slider_wrap}>
        <Slider infinite={false} ref={(ref) => (slider = ref)} {...settings}>
          <div className={styles.card_wrap_Animation}>
            <div className={styles.image_Animation}>
              <Image alt="pro-image" src={animation} layout="fill" />
            </div>
            <h3>{'Animation'}</h3>
          </div>
          <div className={styles.card_wrap_Token}>
            <div className={styles.image_Animation}>
              <Image alt="pro-image" src={token} layout="fill" />
            </div>

            <h3>{'Token'}</h3>
          </div>
          <div className={styles.card_wrap_NFT}>
            <div className={styles.image_Animation}>
              <Image alt="pro-image" src={nft} layout="fill" />
            </div>

            <h3>{'NFT'}</h3>
          </div>
          <div className={styles.card_wrap_Game}>
            <div className={styles.image_Animation}>
              <Image alt="pro-image" src={game} layout="fill" />
            </div>

            <h3>{'Game'}</h3>
          </div>
        </Slider>
      </div>
      <div className={styles.card_navigation_btn}>
        <button className={styles.enable_btn} onClick={previous}>
          <Image
            src={backwordEnable}
            width={10}
            height={10}
            alt="btnback"
            layout="fixed"
          />
        </button>
        <button className={styles.enable_btn} onClick={next}>
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

export default AstroonProduct;
