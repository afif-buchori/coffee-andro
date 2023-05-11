/* eslint-disable prettier/prettier */
import axios from 'axios';

// const baseUrl = process.env.REACT_APP_SERVER_HOST;
const baseUrl = 'https://coffee-shop-taupe.vercel.app';

export const getProducts = (params, controller) => {
  const url = `${baseUrl}/products?limit=${params.limit}&page=${params.page}&category=${params.category}&search=${params.search}&order=${params.sort}`;
  console.log(url);
  return axios.get(url, {signal: controller.signal});
};

export const getProductsDetails = (params, controller) => {
  const url = `${baseUrl}/products/${params}`;
  return axios.get(url, params, {signal: controller.signal});
};

export const getPromos = controller => {
  const url = baseUrl + '/promos';
  return axios.get(url, {signal: controller.signal});
};
