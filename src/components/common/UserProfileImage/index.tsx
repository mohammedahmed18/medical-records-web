import clsx from 'clsx';
import Image from 'next/image';

import DefaultImage from '@/constant/ui';

type props = {
  src?: string;
  alt?: string;
  size?: number;
  className?: string;
};
const UserProfileImage: React.FC<props> = ({ src, alt, className, size }) => {
  return (
    <Image
      width={size || 70}
      height={size || 70}
      className={clsx(
        'mask mask-squircle object-cover ring-2 ring-primary-50',
        className
      )}
      src={src || DefaultImage}
      alt={alt || ''}
    />
  );
};

export default UserProfileImage;
