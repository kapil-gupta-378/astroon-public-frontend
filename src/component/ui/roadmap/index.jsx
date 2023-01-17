import React from 'react';
import Image from 'next/image';
import styles from './roadmap.module.scss';
// import RoadmapImage from '../../../../public/assets/images/roadmap.svg';
// import RoadmapMobileImage from '../../../../public/assets/images/roadmap_desktop.svg';
import RoadmapImageNew from '../../../../public/assets/images/Astroon Roadmap_Final.svg';

const Roadmap = () => {
  return (
    <>
      <div className={`${styles.roadmap_wrapper}`}>
        <div className={`container-fluid ${styles.roadmap_container}`}>
          <div className={`${styles.roadmap_heading} text-center tex-white`}>
            <h3>Roadmap</h3>
          </div>
          <div className={`${styles.roadmap_image} position-relative `}>
            <div className={styles.roadmap_desktop}>
              <Image src={RoadmapImageNew} alt="roadmap" layout="responsive" />
            </div>

            {/* <div className={styles.roadmap_mobile}>
              <Image src={RoadmapMobileImage} alt="roadmap" />
            </div> */}

            {/* <div className={`${styles.roadmap_text}`}>
              <p>2022</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent tristique
              </p>
            </div>

            <div className={`${styles.roadmap_text}`}>
              <p>2022</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent tristique .
              </p>
            </div>

            <div className={`${styles.roadmap_text}`}>
              <p>2022</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent tristique .
              </p>
            </div>

            <div className={`${styles.roadmap_text}`}>
              <p>2022</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent tristique .
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Roadmap;
