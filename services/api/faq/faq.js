import axios from 'axios';
const APP_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getFaqDataApi = async (page, limit) => {
  const xhr = await axios.request({
    method: 'get',
    url: `${APP_URL}faq`,
    params: {
      page: page,
      limit: limit,
    },
  });

  return xhr.data.data;
};
