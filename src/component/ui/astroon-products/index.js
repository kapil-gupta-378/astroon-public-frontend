import Image from 'next/image';
import React, { useState } from 'react';
import Slider from 'react-slick';
import styles from './astroonProduct.module.scss';
import cardBackIcon from '../../../../public/assets/images/forword_icon.svg';
import backwordEnable from '../../../../public/assets/images/backwordEnable.svg';
const AstroonProduct = () => {
  const [slider] = useState('');
  const [, setIsIndex] = useState({
    prev: 0,
    next: 0,
    index: 0,
  });
  const data = [
    { title: 'Animation' },
    { title: 'Token' },
    { title: 'NFT' },
    { title: 'App' },
    { title: 'Game' },
    { title: 'Game' },
  ];

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
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
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
    <div className={styles.astroon_products_wrap}>
      <h3 className={styles.astroon_products_heading}>ASTROON Product</h3>
      <div className={styles.products_content_wrap}>
        {data.map((data, idx) => {
          return (
            <div className={styles.card_wrap} key={idx}>
              <h3>{data.title}</h3>
            </div>
          );
        })}
      </div>
      <div className={styles.products_content_slider_wrap}>
        <Slider infinite={false} ref={(ref) => (slider = ref)} {...settings}>
          {data.map((data, idx) => {
            return (
              <div className={styles.card_wrap} key={idx}>
                <h3>{data.title}</h3>
              </div>
            );
          })}
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
