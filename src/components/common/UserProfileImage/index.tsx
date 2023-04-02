import clsx from 'clsx';
import Image from 'next/image';

import DefaultImage from '@/constant/ui';

type props = {
  src?: string;
  alt?: string;
  size?: number;
  className?: string;
};
const UserProfileImage: React.FC<props> = ({ src, alt, className }) => {
  return (
    <Image
      width={70}
      height={70}
      className={clsx(
        'h-20 w-20 rounded-full object-cover ring-2 ring-primary-50',
        className
      )}
      src={src || DefaultImage}
      alt={alt || ''}
    />
  );
};

export default UserProfileImage;
