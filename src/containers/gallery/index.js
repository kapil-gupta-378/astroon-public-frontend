import Image from 'next/image';
import React from 'react';
import styles from './gallery.module.scss';
import pageimage from '../../../public/assets/images/galleryImage.png';
import VideoPlayer from '../../component/common/video-player';
import HeadingBackground from '../../component/common/heading-background';
const Gallery = () => {
  return (
    <div className={` container ${styles.gallery_wrap}`}>
      <HeadingBackground>
        <h1 className={styles.gallery_heading}>Gallery</h1>
      </HeadingBackground>

      <div className={styles.upper_wrap}>
        <div className={styles.image_wrap}>
          <Image src={pageimage} alt="gallery image" layout="responsive" />
        </div>
        <div className={styles.video_wrap}>
          <VideoPlayer />
        </div>
      </div>
      <div className={styles.upper_wrap}>
        <div className={styles.video_wrap}>
          <VideoPlayer />
        </div>
        <div className={styles.image_wrap}>
          <Image src={pageimage} alt="gallery image" layout="responsive" />
        </div>
      </div>
    </div>
  );
};

export default Gallery;
