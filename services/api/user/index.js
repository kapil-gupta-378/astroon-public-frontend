import axios from 'axios';
const APP_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const createUserApi = async (data) => {
  const xhr = await axios.request({
    method: 'post',
    url: `${APP_URL}users`,
    data,
  });

  return xhr.data;
};

export const loginUserApi = async (data) => {
  const xhr = await axios.request({
    method: 'post',
    url: `${APP_URL}users/login`,
    data,
  });

  return xhr.data;
};

export const forgotPasswordUserApi = async (data) => {
  const xhr = await axios.request({
    method: 'post',
    url: `${APP_URL}users/generate-reset-password-token`,
    data,
  });

  return xhr.data;
};

export const verifyResetPasswordTokenUserApi = async (verifyPasswordToken) => {
  const xhr = await axios.request({
    method: 'get',
    url: `${APP_URL}users/verify-reset-password-token/${verifyPasswordToken}`,
  });

  return xhr.data;
};

export const resetPasswordUserApi = async (data, resetPasswordToken) => {
  const xhr = await axios.request({
    method: 'post',
    url: `${APP_URL}users/${resetPasswordToken}/reset-password`,
    data,
  });

  return xhr.data;
};
