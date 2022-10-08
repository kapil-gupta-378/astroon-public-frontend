import React from 'react';
import Image from 'next/image';
import style from './findus.module.scss';

const FindUs = () => {
  return (
    <div className={style.findus_wrap}>
      <div className={style.findus_on_your_wrap}>
        <div className={style.findus_on_your} />
        <div className={style.findus_on_your_container}>
          <h1>Find us on your favorite device</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            tristique consectetur
          </p>
          <div className={style.findus_content}>
            <button className={style.app_store_btn}>
              <div className={style.app_store_btn_dis}>
                <div className={style.app_store_btn_img}>
                  <Image
                    src={'/assets/images/app_store.svg'}
                    width={26}
                    height={24}
                    alt="btnback"
                    layout="fixed"
                  />
                </div>
                <div className={style.app_store_btn_text}>
                  <p>Download on the</p>
                  <br />
                  <h6>App Store</h6>
                </div>
              </div>
            </button>
            <button className={style.app_store_btn}>
              <div className={style.app_store_btn_dis}>
                <div className={style.app_store_btn_img}>
                  <Image
                    src={'/assets/images/app_store.svg'}
                    width={26}
                    height={24}
                    alt="btnback"
                    layout="fixed"
                  />
                </div>
                <div className={style.app_store_btn_text}>
                  <p>Download on the</p>
                  <br />
                  <h6>App Store</h6>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindUs;
