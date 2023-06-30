import * as yup from 'yup';

const DoctorReviewSchema = yup
  .object({
    comment: yup.string().required(),
    stars: yup.number().min(1).max(5),
  })
  .required();
export default DoctorReviewSchema;
