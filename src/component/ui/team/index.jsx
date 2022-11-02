import Image from 'next/image';
import React from 'react';
import Card from '../../common/card';
import styles from './team.module.scss';
import cardBackIcon from '../../../../public/assets/images/forword_icon.svg';
import cardForwordIcon from '../../../../public/assets/images/backword_icon.svg';
import Slider from 'react-slick';
import { useState } from 'react';
const Team = () => {
  const [slider, setSlider] = useState();
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: false,
    speed: 1000,
    autoplaySpeed: 2000,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
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
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
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
    <div className={`container ${styles.team_wrap}`}>
      <h3 className={styles.team_heading}>Team</h3>
      <div className={styles.cards_wrap}>
        <Slider ref={(c) => (slider = c)} {...settings}>
          {[...Array(8).keys()].map((_, idx) => (
            <Card key={idx} />
          ))}
        </Slider>
      </div>

      <div className={styles.card_navigation_btn}>
        <button className={styles.back_btn} onClick={previous}>
          <Image
            src={cardForwordIcon}
            width={10}
            height={10}
            alt="btnback"
            layout="fixed"
          />
        </button>
        <button className={styles.forword_btn} onClick={next}>
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

export default Team;
