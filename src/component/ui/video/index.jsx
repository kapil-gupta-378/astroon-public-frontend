import React from 'react';
import style from './video.module.scss';

const Video = () => {
  return (
    <>
      <div className={style.video_border}>
        <video className={style.animation_video} controls>
          <source src="mov_bbb.mp4" type="video/mp4" />
        </video>
      </div>
    </>
  );
};

export default Video;
