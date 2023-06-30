import { AllMedicalRecordsActionTypes } from '@/types/medicalRecords';

export const RecordTypesColors: Partial<
  Record<keyof typeof AllMedicalRecordsActionTypes, string>
> = {
  Generic: '#4B565D',
  Diagnosis: '#0D5DB8',
  Surgery: '#5D0B41',
  Illness: '#0F8F93',
  Allergy: '#B88E0D',
  LabTest: '#472892',
  Birth: '#0F9313',
  Death: '#B80D0D',
};
