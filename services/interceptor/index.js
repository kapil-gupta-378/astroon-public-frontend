import axios from 'axios';

export const requestInterceptor = (route) => {
  axios.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      const userToken = localStorage.getItem('userToken');
      const adminToken = localStorage.getItem('adminToken');
      if (userToken || adminToken || route) {
        config.headers.common.Authorization = `Bearer ${
          route.pathname.substring(0, 6) === '/admin' ? adminToken : userToken
        }`;
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
        if (route.pathName === '/admin') route.push('/login');
        return Promise.reject(error);
      }

      return Promise.reject(error);
    },
  );
};
