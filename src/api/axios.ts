import axios from 'axios';
import Cookies from 'js-cookie';

import { isProd } from '@/constant/env';
import { showToast } from '@/utils/toast';

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
      const { message, errorCode } = error.response.data;
      // check error codes first
      if (errorCode === ERROR_CODES.INVALID_LOGIN) {
        // wrong national id or password
        return showToast(message, 'error');
      }

      switch (status) {
        case 401:
          Cookies.remove('token');
          break;
        case 400:
          break;
        case 403:
          break;
      }
    }
  }
);

const ERROR_CODES = {
  INVALID_LOGIN: '04557',
};
