import axios from 'axios';

export const requestInterceptor = () => {
  axios.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem('token');
      // Do something before request is sent
      if (token) {
        config.headers.common.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    },
  );
};

export const responseInterceptor = (route) => {
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    function (error) {
      // const originalRequest = error.config;

      if (error.response.status === 401) {
        route.push('/login');
        return Promise.reject(error);
      }

      return Promise.reject(error);
    },
  );
};
