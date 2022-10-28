import React, { useRef, useState } from 'react';
import styles from './videoPlayer.module.scss';
// import videoThumbnail from '../../../../public/assets/images/videoThumbnail.png';
import VideoThumbnail from 'react-video-thumbnail';
const VideoPlayer = () => {
  const [playing, setPlaying] = useState(false);

  const videoRef = useRef(null);

  const videoHandler = (control) => {
    if (control === 'play') {
      videoRef.current.play();
      setPlaying(true);
    } else if (control === 'pause') {
      videoRef.current.pause();
      setPlaying(false);
    }
  };
  return (
    <div className={styles.video_border}>
      <video className={styles.animation_video} ref={videoRef}>
        <source src="/assets/videos/videos.mp4" type="video/mp4" />
      </video>
      {!playing && <VideoThumbnail videoUrl={'/assets/videos/videos.mp4'} />}
      <div className={styles.video_btn_wrp}>
        <button
          type="button"
          onClick={() => {
            if (!playing) {
              videoHandler('play');
            } else {
              videoHandler('pause');
            }
          }}
        >
          {!playing ? (
            <svg
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M30 0C13.457 0 0 13.4583 0 30C0 46.5417 13.457 60 30 60C46.543 60 60 46.5417 60 30C60 13.4583 46.543 0 30 0ZM41.9263 31.0511L24.4263 42.3011C24.2213 42.4341 23.9844 42.5 23.75 42.5C23.545 42.5 23.3374 42.4487 23.1519 42.3475C22.749 42.1277 22.5 41.7077 22.5 41.25V18.75C22.5 18.2923 22.749 17.8723 23.1519 17.6525C23.5474 17.4353 24.043 17.4486 24.4263 17.6989L41.9263 28.9489C42.2828 29.1784 42.5 29.5752 42.5 30C42.5 30.4248 42.2828 30.8215 41.9263 31.0511Z"
                fill="white"
              />
            </svg>
          ) : (
            <svg
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M30 0C13.44 0 0 13.44 0 30C0 46.56 13.44 60 30 60C46.56 60 60 46.56 60 30C60 13.44 46.56 0 30 0ZM27 42H21V18H27V42ZM39 42H33V18H39V42Z"
                fill="white"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;
