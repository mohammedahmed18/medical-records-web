import * as React from 'react';

import clsxm from '@/lib/clsxm';

// const TextButtonVariant = ['primary', 'basic'] as const;

type TextButtonProps = {
  // add types here
} & React.ComponentPropsWithRef<'button'>;

const TextButton = React.forwardRef<HTMLButtonElement, TextButtonProps>(
  (
    {
      children,
      className,
      // variant = 'primary',
      disabled: buttonDisabled,
      ...rest
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type='button'
        disabled={buttonDisabled}
        className={clsxm(
          'button items-center justify-center font-semibold',
          'focus:outline-none focus-visible:ring focus-visible:ring-primary-500',
          'w-fit px-10 py-5 text-2xl',
          //#region  //*=========== Variant ===========
          // variant === 'primary' && [
          //   'text-primary-500 hover:text-primary-600 active:text-primary-700',
          //   'disabled:text-primary-200',
          // ],
          // variant === 'basic' && [
          //   'text-black hover:text-gray-600 active:text-gray-800',
          //   'disabled:text-gray-300',
          // ],
          //#endregion  //*======== Variant ===========
          'disabled:cursor-not-allowed disabled:brightness-105 disabled:hover:underline',
          className
        )}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

export default TextButton;
