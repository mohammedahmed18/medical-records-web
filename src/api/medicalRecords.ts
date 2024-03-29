import { api } from './axios';

import { MedicalRecordsResponseType } from '@/types/medicalRecords';

type getMedicalRecordsParmas = {
  take?: number;
  skip?: number;
  actionType?: string;
  doctor?: string;
};
export const getMedicalRecords = async (params: getMedicalRecordsParmas) => {
  return (
    api
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .get<any, MedicalRecordsResponseType>('/records', { params })
      .then((res) => res.data)
  );
};
