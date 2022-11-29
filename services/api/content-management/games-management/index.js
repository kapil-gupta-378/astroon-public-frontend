import axios from 'axios';
const APP_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getGamesAppURLApi = async () => {
  const xhr = await axios.get(`${APP_URL}game-management`);
  return xhr.data;
};

export const insertGamesAppURLApi = async (data) => {
  const xhr = await axios.post(`${APP_URL}game-management`, data);
  return xhr.data;
};

export const updateGamesAppURLApi = async (id, data) => {
  const xhr = await axios.put(`${APP_URL}game-management/${id}`, data);
  return xhr.data;
};
