import { AxiosResponse } from 'axios';

export type MedicalRecord = {
  id: string;
  userId: string;
  title: string;
  details: [];
  doctorId?: string;
  createdAt: Date;
  updatedAt: Date;
  lifetime: boolean;
  actionType: string; //TODO: create enum
  doctor?: {
    id: string;
    name: string;
    email: string;
    image_src?: string;
    medicalSpecialization?: string;
  };
};
export enum MedicalRecordsActionTypes {
  Generic = 'Generic',
  Diagnosis = 'Diagnosis',
  Surgery = 'Surgery',
  // Birth = 'Birth',
  // Death = 'Death',
  Illness = 'Illness',
  Allergy = 'Allergy',
  LabTest = 'LabTest',
}
export type MedicalRecordsResponseType = AxiosResponse<MedicalRecord[]>;