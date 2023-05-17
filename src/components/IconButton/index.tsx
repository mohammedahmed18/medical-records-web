import clsx from 'clsx';
import * as React from 'react';
import { IconType } from 'react-icons';

import Button from '@components/buttons/Button';

type ButtonProps = { Icon: IconType } & React.ComponentPropsWithRef<'button'>;

const IconButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, Icon, ...rest }, ref) => {
    return (
      <Button
        ref={ref}
        {...rest}
        variant='light'
        className={clsx(
          'rounded-2xl p-4 text-4xl transition-all duration-300 hover:shadow-md',
          rest.className
        )}
      >
        {Icon && <Icon className='text-4xl' />}
        {children}
      </Button>
    );
  }
);

export default IconButton;
