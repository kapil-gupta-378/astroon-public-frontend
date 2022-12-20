import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { getGeneralSettingsApi } from '../../../../services/api/general-settings';
import logoIcon from '../../../../public/assets/images/Logo.png';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const WebsiteLogo = () => {
  const [data, setData] = useState({});
  const router = useRouter();

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
        style={{ cursor: 'pointer' }}
        src={data.websiteLogo ? data.websiteLogo : logoIcon}
        height={100}
        width={150}
        layout="fixed"
        alt="logo"
        onClick={() =>
          router.pathname.includes('/admin')
            ? router.push('/admin/dashboard')
            : router.pathname.slice(0, 6) === '/login'
            ? router.push('/login')
            : router.push('/')
        }
      />
    </>
  );
};

export default WebsiteLogo;
