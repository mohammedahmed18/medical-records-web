import axios from 'axios';
import Cookies from 'js-cookie';

import { isProd } from '@/constant/env';
import { showToast } from '@/utils/toast';

export const SERVER_URL = isProd
  ? 'https://medical-records-server1.onrender.com'
  : 'http://localhost:3000';

export const API_BASE_URL = SERVER_URL + '/api/v1';

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
      const { errorCode } = error.response.data;
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

      if (errorCode === ERROR_CODES.SCAN_YOUR_SELF_ERR_CODE) {
        // trying to scan qr of yourself
        return showToast("you can't scan your qr code", 'error');
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
  SCAN_YOUR_SELF_ERR_CODE: 'S__yy2',
};
