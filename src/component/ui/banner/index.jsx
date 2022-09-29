import React from 'react';
import Image from 'next/image';
import style from './banner.module.scss';
import Button from '../../common/button';
import HomePageImage from '../../../../public/assets/images/homepage.svg';
function Banner() {
  return (
    <div className={style['home_wrp']}>
      <div className={`${style.home_page} container-fluid`}>
        <div className={style.home_details}>
          <h1>Collect, Buy and sell</h1>
          <h4>extraprdinary NFT&apos;S</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            tristique consectetur placerat tortor adipiscing. Nascetur quam
          </p>
          <Button data-content="explore" kind="text">
            Explore
          </Button>
        </div>
        <div className="home_images">
          <Image src={HomePageImage} alt="" width="370px" />
        </div>
      </div>
    </div>
  );
}

export default Banner;
