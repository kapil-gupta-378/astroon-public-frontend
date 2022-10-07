import React from 'react';
import Video from '../src/component/ui/video';
import PlayCreateEarn from '../src/component/ui/play-create-earn';
import AstroonGame from '../src/component/ui/astroon-game';
import FindUs from '../src/component/ui/find-us';

const Games = () => {
  return (
    <div className="container">
      <Video />
      <PlayCreateEarn />
      <AstroonGame />
      <FindUs />
    </div>
  );
};

export default Games;
