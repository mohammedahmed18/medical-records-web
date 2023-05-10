import * as yup from 'yup';

const createMedicalRecordSchema = (detailsSchema: Record<string, yup.Schema>) => yup
  .object({
    title: yup.string().required().label('medical record title'),
    lifetime: yup.boolean().default(false),
    actionType: yup.string().required().label('action type'),
    ...detailsSchema
  })
  .required();
export default createMedicalRecordSchema;
