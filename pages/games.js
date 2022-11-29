import React, { useState, useEffect } from 'react';
import Video from '../src/component/ui/video';
import PlayCreateEarn from '../src/component/ui/play-create-earn';
import AstroonGame from '../src/component/ui/astroon-game';
import FindUs from '../src/component/ui/find-us';
import { getGamesAppURLApi } from '../services/api/content-management/games-management';
import { toast, ToastContainer } from 'react-toastify';

const Games = () => {
  const [getUrl, setUrl] = useState('');

  useEffect(() => {
    getGamesData();
  }, []);

  const getGamesData = async () => {
    const res = await getGamesAppURLApi();
    if (res.success) {
      setUrl(res.data);
    } else {
      toast.error(res.message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  return (
    <div className="container">
      <Video />
      <PlayCreateEarn />
      <AstroonGame />
      <FindUs getUrl={getUrl} />
      <ToastContainer />
    </div>
  );
};

export default Games;
