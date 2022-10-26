import axios from 'axios';
const APP_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const getGeneralInformationApi = async () => {
  const xhr = await axios.request({
    method: 'get',
    url: `${APP_URL}general-information`,
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  });
  return xhr.data;
};

export const postGeneralInformationApi = async (data) => {
  const xhr = await axios.request({
    method: 'post',
    url: `${APP_URL}general-information`,
    data: data,
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  });
  return xhr;
};

export const updateGeneralInformationApi = async (id, data) => {
  const xhr = await axios.request({
    method: 'put',
    url: `${APP_URL}general-information/${id}`,
    data,
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  });
  return xhr.data;
};

export const uploadHomePageYoutubeThumbnailApi = async (data) => {
  const xhr = await axios.post(
    `${APP_URL}upload?fileFor=profile&fileType=image`,
    data,
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    },
  );
  return xhr.data.data;
};
