type Props = {
  doctorId: string;
};

const DoctorReviews = (props: Props) => {
  const { doctorId } = props;
  return <h1>Hello world {doctorId}</h1>;
};

export default DoctorReviews;
