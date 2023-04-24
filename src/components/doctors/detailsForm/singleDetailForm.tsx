import React from 'react';
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegisterReturn,
} from 'react-hook-form';

type Props = {
  registeredProps: Record<string, UseFormRegisterReturn<string>>;
  errors:
    | Record<string, FieldError>
    | Record<string, Merge<FieldError, FieldErrorsImpl>>;
};
const SingleDetailForm = ({ registeredProps, errors }: Props) => {
  return <div></div>;
};

export default SingleDetailForm;
