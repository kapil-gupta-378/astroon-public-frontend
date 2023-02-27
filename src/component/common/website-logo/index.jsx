import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { getGeneralSettingsApi } from '../../../../services/api/general-settings';
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
    setData(res.data ? res.data : {});
    if (res.success) {
    } else {
      toast.error(res.message);
    }
  };
  const ImageLoader = ({ src }) => {
    return `${src}`;
  };
  return (
    <>
      {data?.websiteLogo && (
        <Image
          style={{ cursor: 'pointer' }}
          loader={ImageLoader}
          src={data?.websiteLogo}
          height={100}
          width={150}
          layout="fixed"
          alt="logo"
          onClick={() =>
            router.pathname.includes('/admin')
              ? router.push('/admin/dashboard')
              : router.pathname.includes('/login')
              ? router.push('/login')
              : router.push('/')
          }
        />
      )}
    </>
  );
};

export default WebsiteLogo;
