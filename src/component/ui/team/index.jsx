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
// import teamImage6 from '../../../../public/assets/images/Varlık 2.svg';
// import teamImage7 from '../../../../public/assets/images/Varlık 3.svg';
// import teamImage8 from '../../../../public/assets/images/Varlık 4.svg';
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

  return (
    <div className={`container ${styles.team_wrap}`}>
      <h3 className={styles.team_heading}>Team</h3>
      <div className={styles.cards_wrap}>
        <Slider ref={(c) => (slider = c)} {...settings}>
          {/* <Card
            image={teamImage1}
            name={'***'}
            designation={'Founder'}
            socialHandle={'-'}
          />
          <Card
            image={teamImage2}
            name={'EYK62'}
            designation={'Tech Lead'}
            socialHandle={'@kayaekremyilmaz'}
          />
          <Card
            image={teamImage3}
            name={'***'}
            designation={'Chief Operating Officer'}
            socialHandle={'-'}
          />
          <Card
            image={teamImage4}
            name={'Sidar Kaya'}
            designation={'Art Lead'}
            socialHandle={'@sidkaya'}
          />
          <Card
            image={teamImage5}
            name={'BraveHeart BH'}
            designation={'Content & Marketing Manager'}
            socialHandle={'@BraveHeartNT'}
          />
          <Card
            image={teamImage6}
            name={'***'}
            designation={'Product Manager'}
            socialHandle={'-'}
          />
          <Card
            image={teamImage7}
            name={'***'}
            designation={'Legal Affairs'}
            socialHandle={'-'}
          />
          <Card
            image={teamImage8}
            name={'MZA61'}
            designation={'Community Operations Manager'}
            socialHandle={'@mzaydin'}
          /> */}
          <Card
            image={teamImage1}
            name={'Ekrem Y. Kaya'}
            designation={'Co-Founder'}
            socialHandle={'@kayaekremyilmaz'}
          />
          <Card
            image={teamImage2}
            name={'M. Ziya Aydın'}
            designation={'Community Operations Manager'}
            socialHandle={'@mzaydin'}
          />
          <Card
            image={teamImage3}
            name={'Sidar Kaya'}
            designation={'Art Lead'}
            socialHandle={'@sidkaya'}
          />
          <Card
            image={teamImage4}
            name={'Bora T. Kaya'}
            designation={'Waker & Developer'}
            socialHandle={'@bora__kaya'}
          />
          <Card
            image={teamImage5}
            name={'M. Emir Albayrak'}
            designation={'Waker & PM'}
            socialHandle={'@m_emir_albayrak'}
          />
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
