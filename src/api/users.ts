import { api } from '@/api/axios';

export type PublicUserInfo = {
  medicalSpecialization: string;
  name: string;
  image_src: string;
  id: string;
};

export const generateQrcode = (): Promise<string> => {
  return api.post('/users/qr-generate').then((res) => res.data?.qrCode);
};

export const getPublicUserInfo = (
  userId: string | undefined
): Promise<{ user: PublicUserInfo }> | null => {
  if (!userId) {
    return null;
  }
  return api
    .get<{ user: PublicUserInfo }>('/users/' + userId)
    .then((res) => res.data);
};
