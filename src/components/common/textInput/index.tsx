import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegisterReturn,
} from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

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
  Icon?: (props: { className?: string }) => JSX.Element;
} & React.ComponentPropsWithRef<'input'>;

const TextInput = ({
  placeholder = '',
  type,
  className,
  label,
  registeredProps,
  containerClassName,
  error,
  Icon,
  ...rest
}: props) => {
  const errorMsg = error?.message?.toString();
  return (
    <div
      className={twMerge('my-4 mb-7 flex flex-col gap-2', containerClassName)}
    >
      {label && (
        <div className='flex items-end gap-3 text-2xl font-semibold capitalize text-zinc-600'>
          <span>{label}</span>
        </div>
      )}
      <div className='relative w-full'>
        {Icon && (
          <Icon
            className={twMerge(
              'absolute bottom-1/2 left-4 h-8 w-8 translate-y-1/2 fill-primary-400',
              errorMsg && 'fill-red-900'
            )}
          />
        )}
        <input
          {...registeredProps}
          type={type || 'text'}
          placeholder={placeholder || ''}
          className={twMerge(
            'w-full',
            styles.textInput,
            errorMsg && 'focus:border-red-900',
            Icon && 'pl-20',
            className
          )}
          {...rest}
        />
      </div>
      {errorMsg && (
        <ErrorContainer>
          <ErrorMessage msg={errorMsg} />
        </ErrorContainer>
      )}
    </div>
  );
};

export default TextInput;
