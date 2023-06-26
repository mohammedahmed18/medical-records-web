import { twMerge } from 'tailwind-merge';

import LazyBlurImage from '@/components/common/lazyBlurImage';
import DefaultImage from '@/constant/ui';

type props = {
  src?: string;
  alt?: string;
  size?: number;
  className?: string;
  rounded?: boolean;
};

const UserProfileImage: React.FC<props> = ({
  src,
  alt,
  rounded,
  className,
  size,
}) => {
  return (
    <LazyBlurImage
      width={size || 70}
      height={size || 70}
      className={twMerge(
        'object-cover ring-2 ring-primary-100',
        rounded && 'rounded-full',
        !rounded && 'mask mask-squircle', //we seperate the mask because the ring is not applied if the mask is enabled , and we want to get the ring when the image is rounded
        className
      )}
      src={src || DefaultImage}
      alt={alt || ''}
    />
  );
};

export default UserProfileImage;
