import { yupResolver } from '@hookform/resolvers/yup';
import { FieldValues, useForm } from 'react-hook-form';

import DoctorsFiltersSchema from '@/lib/formSchemas/doctorFiltersSchema';

import { GetDoctorsParams } from '@/api/doctors';
import Button from '@/components/buttons/Button';
import SelectInput from '@/components/common/selectInput';
import TextInput from '@/components/common/textInput';
import {
  ALL_MEDICAL_SPECIALIZATION_OPTIONS,
  SORT_OPTIONS,
} from '@/constant/common';

type Props = {
  setSearchParams: (v: GetDoctorsParams) => void;
  clearFilters: () => void;
};
const DoctorsFilters = ({ setSearchParams, clearFilters }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(DoctorsFiltersSchema),
    defaultValues: {
      medicalSpecialization: '',
      topRated: '',
      mostReviews: '',
      q: '',
    },
  });

  const onSubmit = (data: FieldValues) => {
    //
    Object.entries(data) // Array(2) [["a", "something"], ["b", 42]]
      .forEach(([key, value]) => {
        if (!value || value === '' || value === undefined) delete data[key];
      });
    setSearchParams(data);
  };

  const handleClearFilters = () => {
    reset();
    clearFilters();
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-5 rounded-2xl border-2 border-gray-200 p-4 shadow-md'
    >
      <TextInput
        type='text'
        label='doctor name'
        placeholder='search doctors by name'
        registeredProps={register('q')}
        error={errors['q']}
      />
      <SelectInput
        options={ALL_MEDICAL_SPECIALIZATION_OPTIONS}
        registeredProps={register('medicalSpecialization')}
        formLabel='Medical Specialization'
        error={errors['medicalSpecialization']}
        setValue={(v) => setValue('medicalSpecialization', v)}
      />

      <SelectInput
        options={SORT_OPTIONS}
        registeredProps={register('topRated')}
        formLabel='Top Rated'
        error={errors['topRated']}
        setValue={(v) => setValue('topRated', v)}
      />

      <SelectInput
        options={SORT_OPTIONS}
        registeredProps={register('mostReviews')}
        formLabel='Most Reviews'
        error={errors['mostReviews']}
        setValue={(v) => setValue('mostReviews', v)}
      />

      <div className='flex justify-between'>
        <Button className='my-10 w-fit' size='lg' type='submit'>
          Apply Filters
        </Button>

        <Button
          variant='light'
          className='my-10 w-fit'
          size='lg'
          role='button'
          onClick={handleClearFilters}
        >
          Clear Filters
        </Button>
      </div>
    </form>
  );
};

export default DoctorsFilters;
