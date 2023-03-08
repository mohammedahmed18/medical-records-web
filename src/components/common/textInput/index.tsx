import clsx from 'clsx';
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegisterReturn,
} from 'react-hook-form';

import styles from './TextInput.module.css';
// TODO: add more properties for validation
type props = {
  placeholder?: string;
  type: string;
  className?: string;
  label?: string;
  registeredProps?: UseFormRegisterReturn<string>;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl>;
};
const TextInput = ({
  placeholder = '',
  type,
  className,
  label,
  registeredProps,
  error,
}: props) => {
  const errorMsg = error?.message?.toString();
  return (
    <div className='my-4 flex flex-col gap-2'>
      {label && (
        <span className='text-2xl font-semibold capitalize text-zinc-600'>
          {label}
        </span>
      )}
      <input
        type={type || 'text'}
        placeholder={placeholder || ''}
        className={clsx(
          styles.textInput,
          errorMsg && 'focus:border-b-red-900',
          className
        )}
        {...registeredProps}
      />
      {errorMsg && (
        <span className='text-lg font-bold text-red-800'>{errorMsg}</span>
      )}
    </div>
  );
};

export default TextInput;
