import { api } from './axios';

export const scanQrCode = (qrCode: string) => {
  return api.post('/doctors/scan-qrCode', { qrCode }).then((res) => res.data);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createMedicalRecord = (data: any) => {
  return api.post('/records', data).then((res) => res.data);
};
