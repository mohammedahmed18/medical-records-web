import { MedicalSpecialization } from '@/types/doctors';
import { AllMedicalRecordsActionTypes } from '@/types/medicalRecords';

export const ALL_ACTION_TYPES_OPTIONS = Object.keys(
  AllMedicalRecordsActionTypes
).map((value) => ({
  value,
  label: value,
}));

export const ALL_MEDICAL_SPECIALIZATION_OPTIONS = Object.keys(
  MedicalSpecialization
).map((value) => ({
  value,
  label: value,
}));

export const SORT_OPTIONS = [
  {
    label: 'Ascending',
    value: 'asc',
  },
  {
    label: 'Descending',
    value: 'desc',
  },
];
