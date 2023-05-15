/* eslint-disable prettier/prettier */
import axios from 'axios';
import {SERVER_HOST} from '@env';

const baseUrl = SERVER_HOST;

export const getProducts = (params, controller) => {
  const url = `${baseUrl}/products?limit=${params.limit}&page=${params.page}&category=${params.category}&search=${params.search}&order=${params.sort}`;
  // console.log(url);
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

export const createProduct = (token, file, body, controller) => {
  const url = baseUrl + '/products';
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
  return axios.post(url, formData, {
    signal: controller.signal,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};
