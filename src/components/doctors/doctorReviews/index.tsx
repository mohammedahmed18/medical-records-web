import { useQuery } from 'react-query';

import { getDoctorReviews } from '@/api/doctors';
import Container from '@/components/container';
import DoctorReviewItem from '@/components/doctors/doctorReviewItem';
import ReviewForm from '@/components/doctors/reviewForm';
import { DOCTOR_REVIEWS } from '@/constant/queryKeys';

type Props = {
  doctorId: string;
};

const DoctorReviews = (props: Props) => {
  const { doctorId } = props;
  const { data } = useQuery([DOCTOR_REVIEWS, doctorId], {
    queryFn: () => getDoctorReviews(doctorId.toString()),
  });
  const reviews = data || [];
  return (
    <div className='w-full'>
      <h2 className='mx-auto w-fit rounded-full p-4 text-4xl shadow-lg'>
        Reviews
      </h2>
      <Container
        className='grid w-full grid-cols-1 justify-between gap-4 py-10'
        narrow
      >
        <ReviewForm doctorId={doctorId} />
        {reviews.map((review) => (
          <DoctorReviewItem key={review.id} review={review} />
        ))}
      </Container>
    </div>
  );
};

export default DoctorReviews;
