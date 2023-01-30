import React from 'react';
import Image from 'next/image';
import styles from './roadmap.module.scss';
// import RoadmapImage from '../../../../public/assets/images/roadmap.svg';
// import RoadmapMobileImage from '../../../../public/assets/images/roadmap_desktop.svg';
import RoadmapImageNew from '../../../../public/assets/images/astroon-roadmap.svg';
import planet_image1 from '../../../../public/assets/images/planets/Group 91.svg';
import planet_image2 from '../../../../public/assets/images/planets/Group 87.svg';
import planet_image3 from '../../../../public/assets/images/planets/Group 90.svg';
// import ZoomView from '../ZoomView';
// import youtubeImage from '../../../../public/assets/images/Ekran Resmi 2023-01-18 16.40.28.PNG';
// import loadingImage from '../../../../public/assets/images/Ekran Resmi 2023-01-18 16.40.32.PNG';
// import boxImage from '../../../../public/assets/images/Ekran Resmi 2023-01-18 16.40.38.PNG';
// import cafeImage from '../../../../public/assets/images/Ekran Resmi 2023-01-18 16.40.42.PNG';
// import moonImage from '../../../../public/assets/images/Ekran Resmi 2023-01-18 16.40.47.PNG';
// import nftImage from '../../../../public/assets/images/Ekran Resmi 2023-01-18 16.40.52.PNG';
// import artImage from '../../../../public/assets/images/Ekran Resmi 2023-01-18 16.40.56.PNG';
// import gameImage from '../../../../public/assets/images/Ekran Resmi 2023-01-18 16.41.02.PNG';
// import baseImage from '../../../../public/assets/images/Ekran Resmi 2023-01-18 16.41.08.PNG';

const Roadmap = () => {
  // const [showPreView, setShowPreView] = useState({
  //   youtube: false,
  //   loading: false,
  //   box: false,
  //   cafe: false,
  //   moon: false,
  //   nft: false,
  //   art: false,
  //   game: false,
  //   base: false,
  // });

  // const handlePreviewClose = () => {
  //   setShowPreView(() => ({
  //     youtube: false,
  //     loading: false,
  //     box: false,
  //     cafe: false,
  //     moon: false,
  //     nft: false,
  //     art: false,
  //     game: false,
  //     base: false,
  //   }));
  // };
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

            {/* <div
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
            >
              <h5>01</h5>
              <p style={{ marginBottom: '0px' }}>Q1 2023</p>
              <p style={{ marginBottom: '0px' }}>Animated Series</p>
            </ZoomView> */}

            {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}

            {/* <div
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
            >
              <h5>02</h5>
              <p style={{ marginBottom: '0px' }}>Q1 2023</p>
              <p style={{ marginBottom: '0px' }}>Token Seed Sale</p>
            </ZoomView> */}

            {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}

            {/* <div
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
            >
              <h5>03</h5>
              <p style={{ marginBottom: '0px' }}>Q2 2023</p>
              <p style={{ marginBottom: '0px' }}>Token Private Sale</p>
            </ZoomView> */}

            {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}

            {/* <div
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
            >
              <h5>04</h5>
              <p style={{ marginBottom: '0px' }}>Q2 2023</p>
              <p style={{ marginBottom: '0px' }}>Token Public Sale</p>
            </ZoomView> */}

            {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}

            {/* <div
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
            >
              <h5>05</h5>
              <p style={{ marginBottom: '0px' }}>Q2 2023</p>
              <p style={{ marginBottom: '0px' }}>
                TGE (Token Generation Event )
              </p>
            </ZoomView> */}

            {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}

            {/* <div
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
            >
              <h5>06</h5>
              <p style={{ marginBottom: '0px' }}>Q3 2023</p>
              <p style={{ marginBottom: '0px' }}>NFT Pre-Sale</p>
            </ZoomView> */}

            {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}

            {/* <div
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
            >
              <h5>07</h5>
              <p style={{ marginBottom: '0px' }}>Q3 2023</p>
              <p style={{ marginBottom: '0px' }}>NFT Public Sale</p>
            </ZoomView> */}

            {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}

            {/* <div
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
            >
              <h5>08</h5>
              <p style={{ marginBottom: '0px' }}>Q3 2023</p>
              <p style={{ marginBottom: '0px' }}>Game</p>
            </ZoomView> */}

            {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}

            {/* <div
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
            >
              <h5>09</h5>
              <p style={{ marginBottom: '0px' }}>Q4 2023</p>
              <p style={{ marginBottom: '0px' }}>Game</p>
            </ZoomView> */}

            {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
          </div>

          <div className={styles.planet_image1}>
            <Image src={planet_image1} alt="planet" layout="responsive" />
          </div>
          <div className={styles.planet_image2}>
            <Image src={planet_image2} alt="planet" layout="responsive" />
          </div>
          <div className={styles.planet_image3}>
            <Image src={planet_image3} alt="planet" layout="responsive" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Roadmap;
