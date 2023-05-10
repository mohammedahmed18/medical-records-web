import { SingleDoctorSearch } from '@/components/doctors/doctorSearchCard';

import { api } from './axios';

// TYPES

export type GetDoctorsParams = {
  medicalSpecialization?: string;
  q?: string
}


export const scanQrCode = (qrCode: string) => {
  return api.post('/doctors/scan-qrCode', { qrCode }).then((res) => res.data);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createMedicalRecord = (data: any) => {
  return api.post('/records', data).then((res) => res.data);
};

export const getAllDoctors = (params : GetDoctorsParams) => {
  return api.get<SingleDoctorSearch[]>('/doctors', {params}).then((res) => res.data);
};
