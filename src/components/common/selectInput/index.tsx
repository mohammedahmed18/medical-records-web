import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegisterReturn,
} from 'react-hook-form';

import styles from './SelectInput.module.css';

import TextInput from '@/components/common/textInput';

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
  setValue?: (v: string) => void;
  placeholder?: string;
  className?: string;
  defaultValue?: string;
  minOptionsToShowSearch?: number;
};

const SelectInput = (props: Props) => {
  const [showList, setShowList] = useState(false);
  const [search, setSearch] = useState<string>('');
  const {
    className,
    placeholder,
    options,
    registeredProps,
    error,
    formLabel,
    setValue,
    defaultValue,
    minOptionsToShowSearch = 4,
  } = props;
  const errorMsg = error?.message?.toString();

  const handleSelectOption = (value: string) => {
    setValue && setValue(value);
    setShowList(false);
  };

  useEffect(() => {
    if (defaultValue && setValue) setValue(defaultValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredOptions =
    search.trim() !== ''
      ? options.filter(
          (o) =>
            o.label?.toLowerCase().includes(search.trim().toLowerCase()) ||
            o.value.toLowerCase().includes(search.trim().toLowerCase())
        )
      : options;

  return (
    <div>
      <div className={clsx('my-3 flex flex-col', className)}>
        {formLabel && (
          <label className='mb-3 block text-2xl font-semibold text-zinc-700'>
            {formLabel}
          </label>
        )}
        <div className='relative'>
          <input
            type='text'
            className={styles.select}
            readOnly
            placeholder={placeholder || `select ${formLabel}`}
            {...registeredProps}
            onClick={() => setShowList(true)}
          />
          <ArrowDownIcon className='absolute top-1/2 right-4 -translate-y-1/2 fill-zinc-400' />

          {showList && (
            <div className='absolute z-[51] mt-2 w-full overflow-hidden rounded-2xl border-2 bg-white/20 p-3 shadow-lg backdrop-blur-lg'>
              {options.length > minOptionsToShowSearch && (
                <TextInput
                  className='relative z-[51] mb-2 rounded-2xl border-2 border-primary-50 bg-gray-100 py-3 focus:border-primary-200'
                  containerClassName='mb-[0]'
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                />
              )}

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
                  type: 'tween',
                  duration: 0.2,
                }}
                className={clsx(styles.optionsList, 'z-[51]')}
              >
                {filteredOptions.map((o) => (
                  <span
                    onClick={() => handleSelectOption(o.value)}
                    key={o.value}
                    className={styles.listItem}
                  >
                    {o.label || o.value}
                  </span>
                ))}
              </motion.div>
            </div>
          )}
        </div>
        {showList && (
          <div
            className='fixed inset-0 z-50'
            onClick={() => setShowList(false)}
          ></div>
        )}
      </div>

      {errorMsg && <ErrorMessage msg={errorMsg} />}
    </div>
  );
};

export default SelectInput;
