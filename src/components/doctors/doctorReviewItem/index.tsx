import { motion } from 'framer-motion';
import moment from 'moment';

import { DoctorReview } from '@/api/doctors';
import ThreeDimensionalPerspectiveImage from '@/components/common/3dPerspectiveImage';
import UserProfileImage from '@/components/common/UserProfileImage';
import RatingStars from '@/components/doctors/ratingStars.tsx';
import { resizeCloudinaryImage } from '@/utils/resizeCloudinary';

import QuoteIcon from '~/svg/quote-right-icon.svg';
type Props = {
  review: DoctorReview;
};
export const ReviewerImageSize = 100;

const DoctorReviewItem = ({ review }: Props) => {
  const {
    comment,
    rating,
    reviewer: { image_src, name },
    createdAt,
  } = review;
  const reviewrImage = resizeCloudinaryImage(image_src, ReviewerImageSize);
  return (
    <ThreeDimensionalPerspectiveImage>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
        }}
        viewport={{ once: true }}
        className='relative flex flex-col items-center gap-4 rounded-2xl border-2 border-primary-50/30 bg-white py-5 px-4 shadow-lg'
      >
        <span className='absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-200 p-5 shadow-md'>
          <QuoteIcon className='h-12 w-12 fill-white' />
        </span>
        {/* <div className='mask mask-squircle relative mx-auto w-fit overflow-hidden bg-black p-6'>
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
        </div> */}

        <UserProfileImage src={reviewrImage} size={ReviewerImageSize} rounded />
        <span className='text-3xl'>{name}</span>

        <RatingStars value={rating} />

        {comment && (
          <p className='text-muted mt-10 w-full text-center text-2xl'>
            {comment}
          </p>
        )}

        <span className='ml-auto text-lg font-semibold text-zinc-400'>
          {moment(createdAt).calendar()}
        </span>
      </motion.div>
    </ThreeDimensionalPerspectiveImage>
  );
};

export default DoctorReviewItem;
