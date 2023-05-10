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

export const getProfile = (id, controller) => {
  const url = `${baseUrl}/users/${id}`;
  return axios.get(url, {signal: controller.signal});
};
