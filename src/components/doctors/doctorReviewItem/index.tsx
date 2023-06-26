import moment from 'moment';
import Image from 'next/image';

import { DoctorReview } from '@/api/doctors';
import ThreeDimensionalPerspectiveImage from '@/components/common/3dPerspectiveImage';
import UserProfileImage from '@/components/common/UserProfileImage';
import RatingStars from '@/components/doctors/ratingStars.tsx';
import { resizeCloudinaryImage } from '@/utils/resizeCloudinary';

import QuoteIcon from '~/svg/quote-right-icon.svg';
type Props = {
  review: DoctorReview;
};
const DoctorReviewItem = ({ review }: Props) => {
  const {
    comment,
    rating,
    reviewer: { image_src, name },
    createdAt,
  } = review;
  const imageSize = 100;
  const reviewrImage = resizeCloudinaryImage(image_src, imageSize);
  return (
    <ThreeDimensionalPerspectiveImage>
      <div className='relative flex flex-col items-center gap-4 rounded-2xl border-2 border-primary-50/30 bg-white py-5 px-4 shadow-lg'>
        <span className='absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-200 p-5 shadow-md'>
          <QuoteIcon className='h-12 w-12 fill-white' />
        </span>
        <div className='mask mask-squircle relative mx-auto w-fit overflow-hidden bg-black p-6'>
          <Image
            alt='overlay'
            src={reviewrImage || ''}
            width={imageSize}
            height={imageSize}
            className='absolute inset-0 h-full w-full'
          />
          <div className='absolute inset-0 h-full backdrop-blur-sm' />
          <UserProfileImage
            src={reviewrImage}
            size={imageSize}
            className='mask-circle'
          />
        </div>

        <span className='text-3xl'>{name}</span>

        <RatingStars value={rating} />

        {comment && (
          <p className='text-muted mt-10 w-full text-center text-2xl'>
            {comment}
          </p>
        )}

        <span className='ml-auto text-lg font-semibold text-zinc-400'>
          {moment(createdAt).format('dd mm yy')}
        </span>
      </div>
    </ThreeDimensionalPerspectiveImage>
  );
};

export default DoctorReviewItem;
