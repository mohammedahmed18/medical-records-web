import { yupResolver } from '@hookform/resolvers/yup';
import _ from 'lodash';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import logger from '@/lib/logger';

import SingleDetailForm from '@/components/doctors/detailsForm/singleDetailForm';
const DetailsForm = () => {
  const [detailsNumber, _setDetailsNumber] = useState(0);

  const detailsNumberArr = _.range(detailsNumber).map((n) => n + 1);

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
  });

  return (
    <form onSubmit={onValid}>
      {detailsNumberArr.map((num) => (
        <SingleDetailForm
          key={num}
          registeredProps={getSingleFormRegestiredProps(num)}
          errors={getSingleFormErrors(num)}
        />
      ))}
    </form>
  );
};

export default DetailsForm;
