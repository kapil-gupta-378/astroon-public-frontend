import Image from 'next/image';
import React from 'react';
import Card from '../../common/card';
import styles from './team.module.scss';
import cardBackIcon from '../../../../public/assets/images/forword_icon.svg';
import backwordEnable from '../../../../public/assets/images/backwordEnable.svg';
import Slider from 'react-slick';
import { useState } from 'react';

import teamImage1 from '../../../../public/assets/images/TEAM1.svg';
import teamImage2 from '../../../../public/assets/images/TEAM2.svg';
import teamImage3 from '../../../../public/assets/images/TEAM3.svg';
import teamImage4 from '../../../../public/assets/images/TEAM4.svg';
import teamImage5 from '../../../../public/assets/images/TEAM5.svg';
const Team = () => {
  const [slider] = useState('');
  // const [isIndex, setIsIndex] = useState({
  //   prev: 0,
  //   next: 0,
  //   index: 0,
  // });

  // const beforeChange = (prev, next) => {
  //   setIsIndex((value) => ({ ...value, prev: prev, next: next }));
  // };

  // const afterChange = (index) => {
  //   setIsIndex((value) => ({ ...value, index: index }));
  // };
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    speed: 1000,
    autoplaySpeed: 2000,
    cssEase: 'linear',
    // beforeChange: beforeChange,
    // afterChange: afterChange,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
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

  // console.log(isIndex);
  return (
    <div className={`container ${styles.team_wrap}`}>
      <h3 className={styles.team_heading}>Team</h3>
      <div className={styles.cards_wrap}>
        <Slider ref={(c) => (slider = c)} {...settings}>
          <Card image={teamImage1} />
          <Card image={teamImage2} />
          <Card image={teamImage3} />
          <Card image={teamImage4} />
          <Card image={teamImage5} />
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

export default Team;
