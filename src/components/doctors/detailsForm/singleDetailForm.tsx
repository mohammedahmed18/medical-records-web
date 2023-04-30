import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegisterReturn,
} from 'react-hook-form';

import styles from './SingleDetailForm.module.css';

import SelectInput from '@/components/common/selectInput';
import TextArea from '@/components/common/textArea';
import TextInput from '@/components/common/textInput';

import { DetailType } from '@/types/medicalRecords';

import DeleteIcon from '~/svg/delete-icon.svg';
type Props = {
  registeredProps: Record<string, UseFormRegisterReturn<string>>;
  errors:
    | Record<string, FieldError>
    | Record<string, Merge<FieldError, FieldErrorsImpl>>;
  setType: (v: string) => void;
  deleteMySelf: () => void;
};
const SingleDetailForm = ({
  registeredProps,
  errors,
  setType,
  deleteMySelf,
}: Props) => {
  const possibleDetails = Object.values(DetailType).map((value) => ({
    value,
  }));
  const [deleted, setDeleted] = useState(false);
  const handleDelete = () => {
    setDeleted(true);
  };
  useEffect(() => {
    if (!deleted) return;
    const timer = setTimeout(deleteMySelf, 300);
    return () => clearTimeout(timer);
  }, [deleteMySelf, deleted]);
  return (
    <div
      className={clsx(
        'mb-5 rounded-lg py-4 shadow-md ring-1',
        deleted && styles.deleted
      )}
    >
      <DeleteIcon
        onClick={handleDelete}
        className='mx-5 my-2 ml-auto cursor-pointer fill-red-900 text-3xl'
      />
      <div className='flex flex-col gap-2 px-4 md:flex-row'>
        <SelectInput
          options={possibleDetails}
          registeredProps={registeredProps['type']}
          placeholder='select type'
          setValue={setType}
          defaultValue={DetailType.text}
        />
        <TextInput
          registeredProps={registeredProps['key']}
          className='w-80 rounded-lg py-3 text-2xl'
          placeholder='key'
        />
        <TextArea
          registeredProps={registeredProps['value']}
          className='h-40 w-full rounded-lg py-3 text-2xl'
          placeholder='value'
          wrapperClassName='flex-1'
        />
      </div>
      {/* errors */}
      <ul className='flex flex-col gap-3 px-4'>
        {Object.values(errors).map((error, i) => (
          <span key={i} className='text-lg font-semibold text-red-800'>
            {error.message}
          </span>
        ))}
      </ul>
      {/*end of errors */}
    </div>
  );
};

export default SingleDetailForm;
