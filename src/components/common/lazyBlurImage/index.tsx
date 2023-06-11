import clsx from 'clsx';
import Image, { ImageProps } from 'next/image';

import { resizeCloudinaryImage } from '@/utils/resizeCloudinary';

type Props = ImageProps;
const LazyBlurImage = (props: Props) => {
  const { alt, className = true, ...rest } = props;

  return (
    <Image
      // onLoadingComplete={() => setLoaded(true)}
      placeholder='blur'
      blurDataURL={resizeCloudinaryImage(props.src.toString(), 15)}
      alt={alt}
      className={clsx(
        // !loaded && smooth && 'opacity-50',
        'transition-all duration-100 ease-in-out',
        className
      )}
      {...rest}
    />
  );
};

export default LazyBlurImage;
