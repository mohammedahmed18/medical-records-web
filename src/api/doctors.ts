import { SingleDoctorSearch } from '@/components/doctors/doctorSearchCard';

import { api } from './axios';

// TYPES

export type GetDoctorsParams = {
  medicalSpecialization?: string;
  q?: string;
};

export type DoctorProfile = {
  name: string;
  image_src: string;
  medicalSpecialization: string;
  email?: string;
  DoctorData: {
    totalRating: number;
    hasChatEnabled: boolean;
  };
  _count: {
    writtenMedicalRecors: number;
  };
  report: Record<string, string | number>[];
};

export type DoctorReview = {
  id: string;
  comment: string | null;
  rating: number;
  createdAt: Date;
  reviewer: {
    image_src: string;
    name: string;
  };
};

export const scanQrCode = (qrCode: string) => {
  return api.post('/doctors/scan-qrCode', { qrCode }).then((res) => res.data);
};

export const readUserRecords = async (qrCode: string) => {
  return api
    .post('/doctors/read-medical-records', { qrCode })
    .then((res) => res.data);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createMedicalRecord = (data: any) => {
  return api.post('/records', data).then((res) => res.data);
};

export const getAllDoctors = async (params: GetDoctorsParams) => {
  return api
    .get<SingleDoctorSearch[]>('/doctors', {
      params: {
        ...params,
      },
    })
    .then((res) => res.data);
};

export const getDoctorProfile = async (doctorId: string | undefined) => {
  return api.get<DoctorProfile>(`/doctors/${doctorId}`).then((res) => res.data);
};

export const getDoctorReviews = async (doctorId: string | undefined) => {
  return api
    .get<DoctorReview[]>(`/doctors/reviews`, { params: { doctorId } })
    .then((res) => res.data);
};
