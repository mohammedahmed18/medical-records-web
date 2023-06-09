import clsx from 'clsx';
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegisterReturn,
} from 'react-hook-form';

import styles from './TextInput.module.css';

import ErrorContainer from '@/components/common/errorContainer';

import ErrorMessage from '../errorMsg';
// TODO: add more properties for validation
type props = {
  placeholder?: string;
  type?: string;
  className?: string;
  containerClassName?: string;
  label?: string;
  registeredProps?: UseFormRegisterReturn<string>;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl>;
} & React.ComponentPropsWithRef<'input'>;

const TextInput = ({
  placeholder = '',
  type,
  className,
  label,
  registeredProps,
  containerClassName,
  error,
  ...rest
}: props) => {
  const errorMsg = error?.message?.toString();
  return (
    <div className={clsx('my-4 mb-7 flex flex-col gap-2', containerClassName)}>
      {label && (
        <span className='text-2xl font-semibold capitalize text-zinc-600'>
          {label}
        </span>
      )}
      <input
        {...registeredProps}
        type={type || 'text'}
        placeholder={placeholder || ''}
        className={clsx(
          styles.textInput,
          errorMsg && 'focus:border-b-red-900',
          className
        )}
        {...rest}
      />
      {errorMsg && (
        <ErrorContainer>
          <ErrorMessage msg={errorMsg} />
        </ErrorContainer>
      )}
    </div>
  );
};

export default TextInput;
