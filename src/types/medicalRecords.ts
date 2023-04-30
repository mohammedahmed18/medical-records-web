import { AxiosResponse } from 'axios';

export type MedicalRecord = {
  id: string;
  userId: string;
  title: string;
  details: MedicalRecordDetail[];
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
  Illness = 'Illness',
  Allergy = 'Allergy',
  LabTest = 'LabTest',
}
export enum AllMedicalRecordsActionTypes {
  Generic = 'Generic',
  Diagnosis = 'Diagnosis',
  Surgery = 'Surgery',
  Illness = 'Illness',
  Allergy = 'Allergy',
  LabTest = 'LabTest',

  Birth = 'Birth',
  Death = 'Death',
}
export enum DetailType {
  date = 'date',
  text = 'text',
  list = 'list',
  email = 'email',
  url = 'url',
  phone = 'phone',
}
export type MedicalRecordDetail = {
  type: keyof typeof DetailType;
  value: string;
  key: string;
};
export type MedicalRecordsResponseType = AxiosResponse<MedicalRecord[]>;
