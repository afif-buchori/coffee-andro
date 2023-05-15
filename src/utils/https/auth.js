/* eslint-disable prettier/prettier */
import axios from 'axios';

// const baseUrl = process.env.REACT_APP_SERVER_HOST;
const baseUrl = 'https://coffee-shop-taupe.vercel.app';

export const fetchLogin = (body, controller) => {
  const url = `${baseUrl}/auth`;
  return axios.post(url, body, {signal: controller.signal});
};

export const register = (email, password, phone, controller) => {
  const url = `${baseUrl}/auth/register`;
  const body = {email, password, phone};
  return axios.post(url, body, {signal: controller.signal});
};

export const forgotEmail = (email, controller) => {
  const url = `${baseUrl}/auth/forgot`;
  return axios.patch(url, {email}, {signal: controller.signal});
};

export const setPassbyForgot = (email, otpCode, password, controller) => {
  const url = `${baseUrl}/auth/editpassbyforgot`;
  const body = {email, code_otp: otpCode, password};
  return axios.patch(url, body, {signal: controller.signal});
};

export const getProfile = (id, controller) => {
  const url = `${baseUrl}/users/${id}`;
  return axios.get(url, {signal: controller.signal});
};

export const updateProfile = (token, file, body, controller) => {
  const url = `${baseUrl}/auth/profile`;
  console.log('FILE IMAGE', file);
  const formData = new FormData();
  if (file !== '') {
    formData.append('image', {
      uri: file.uri,
      name: file.fileName,
      type: file.type,
    });
  }
  Object.entries(body).forEach(([key, value]) => {
    formData.append(key, value);
  });
  // Object.keys(body).forEach(key => {
  //   formData.set(key, body[key]);
  // });
  // console.log('FORMDATA', formData);
  return axios.patch(url, formData, {
    signal: controller.signal,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const authLogout = (token, controller) => {
  const url = `${baseUrl}/auth/logout`;
  return axios.delete(url, {
    signal: controller.signal,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
