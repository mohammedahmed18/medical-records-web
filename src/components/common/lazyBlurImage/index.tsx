import clsx from 'clsx';
import Image, { ImageProps } from 'next/image';
import { useEffect, useState } from 'react';

import { resizeCloudinaryImage } from '@/utils/resizeCloudinary';

type Props = ImageProps;
const LazyBlurImage = (props: Props) => {
  const { alt, className = true, ...rest } = props;

  const [base64Lazy, setBase64Lazy] = useState<string | ArrayBuffer | null>('');

  const convertToBase64 = async (src?: string) => {
    try {
      if (!src) return '';
      const response = await fetch(src);
      const blob = await response.blob();
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64data = reader.result;
        setBase64Lazy(base64data);
      };

      reader.readAsDataURL(blob);
    } catch (error) {
      return src;
      // console.error('Error converting image to base64:', error);
    }
  };

  useEffect(() => {
    if (props.src)
      convertToBase64(resizeCloudinaryImage(props.src.toString(), 15));
  }, [props.src]);

  const hasBlurData = base64Lazy !== '';

  return (
    <Image
      // onLoadingComplete={() => setLoaded(true)}
      placeholder={hasBlurData ? 'blur' : 'empty'}
      blurDataURL={base64Lazy?.toString()}
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
