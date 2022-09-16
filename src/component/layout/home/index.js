import React from 'react';
import Image from 'next/image';
import style from './Home.module.scss';
import Button from '../../common/Button';
import HomePageImage from "../../../../public/images/homepage.svg"
function Home() {
  return (
    <div className={style['home_wrp']}>
      <div className={`${style.home_page} container-fluid`}>
        <div className={style.home_details}>
          <h1>Collect, Buy and sell</h1>
          <h4>extraprdinary NFT'S</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            tristique consectetur placerat tortor adipiscing. Nascetur quam
          </p>
          <Button
                    data-content="explore"
                    className={`${style.home_wallet_btn}`}
                  >
                    {/* <Image src={walletIcon} alt="wallet" /> */}
                    Eplore
                  </Button>
        </div>
        <div className="home_images">
          <Image src={HomePageImage} width="370%" />
        </div>
      </div>
    </div>
  );
}

export default Home;
