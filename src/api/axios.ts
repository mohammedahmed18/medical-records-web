import axios from 'axios';
import Cookies from 'js-cookie';
import Router from 'next/router';

import { isProd } from '@/constant/env';

export const API_BASE_URL = isProd
  ? 'https://medical-records-server1.onrender.com/api/v1'
  : 'http://localhost:3000/api/v1';

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      Cookies.remove('token');
      Router.push('/login');
    } else {
      return Promise.reject(error);
    }
  }
);
