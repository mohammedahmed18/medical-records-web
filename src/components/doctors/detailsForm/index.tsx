import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

import SingleDetailForm from '@components/doctors/detailsForm/singleDetailForm';

import Button from '@/components/buttons/Button';
import Divider from '@/components/common/divider';

import PlusIcon from '~/svg/plus-icon.svg';

type Props = {
  detailsNumberArr: number[];
  getSingleFormRegestiredProps: (
    n: number
  ) => Record<string, UseFormRegisterReturn<string>>;
  getSingleFormErrors: (n: number) => Record<string, FieldError>;

  handleAddANewDetail: () => void;
  handleRemoveDetail: (n: number) => void;
  setValue: (k: string, n: number, v: string) => void;
  watchedValues: Record<string, string>;
};

const DetailsForm = ({
  detailsNumberArr,
  getSingleFormRegestiredProps,
  getSingleFormErrors,
  handleAddANewDetail,
  handleRemoveDetail,
  setValue,
  watchedValues,
}: Props) => {
  return (
    <div>
      <h3 className='text-2xl'>Details</h3>
      <Divider />
      {detailsNumberArr.map((num) => {
        const formWatchedValues: Record<string, string> = {};
        formWatchedValues['key'] = watchedValues[`key_${num}`];
        formWatchedValues['type'] = watchedValues[`type_${num}`];
        formWatchedValues['value'] = watchedValues[`value_${num}`];
        return (
          <SingleDetailForm
            key={num}
            registeredProps={getSingleFormRegestiredProps(num)}
            errors={getSingleFormErrors(num)}
            setType={(v) => setValue('type', num, v)}
            setValue={(v) => setValue('value', num, v)}
            deleteMySelf={() => handleRemoveDetail(num)}
            watchedValues={formWatchedValues}
          />
        );
      })}
      <Button
        onClick={handleAddANewDetail}
        variant='light'
        size='base'
        className='mx-auto flex gap-2 rounded-full'
      >
        <PlusIcon className='text-lg' />
        Add Detail
      </Button>
    </div>
  );
};

export default DetailsForm;
