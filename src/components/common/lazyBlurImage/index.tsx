import Image, { ImageProps } from 'next/image';
import { twMerge } from 'tailwind-merge';

import { resizeCloudinaryImage } from '@/utils/resizeCloudinary';

type Props = ImageProps;
const LazyBlurImage = (props: Props) => {
  const { alt, className, ...rest } = props;

  return (
    <Image
      // onLoadingComplete={() => setLoaded(true)}
      placeholder='blur'
      blurDataURL={resizeCloudinaryImage(props.src.toString(), 15)}
      alt={alt}
      className={twMerge(
        // !loaded && smooth && 'opacity-50',
        'transition-all duration-100 ease-in-out',
        className
      )}
      {...rest}
    />
  );
};

export default LazyBlurImage;
