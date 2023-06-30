import clsx from 'clsx';
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegisterReturn,
} from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

import styles from './TextArea.module.css';

import ErrorContainer from '@/components/common/errorContainer';

import ErrorMessage from '../errorMsg';
// TODO: add more properties for validation
type props = {
  placeholder?: string;
  className?: string;
  wrapperClassName?: string;
  label?: string;
  registeredProps?: UseFormRegisterReturn<string>;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl>;
} & React.ComponentPropsWithRef<'textarea'>;
const TextArea = ({
  placeholder = '',
  className,
  label,
  registeredProps,
  error,
  wrapperClassName,
  ...rest
}: props) => {
  const errorMsg = error?.message?.toString();
  return (
    <div className={clsx('my-4 mb-7 flex flex-col gap-2', wrapperClassName)}>
      {label && (
        <span className='text-2xl font-semibold capitalize text-zinc-600'>
          {label}
        </span>
      )}
      <textarea
        {...registeredProps}
        placeholder={placeholder || ''}
        className={twMerge(
          styles.textInput,
          errorMsg && 'focus:border-red-900',
          className
        )}
        {...rest}
      ></textarea>
      {errorMsg && (
        <ErrorContainer>
          <ErrorMessage msg={errorMsg} />
        </ErrorContainer>
      )}
    </div>
  );
};

export default TextArea;
