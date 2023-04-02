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
      const { _message, errorCode } = error.response.data;
      // check error codes first
      if (errorCode === ERROR_CODES.INVALID_LOGIN) {
        // wrong national id or password
        return showToast('wrong national id or password', 'error');
      }

      if (errorCode === ERROR_CODES.EXPIRED_QR_CODE) {
        // qr code is expied
        return showToast(
          'the Qr code is expired , please refresh the code',
          'error'
        );
      }

      if (errorCode === ERROR_CODES.INVALID_QR_CODE) {
        // qr code is invalid
        return showToast('Invalid Qr code', 'error');
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
  EXPIRED_QR_CODE: 'P__ee04557',
  INVALID_QR_CODE: 'P__ee05557',
};
