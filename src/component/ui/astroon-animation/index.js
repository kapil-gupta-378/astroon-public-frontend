import Image from 'next/image';
import React from 'react';
import styles from './astroonAnimation.module.scss';
import animationImage from '../../../../public/assets/images/animation_image4.svg';
const AstroonAnimation = () => {
  return (
    <div className={`container ${styles.astroon_animation_wrap}`}>
      <h3 className={styles.astroon_animation_heading}>ASTROON Animation</h3>
      <div className={styles.content_wrap}>
        <div className={styles.left_wrap}>
          <p>
            An animated series suitable for all age audiences will be
            distributed on the world&#39;s largest streaming platforms. Will
            Astro and Roon be able to go to the moon? We don&#39;t know yet, but
            we trust them. Episodes of this adventure will be posted weekly on
            YouTube. Don&#39;t forget to support them by watching their journey.
          </p>
          <div>
            {/* <ol>
              <li>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia,
              </li>
              <li>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia,
              </li>
              <li>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia,
              </li>
              <li>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia,
              </li>
              <li>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia,
              </li>
            </ol> */}
          </div>
        </div>

        <div className={styles.right_wrap}>
          <Image
            src={animationImage}
            layout="responsive"
            alt="animationimage"
          />
        </div>
      </div>
    </div>
  );
};

export default AstroonAnimation;
