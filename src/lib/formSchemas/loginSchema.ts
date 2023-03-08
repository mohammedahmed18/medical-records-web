import * as yup from 'yup';

const loginSchema = yup
  .object({
    nationalId: yup
      .string()
      .matches(
        /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/,
        'national id must be numbers only'
      )
      .required()
      .length(14)
      .label('National Id'),
    password: yup.string().required().label('password').min(6),
  })
  .required();
export default loginSchema;
