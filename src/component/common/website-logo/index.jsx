import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { getGeneralSettingsApi } from '../../../../services/api/general-settings';
import logoIcon from '../../../../public/assets/images/Logo.png';
import { toast } from 'react-toastify';

const WebsiteLogo = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    fetchComponentData();
  }, []);

  const fetchComponentData = async () => {
    const res = await getGeneralSettingsApi();
    setData(res.data);
    if (res.success) {
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
    <>
      <Image
        src={data.websiteLogo ? data.websiteLogo : logoIcon}
        height={100}
        width={150}
        layout="fixed"
        alt="logo"
      />
    </>
  );
};

export default WebsiteLogo;
