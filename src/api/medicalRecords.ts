import { api } from './axios';

import { MedicalRecordsResponseType } from '@/types/medicalRecords';

type getMedicalRecordsParmas = {
  take?: number;
  skip?: number;
};
export const getMedicalRecords = (params: getMedicalRecordsParmas) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return api
    .get<any, MedicalRecordsResponseType>('/records', { params })
    .then((res) => res.data);
};
