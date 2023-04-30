import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import logger from '@/lib/logger';

import SingleDetailForm from '@components/doctors/detailsForm/singleDetailForm';

import Button from '@/components/buttons/Button';
import Divider from '@/components/common/divider';

import PlusIcon from '~/svg/plus-icon.svg';
const DetailsForm = () => {
  const [detailsNumberArr, setDetailsNumberArr] = useState([1]);

  // const detailsNumberArr = _.range(detailsNumber).map((n) => n + 1);

  const detailsFormsSchema = useMemo(() => {
    const schema: Record<string, yup.Schema> = {};

    detailsNumberArr.map((num) => {
      schema[`key_${num}`] = yup.string().required().label('detail key');
      schema[`type_${num}`] = yup.string().required().label('detail type');
      schema[`value_${num}`] = yup.string().required().label('detail value');
    });
    return schema;
  }, [detailsNumberArr]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(yup.object(detailsFormsSchema)),
  });

  const getSingleFormRegestiredProps = (num: number) => {
    return {
      key: register(`key_${num}`),
      type: register(`type_${num}`),
      value: register(`value_${num}`),
    };
  };

  const getSingleFormErrors = (num: number) => {
    const identefier = `_${num}`;
    const filteredErrors = Object.keys(errors)
      .filter((key) => key.includes(identefier))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .reduce((obj: any, key) => {
        obj[key.replace(identefier, '')] = errors[key];
        return obj;
      }, {});
    return filteredErrors;
  };

  const onValid = handleSubmit((data) => {
    if (isValid) logger(data);
    alert('submitting');
  });

  const handleAddANewDetail = () => {
    const lastDetailNumber = detailsNumberArr[detailsNumberArr.length - 1];
    setDetailsNumberArr((prev) => [
      ...prev,
      isNaN(lastDetailNumber) ? 1 : lastDetailNumber + 1,
    ]);
  };
  const handleRemoveDetail = (num: number) => {
    setDetailsNumberArr((prev) => {
      return prev.filter((n) => n !== num);
    });
  };
  return (
    <form onSubmit={onValid}>
      <h3 className='text-2xl'>Details</h3>
      <Divider />
      {detailsNumberArr.map((num) => (
        <SingleDetailForm
          key={num}
          registeredProps={getSingleFormRegestiredProps(num)}
          errors={getSingleFormErrors(num)}
          setType={(v) => setValue(`type_${num}`, v)}
          deleteMySelf={() => handleRemoveDetail(num)}
        />
      ))}
      <Button
        onClick={handleAddANewDetail}
        variant='light'
        size='base'
        className='mx-auto flex gap-2 rounded-full'
      >
        <PlusIcon className='text-lg' />
        Add Detail
      </Button>
    </form>
  );
};

export default DetailsForm;
