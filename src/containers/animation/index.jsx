import React from 'react';
import Video from '../../component/ui/video';
import OurArtworks from '../../component/ui/ourartworks';
import JoinYoutubeChannel from '../../component/ui/join-youtube-channel';

const Animation = () => {
  return (
    <>
      <div className="container">
        <Video />
        <OurArtworks />
        <JoinYoutubeChannel />
      </div>
    </>
  );
};

export default Animation;
