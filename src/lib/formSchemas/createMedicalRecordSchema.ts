import * as yup from 'yup';

const createMedicalRecordSchema = yup
  .object({
    title: yup.string().required().label('medical record title'),
    lifetime: yup.boolean().default(false),
  })
  .required();
export default createMedicalRecordSchema;
