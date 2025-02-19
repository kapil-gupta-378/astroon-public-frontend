import axios from 'axios';
const APP_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const getGeneralSettingsApi = async () => {
  const xhr = await axios.request({
    method: 'get',
    url: `${APP_URL}general-settings`,
  });
  return xhr.data;
};

export const postGeneralSettingsApi = async (data) => {
  const xhr = await axios.request({
    method: 'post',
    url: `${APP_URL}general-settings`,
    data: data,
  });
  return xhr;
};

export const updateGeneralSettingsApi = async (id, data) => {
  const xhr = await axios.request({
    method: 'put',
    url: `${APP_URL}general-settings/${id}`,
    data,
  });
  return xhr.data;
};

export const uploadBrandingLogoApi = async (data) => {
  const xhr = await axios.post(
    `${APP_URL}upload?fileFor=brandingLogo&fileType=image`,
    data,
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    },
  );
  return xhr.data.data;
};
export const uploadWebsiteLogoApi = async (data) => {
  const xhr = await axios.post(
    `${APP_URL}upload?fileFor=websiteLogo&fileType=image`,
    data,
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    },
  );
  return xhr.data.data;
};
