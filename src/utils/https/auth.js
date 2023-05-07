/* eslint-disable prettier/prettier */
import axios from 'axios';

// const baseUrl = process.env.REACT_APP_SERVER_HOST;
const baseUrl = 'https://coffee-shop-taupe.vercel.app';

export const fetchLogin = (body, controller) => {
  const url = `${baseUrl}/auth`;
  return axios.post(url, body, {signal: controller.signal});
};
