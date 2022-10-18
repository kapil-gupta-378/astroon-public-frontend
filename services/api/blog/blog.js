import axios from 'axios';
const APP_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getBlogDataApi = async (page, limit) => {
  const xhr = await axios.request({
    method: 'get',
    url: `${APP_URL}blog`,
    params: {
      page: page,
      limit: limit,
    },
  });

  return xhr.data.data;
};

export const deleteBlogDataApi = async (id) => {
  const xhr = await axios.request({
    method: 'delete',
    url: `${APP_URL}blog/${id}`,
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  });

  return xhr.data;
};

export const sortBlogDataApi = async (sortBy) => {
  const xhr = await axios.request({
    method: 'get',
    url: `${APP_URL}blog?sortBy=${sortBy}`,
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  });

  return xhr.data.data;
};

export const createBlogApi = async (data) => {
  const xhr = await axios.request({
    method: 'post',
    url: `${APP_URL}blog`,
    data: data,
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  });

  return xhr.data;
};

export const uploadBlogBannerImageToServer = async (data) => {
  const xhr = await axios.post(
    `${APP_URL}upload?fileFor=banner&fileType=image`,
    data,
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    },
  );
  return xhr.data.data;
};
