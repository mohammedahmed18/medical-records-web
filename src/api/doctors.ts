import { api } from './axios';

export const scanQrCode = (qrCode: string) => {
  return api.post('/doctors/scan-qrCode', { qrCode }).then((res) => res.data);
};
