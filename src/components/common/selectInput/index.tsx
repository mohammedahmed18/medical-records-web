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
  value: string | number;
  label?: string;
};

type Props = {
  options: SingleOption[];
  registeredProps?: UseFormRegisterReturn<string>;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl>;
  formLabel?: string;
  setValue?: (v: string) => void;
  watchedValue?: string;
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
    watchedValue,
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

  const getLabelByValue = (v: string) => {
    const label = options.find((o) => o.value == v)?.label;
    return label;
  };
  const filteredOptions =
    search.trim() !== ''
      ? options.filter(
          (o) =>
            o.label
              ?.toString()
              .toLowerCase()
              .includes(search.trim().toLowerCase()) ||
            o.value
              .toString()
              .toLowerCase()
              .includes(search.trim().toLowerCase())
        )
      : options;

  return (
    <div>
      <div className={clsx('mb-7 flex flex-col', className)}>
        {formLabel && (
          <label className='mb-3 block text-2xl font-semibold text-zinc-700'>
            {formLabel}
          </label>
        )}
        <div className='relative'>
          <input
            type='text'
            className={clsx(styles.select, 'text-transparent')}
            readOnly
            placeholder={placeholder || `select ${formLabel}`}
            {...registeredProps}
            onClick={() => setShowList(true)}
          />
          <span className='absolute left-7 top-1/2 -z-[1] -translate-y-1/2 select-none text-2xl text-black'>
            {getLabelByValue(watchedValue || '')}
          </span>
          <ArrowDownIcon className='absolute top-1/2 right-4 -translate-y-1/2 fill-zinc-400' />

          {showList && (
            <div className='absolute z-[51] mt-2 w-full overflow-hidden rounded-2xl border-2 bg-white/20 p-3 shadow-lg backdrop-blur-lg'>
              {options.length > minOptionsToShowSearch && (
                <TextInput
                  className='relative z-[51] mb-2 rounded-2xl border-2 border-primary-300 bg-gray-100 py-3'
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
                    onClick={() => handleSelectOption(o.value.toString())}
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
