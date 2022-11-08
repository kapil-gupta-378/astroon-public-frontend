import axios from 'axios';
const APP_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const getAdminListDataApi = async (data) => {
  const xhr = await axios.request({
    method: 'get',
    url: `${APP_URL}users`,
    params: data,
  });
  return xhr.data.data;
};

export const deleteAdminApi = async (id) => {
  const xhr = await axios.request({
    method: 'delete',
    url: `${APP_URL}users/${id}`,
  });
  return xhr.data;
};
export const adminAuditApi = async (data) => {
  const xhr = await axios.request({
    method: 'post',
    url: `${APP_URL}admin-audit`,
    data: data,
  });
  return xhr;
};

export const fetchAdminApi = async (id) => {
  const xhr = await axios.request({
    method: 'get',
    url: `${APP_URL}users/${id}`,
  });
  return xhr.data.data;
};

export const updateAdminDataApi = async (id, data) => {
  const xhr = await axios.request({
    method: 'put',
    url: `${APP_URL}users/${id}`,
    data,
  });
  return xhr.data;
};
export const updateAdminProfileImageToServerApi = async (data) => {
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
export const createAdminAccountApi = async (data) => {
  const xhr = await axios.post(
    `${APP_URL}users/admin/account-create`,
    data,
    {},
  );
  return xhr.data;
};

export const createAdminAuditApi = async (data) => {
  const xhr = await axios.request({
    method: 'post',
    url: `${APP_URL}admin-audit`,
    data,
  });
  return xhr.data;
};

export const changeAdminRoleApi = async (id, data) => {
  const xhr = await axios.request({
    method: 'put',
    url: `${APP_URL}role/${id}`,
    data,
  });
  return xhr.data;
};

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

export const getCurrentLoginAdminData = async () => {
  const xhr = await axios.request({
    method: 'get',
    url: `${APP_URL}users/profile`,
  });

  return xhr.data;
};
