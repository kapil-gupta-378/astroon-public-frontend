import React from 'react';
import style from './banner.module.scss';
import HomePageImage from '../../../../public/assets/images/DUO.svg';
import Image from 'next/image';
function Banner() {
  return (
    <div className={style['home_wrp']}>
      <div className={`${style.home_page} container`}>
        <div className={style.home_details}>
          <h1>To the Moon</h1>
          <h4>
            The extraordinary adventure of ASTRO and ROON, who love each other
            very much, to the moon.
          </h4>
          <p>
            Join the ASTROON community and be a part of this challenging and fun
            story.
          </p>
        </div>
        <div className="home_images">
          <Image src={HomePageImage} alt="" width="420px" height="570px" />
        </div>
      </div>
    </div>
  );
}

export default Banner;
