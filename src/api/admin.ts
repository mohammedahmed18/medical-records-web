import { api } from '@/api/axios';

export type UserForAdmin = {
  id: string;
  nationalId: string;
  name: string;
  email: string | null;
  createdAt: string;
  updatedAt: string;
  avg_monthly_income: number | string | null;
  dob: string;
  gender: string;
  image_src: string;
  weight: number | null;
  height_cm: number | null;
  medicalSpecialization: string;
  employmentStatus: string;
  maritalStatus: string;
  educationalLevel: string;
};

export const getAllUsers = async () => {
  return (
    api
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .get<UserForAdmin[]>('/users')
      .then((res) => res.data)
  );
};
