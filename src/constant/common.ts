import { AllMedicalRecordsActionTypes } from '@/types/medicalRecords';

export const ALL_ACTION_TYPES_OPTIONS = Object.keys(
  AllMedicalRecordsActionTypes
).map((value) => ({
  value,
  label: value,
}));
