import * as yup from 'yup';

const DoctorsFiltersSchema = yup
  .object({
    medicalSpecialization: yup.string(),
    topRated: yup.string(),
    mostReviews: yup.string(),
    q: yup.string(),
  })
  .required();
export default DoctorsFiltersSchema;
