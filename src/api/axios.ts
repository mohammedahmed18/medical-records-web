import axios from 'axios';
import Cookies from 'js-cookie';

import { isProd } from '@/constant/env';

export const API_BASE_URL = isProd
  ? 'https://medical-records-server1.onrender.com/api/v1'
  : 'http://localhost:3000/api/v1';

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message;
      switch (status) {
        case 401:
          Cookies.remove('token');
          break;
        case 400:
          // show toast
          alert(message);
          break;
        case 403:
          alert(message);
      }
    }
  }
);
