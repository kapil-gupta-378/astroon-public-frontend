import React, { useState } from 'react';
import Image from 'next/image';
import styles from './roadmap.module.scss';
// import RoadmapImage from '../../../../public/assets/images/roadmap.svg';
// import RoadmapMobileImage from '../../../../public/assets/images/roadmap_desktop.svg';
import RoadmapImageNew from '../../../../public/assets/images/Astroon Roadmap_Final.svg';
import ZoomView from '../ZoomView';
import popUpImage1 from '../../../../public/assets/images/Ekran Resmi 2023-01-18 16.40.28.PNG';

const Roadmap = () => {
  const [showPreView, setShowPreView] = useState({
    youtube: false,
    loading: false,
    box: false,
    cafe: false,
    moon: false,
    nft: false,
    art: false,
    game: false,
    base: false,
  });

  const handlePreviewClose = () => {
    setShowPreView(() => ({
      youtube: false,
      loading: false,
      box: false,
      cafe: false,
      moon: false,
      nft: false,
      art: false,
      game: false,
      base: false,
    }));
  };
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
            <div
              onMouseEnter={() =>
                setShowPreView({
                  youtube: true,
                  loading: false,
                  box: false,
                  cafe: false,
                  moon: false,
                  nft: false,
                  art: false,
                  game: false,
                  base: false,
                })
              }
              className={styles.youtube_PopUp}
            ></div>
            <ZoomView
              show={showPreView.youtube}
              handleClose={handlePreviewClose}
              imageData={popUpImage1}
            />
            <div
              onMouseEnter={() =>
                setShowPreView({
                  youtube: false,
                  loading: true,
                  box: false,
                  cafe: false,
                  moon: false,
                  nft: false,
                  art: false,
                  game: false,
                  base: false,
                })
              }
              className={styles.loading_PopUp}
            ></div>

            <ZoomView
              show={showPreView.loading}
              handleClose={handlePreviewClose}
              imageData={popUpImage1}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Roadmap;
