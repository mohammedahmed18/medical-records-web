import { UseFormRegisterReturn } from 'react-hook-form';

type props = {
  label: string;
  registeredProps?: UseFormRegisterReturn<string>;
};
const CheckInput = ({ label, registeredProps }: props) => {
  const identifier = label + 'checkbox';
  return (
    <div className='relative my-7 flex items-center'>
      <label htmlFor={identifier}>
        <span className='mr-7 text-2xl font-semibold'>{label}</span>
        <input
          type='checkbox'
          className='checkbox-primary checkbox checkbox-lg'
          id={identifier}
          {...registeredProps}
        />
      </label>
    </div>

    // <div className='relative my-7 flex items-center'>
    //   <label className='text-2xl font-semibold' htmlFor={identifier}>
    //   {label}
    //   </label>

    //   <div className={styles.checkbox}>
    //     <input type='checkbox' id={identifier} {...registeredProps} />
    //     <label htmlFor={identifier}></label>
    //   </div>
    // </div>
  );
};

export default CheckInput;
