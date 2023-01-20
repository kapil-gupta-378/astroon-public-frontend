import React, { useState } from 'react';
import Image from 'next/image';
import styles from './roadmap.module.scss';
// import RoadmapImage from '../../../../public/assets/images/roadmap.svg';
// import RoadmapMobileImage from '../../../../public/assets/images/roadmap_desktop.svg';
import RoadmapImageNew from '../../../../public/assets/images/Astroon Roadmap_Final.svg';
import ZoomView from '../ZoomView';
import youtubeImage from '../../../../public/assets/images/Ekran Resmi 2023-01-18 16.40.28.PNG';
import loadingImage from '../../../../public/assets/images/Ekran Resmi 2023-01-18 16.40.32.PNG';
import boxImage from '../../../../public/assets/images/Ekran Resmi 2023-01-18 16.40.38.PNG';
import cafeImage from '../../../../public/assets/images/Ekran Resmi 2023-01-18 16.40.42.PNG';
import moonImage from '../../../../public/assets/images/Ekran Resmi 2023-01-18 16.40.47.PNG';
import nftImage from '../../../../public/assets/images/Ekran Resmi 2023-01-18 16.40.52.PNG';
import artImage from '../../../../public/assets/images/Ekran Resmi 2023-01-18 16.40.56.PNG';
import gameImage from '../../../../public/assets/images/Ekran Resmi 2023-01-18 16.41.02.PNG';
import baseImage from '../../../../public/assets/images/Ekran Resmi 2023-01-18 16.41.08.PNG';

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

            {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}

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
              imageData={youtubeImage}
            />

            {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}

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
              imageData={loadingImage}
            />

            {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}

            <div
              onMouseEnter={() =>
                setShowPreView({
                  youtube: false,
                  loading: false,
                  box: true,
                  cafe: false,
                  moon: false,
                  nft: false,
                  art: false,
                  game: false,
                  base: false,
                })
              }
              className={styles.box_PopUp}
            ></div>

            <ZoomView
              show={showPreView.box}
              handleClose={handlePreviewClose}
              imageData={boxImage}
            />

            {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}

            <div
              onMouseEnter={() =>
                setShowPreView({
                  youtube: false,
                  loading: false,
                  box: false,
                  cafe: true,
                  moon: false,
                  nft: false,
                  art: false,
                  game: false,
                  base: false,
                })
              }
              className={styles.cafe_PopUp}
            ></div>

            <ZoomView
              show={showPreView.cafe}
              handleClose={handlePreviewClose}
              imageData={cafeImage}
            />

            {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}

            <div
              onMouseEnter={() =>
                setShowPreView({
                  youtube: false,
                  loading: false,
                  box: false,
                  cafe: false,
                  moon: true,
                  nft: false,
                  art: false,
                  game: false,
                  base: false,
                })
              }
              className={styles.moon_PopUp}
            ></div>

            <ZoomView
              show={showPreView.moon}
              handleClose={handlePreviewClose}
              imageData={moonImage}
            />

            {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}

            <div
              onMouseEnter={() =>
                setShowPreView({
                  youtube: false,
                  loading: false,
                  box: false,
                  cafe: false,
                  moon: false,
                  nft: true,
                  art: false,
                  game: false,
                  base: false,
                })
              }
              className={styles.nft_PopUp}
            ></div>

            <ZoomView
              show={showPreView.nft}
              handleClose={handlePreviewClose}
              imageData={nftImage}
            />

            {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}

            <div
              onMouseEnter={() =>
                setShowPreView({
                  youtube: false,
                  loading: false,
                  box: false,
                  cafe: false,
                  moon: false,
                  nft: false,
                  art: true,
                  game: false,
                  base: false,
                })
              }
              className={styles.art_PopUp}
            ></div>

            <ZoomView
              show={showPreView.art}
              handleClose={handlePreviewClose}
              imageData={artImage}
            />

            {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}

            <div
              onMouseEnter={() =>
                setShowPreView({
                  youtube: false,
                  loading: false,
                  box: false,
                  cafe: false,
                  moon: false,
                  nft: false,
                  art: false,
                  game: true,
                  base: false,
                })
              }
              className={styles.game_PopUp}
            ></div>

            <ZoomView
              show={showPreView.game}
              handleClose={handlePreviewClose}
              imageData={gameImage}
            />

            {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}

            <div
              onMouseEnter={() =>
                setShowPreView({
                  youtube: false,
                  loading: false,
                  box: false,
                  cafe: false,
                  moon: false,
                  nft: false,
                  art: false,
                  game: false,
                  base: true,
                })
              }
              className={styles.base_PopUp}
            ></div>

            <ZoomView
              show={showPreView.base}
              handleClose={handlePreviewClose}
              imageData={baseImage}
            />

            {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Roadmap;
