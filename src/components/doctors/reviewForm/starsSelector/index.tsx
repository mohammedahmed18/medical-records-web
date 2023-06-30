import _ from 'lodash';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

import { starClassName } from '@/components/doctors/ratingStars.tsx';

import StarFull from '~/svg/star-full-icon.svg';

type Props = {
  setStars: (n: number) => void;
  currentStarsCount: number;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl>;
};
const StarsSelector = (props: Props) => {
  const { currentStarsCount, setStars } = props;
  // TODO: use a constant value instead
  const starsCount = 5;
  const starsArray = _.range(starsCount).map((i) => i + 1);
  return (
    <div className='mx-auto flex w-fit items-center gap-3'>
      {starsArray.map((order) => (
        <StarFull
          key={order}
          onClick={() => {
            setStars(order);
          }}
          className={twMerge(
            starClassName('lg'),
            'cursor-pointer',
            currentStarsCount < order && 'fill-gray-200'
          )}
        />
      ))}
    </div>
  );
};

export default StarsSelector;
