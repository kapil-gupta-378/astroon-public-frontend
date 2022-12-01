import React from 'react';
import Link from 'next/link';
import style from './joinyoutubechannel.module.scss';

const JoinYoutubeChannel = () => {
  return (
    <div className={style.join_wrap}>
      <div className={style.join_you_tube_wrap}>
        <div className={style.join_you_tube} />
        <div className={style.join_you_tube_container}>
          <h1>Join our Youtube Channel</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            tristique consectetur{' '}
          </p>
          <div className="text-center">
            <Link href="https://www.youtube.com/">
              <a target="_blank">
                <button className={style.join_now_btn}>Join Now</button>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinYoutubeChannel;
