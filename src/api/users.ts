import { api } from '@/api/axios';

export const generateQrcode = (): Promise<string> => {
  return api.post('/users/qr-generate').then((res) => res.data?.qrCode);
};
