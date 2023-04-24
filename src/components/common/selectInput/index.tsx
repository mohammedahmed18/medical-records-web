import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegisterReturn,
} from 'react-hook-form';

import styles from './SelectInput.module.css';

import ErrorMessage from '../errorMsg';

import ArrowDownIcon from '~/svg/arrow-down.svg';

type SingleOption = {
  value: string;
  label?: string;
};

type Props = {
  options: SingleOption[];
  registeredProps?: UseFormRegisterReturn<string>;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl>;
  formLabel?: string;
  setValue: (v: string) => void;
  placeholder?: string;
};

const SelectInput = (props: Props) => {
  const [showList, setShowList] = useState(false);
  const { placeholder, options, registeredProps, error, formLabel, setValue } =
    props;
  const errorMsg = error?.message?.toString();

  const handleSelectOption = (value: string) => {
    setValue && setValue(value);
    setShowList(false);
  };

  return (
    <div>
      <div className='my-3 flex w-fit items-center gap-5'>
        <label className='mb-3 block text-2xl font-semibold text-zinc-700'>
          {formLabel}
        </label>
        <div className='relative'>
          <input
            type='text'
            className={styles.select}
            readOnly
            {...registeredProps}
            placeholder={placeholder || `select ${formLabel}`}
            onClick={() => setShowList(true)}
          />
          <ArrowDownIcon className='absolute top-1/2 right-4 -translate-y-1/2 fill-zinc-400' />
          {showList && (
            <motion.div
              initial={{
                height: 0,
                width: 0,
              }}
              animate={{
                height: 'auto',
                width: '100%',
                overflowY: 'auto',
              }}
              transition={{
                type: 'just',
                duration: 0.2,
              }}
              className={styles.optionsList}
            >
              {options.map((o) => (
                <span
                  onClick={() => handleSelectOption(o.value)}
                  key={o.value}
                  className={styles.listItem}
                >
                  {o.label || o.value}
                </span>
              ))}
            </motion.div>
          )}
        </div>
        {showList && (
          <div
            className='fixed inset-0'
            onClick={() => setShowList(false)}
          ></div>
        )}
      </div>

      {errorMsg && <ErrorMessage msg={errorMsg} />}
    </div>
  );
};

export default SelectInput;
