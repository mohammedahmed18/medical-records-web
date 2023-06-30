import { yupResolver } from '@hookform/resolvers/yup';
import { FieldValues, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';

import DoctorReviewSchema from '@/lib/formSchemas/doctorReviewSchema';

import {
  DoctorReview,
  makeADoctorReview,
  MakeReviewInput,
} from '@/api/doctors';
import Button from '@/components/buttons/Button';
import TextArea from '@/components/common/textArea';
import { ReviewerImageSize } from '@/components/doctors/doctorReviewItem';
import StarsSelector from '@/components/doctors/reviewForm/starsSelector';
import { DOCTOR_REVIEWS } from '@/constant/queryKeys';
import { useAuth } from '@/contexts/authContext';
import { resizeCloudinaryImage } from '@/utils/resizeCloudinary';

const ReviewForm = ({ doctorId }: { doctorId: string }) => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(DoctorReviewSchema),
    defaultValues: {
      comment: '',
      rating: 3,
    },
  });

  const cache = useQueryClient();

  const { isLoading, mutate: createReview } = useMutation({
    mutationFn: makeADoctorReview,
    onSuccess(newReview) {
      cache.setQueriesData(
        [DOCTOR_REVIEWS, doctorId],
        (data: DoctorReview[] | undefined) => {
          reset();
          const prev = data || [];
          return [
            {
              ...newReview,
              reviewer: {
                name: user.name,
                image_src: resizeCloudinaryImage(
                  user.image_src,
                  ReviewerImageSize
                ),
              },
            },
            ...prev,
          ];
        }
      );
    },
  });

  const oneSubmit = (data: FieldValues) => {
    //
    createReview({ doctorId, ...data } as MakeReviewInput);
  };
  return (
    <form
      onSubmit={handleSubmit(oneSubmit)}
      className='mb-20 border-2 px-4 py-7 shadow-md'
    >
      <h3>Leave a review</h3>

      <StarsSelector
        currentStarsCount={watch('rating')}
        setStars={(n) => setValue('rating', n)}
      />
      <TextArea
        registeredProps={register('comment')}
        wrapperClassName='my-4'
        error={errors.comment}
        className='h-60 resize-none'
      />
      <Button
        disabled={isLoading}
        type='submit'
        className='float-right'
        size='lg'
      >
        Submit
      </Button>
    </form>
  );
};

export default ReviewForm;
