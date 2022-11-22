import axios from 'axios';
const APP_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getVideosForPagesApi = async () => {
  const xhr = await axios.get(`${APP_URL}video-management`);
  return xhr.data;
};

export const uploadVideosApi = async (data) => {
  const xhr = await axios.post(
    `${APP_URL}upload?fileFor=videoManagement&fileType=video`,
    data,
  );
  return xhr.data;
};

export const insertVideosForPagesApi = async (data) => {
  const xhr = await axios.post(`${APP_URL}video-management`, data);
  return xhr.data;
};

export const updateVideosForPagesApi = async (id, data) => {
  const xhr = await axios.put(`${APP_URL}video-management/${id}`, data);
  return xhr.data;
};
