import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import * as yup from 'yup';

import createMedicalRecordSchema from '@/lib/formSchemas/createMedicalRecordSchema';

import Button from '@components/buttons/Button';
import CheckInput from '@components/common/CheckInput';
import SelectInput from '@components/common/selectInput';
import Spinner from '@components/common/spinner';
import TextInput from '@components/common/textInput';
import DetailsForm from '@components/doctors/detailsForm';

import { createMedicalRecord } from '@/api/doctors';
import { ALL_ACTION_TYPES_OPTIONS } from '@/constant/common';
import { showToast } from '@/utils/toast';

import { MedicalRecordsActionTypes } from '@/types/medicalRecords';
import { PatientQrInfo } from '@/types/user';

type Props = {
  patientData?: PatientQrInfo;
};
const CreateRecordForm = (props: Props) => {
  const { patientData } = props;
  const [detailsNumberArr, setDetailsNumberArr] = useState([1]);

  const { isLoading: createLoading, mutate: createRecord } = useMutation({
    mutationFn: createMedicalRecord,
  });

  const getDetailsDefaultValues = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const defaultDetailsValues: any = {};
    detailsNumberArr.forEach((num) => {
      defaultDetailsValues[`key_${num}`] = '';
      defaultDetailsValues[`type_${num}`] = '';
      defaultDetailsValues[`value_${num}`] = '';
    });
    return defaultDetailsValues;
  };

  const detailsFormsSchema = useMemo(() => {
    const schema: Record<string, yup.Schema> = {};

    detailsNumberArr.map((num) => {
      schema[`key_${num}`] = yup.string().required().label('detail key');
      schema[`type_${num}`] = yup.string().required().label('detail type');
      schema[`value_${num}`] = yup.string().required().label('detail value');
    });
    return schema;
  }, [detailsNumberArr]);

  const getSingleFormRegestiredProps = (num: number) => {
    return {
      key: register(`key_${num}`),
      type: register(`type_${num}`),
      value: register(`value_${num}`),
    };
  };

  const getSingleFormErrors = (num: number) => {
    const identefier = `_${num}`;
    const filteredErrors = Object.keys(errors)
      .filter((key) => key.includes(identefier))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .reduce((obj: any, key: string) => {
        obj[key.replace(identefier, '')] = errors[key];
        return obj;
      }, {});
    return filteredErrors;
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(createMedicalRecordSchema(detailsFormsSchema)),
    mode: 'all',
    defaultValues: {
      title: '',
      lifetime: false,
      userId: null,
      actionType: '',
      ...getDetailsDefaultValues(),
    },
  });

  const onValid = handleSubmit(async (data) => {
    data['details'] = [];

    detailsNumberArr.forEach((number) => {
      data['details'].push({
        type: data[`type_${number}`],
        key: data[`key_${number}`],
        value: data[`value_${number}`],
      });
      delete data[`type_${number}`];
      delete data[`key_${number}`];
      delete data[`value_${number}`];
    });
    if (!patientData?.id)
      return showToast("you must scan the patient's qr code", 'error');
    data['userId'] = patientData.id;
    await createRecord(data);
  });

  const handleAddANewDetail = () => {
    const lastDetailNumber = detailsNumberArr[detailsNumberArr.length - 1];
    setDetailsNumberArr((prev) => [
      ...prev,
      isNaN(lastDetailNumber) ? 1 : lastDetailNumber + 1,
    ]);
  };
  const handleRemoveDetail = (num: number) => {
    setDetailsNumberArr((prev) => {
      return prev.filter((n) => n !== num);
    });
  };
  return (
    <div>
      {/* fields */}
      <form className='p-7 shadow-md' onSubmit={onValid}>
        {/* ----------- end scan qr code ------------ */}

        <TextInput
          label='title'
          placeholder='medical record title'
          registeredProps={register('title')}
          error={errors['title']}
          type='text'
        />

        <SelectInput
          options={ALL_ACTION_TYPES_OPTIONS}
          registeredProps={register('actionType')}
          formLabel='Medical record type'
          error={errors['actionType']}
          setValue={(v) => setValue('actionType', v)}
          defaultValue={MedicalRecordsActionTypes.Generic}
        />
        <div className='mb-10'></div>

        <DetailsForm
          detailsNumberArr={detailsNumberArr}
          getSingleFormErrors={getSingleFormErrors}
          getSingleFormRegestiredProps={getSingleFormRegestiredProps}
          handleAddANewDetail={handleAddANewDetail}
          handleRemoveDetail={handleRemoveDetail}
          setValue={(key, number, value) => {
            setValue(`${key}_${number}`, value);
          }}
          watchedValues={Object.keys(getDetailsDefaultValues()).reduce(
            (dest: Record<string, string>, key: string) => {
              dest[key] = watch(key);
              return dest;
            },
            {}
          )}
        />

        <CheckInput label='chronic' registeredProps={register('lifetime')} />

        <Button
          variant='primary'
          size='lg'
          disabled={createLoading}
          type='submit'
        >
          Create medical record
        </Button>
        {createLoading && <Spinner className='ml-2 inline-block' size={15} />}
      </form>
    </div>
  );
};

export default CreateRecordForm;
