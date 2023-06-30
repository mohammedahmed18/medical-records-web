import _ from 'lodash';
import { twMerge } from 'tailwind-merge';

import StarEmpty from '~/svg/star-empty-icon.svg';
import StarFull from '~/svg/star-full-icon.svg';
import StarHalf from '~/svg/star-half-icon.svg';

type Props = {
  value: number;
  maxValue?: number;
  reviewsCount?: number;
  size?: 'md' | 'lg';
};

export const starClassName = (size: string) =>
  twMerge(
    'fill-orange-400',
    size === 'md' && 'w-6 h-6 ',
    size === 'lg' && 'w-10 h-10 '
  );

const RatingStars = ({
  value,
  maxValue = 5,
  reviewsCount,
  size = 'md',
}: Props) => {
  const starsFilledCount = Math.floor(value);
  const hasHalfStar = value % 1 !== 0;
  const starsEmptyCount = maxValue - starsFilledCount - (hasHalfStar ? 1 : 0);

  return (
    <div className='flex items-center gap-2'>
      {_.range(starsFilledCount).map((i) => (
        <StarFull key={i} className={starClassName(size)} />
      ))}
      {hasHalfStar && <StarHalf className={starClassName(size)} />}
      {_.range(starsEmptyCount).map((i) => (
        <StarEmpty key={i} className={starClassName(size)} />
      ))}
      {reviewsCount && (
        <span className='text-2xl text-zinc-500'>({reviewsCount})</span>
      )}
    </div>
  );
};

export default RatingStars;
