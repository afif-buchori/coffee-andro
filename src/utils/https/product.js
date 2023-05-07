/* eslint-disable prettier/prettier */
import axios from 'axios';

// const baseUrl = process.env.REACT_APP_SERVER_HOST;
const baseUrl = 'https://coffee-shop-taupe.vercel.app';

export const getProducts = (params, controller) => {
  const url = `${baseUrl}/products?limit=${params.limit}&page=${params.page}&category=${params.category}&search=${params.search}`;
  console.log(url);
  return axios.get(url, {signal: controller.signal});
};
