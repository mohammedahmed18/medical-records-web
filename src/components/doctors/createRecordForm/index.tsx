import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import createMedicalRecordSchema from '@/lib/formSchemas/createMedicalRecordSchema';

import Button from '@/components/buttons/Button';
import CheckInput from '@/components/common/CheckInput';
import SelectInput from '@/components/common/selectInput';
import Spinner from '@/components/common/spinner';
import TextInput from '@/components/common/textInput';
import PatientCard from '@/components/doctors/patientCard';
import ScanQrCode from '@/components/doctors/scanQrCode';

import { createMedicalRecord, scanQrCode } from '@/api/doctors';
import { ALL_ACTION_TYPES_OPTIONS } from '@/constant/common';
import { showToast } from '@/utils/toast';

import QrIcon from '~/svg/qr-code.svg';

const CreateRecordForm = () => {
  const [showQrModal, setShowQrModal] = useState(false);
  const {
    data: patientData,
    isLoading,
    mutate,
  } = useMutation({
    mutationFn: scanQrCode,
  });

  const { isLoading: createLoading, mutate: createRecord } = useMutation({
    mutationFn: createMedicalRecord,
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createMedicalRecordSchema),
    defaultValues: {
      title: '',
      lifetime: false,
      userId: null,
      actionType: '',
    },
  });
  const onValid = handleSubmit(async (data) => {
    if (!patientData?.id)
      return showToast("you must scan the patient's qr code", 'error');
    data['userId'] = patientData.id;
    await createRecord(data);

    showToast('medical record is created successfully', 'success');
  });

  return (
    <div>
      <Button
        variant='light'
        size='lg'
        onClick={() => setShowQrModal(true)}
        className='gap-4 rounded-lg'
      >
        <QrIcon />
        <span>scan qr code</span>
      </Button>
      {/* scan user qr code */}
      <ScanQrCode
        mutate={mutate}
        isLoading={isLoading}
        showQrModal={showQrModal}
        onClose={() => setShowQrModal(false)}
      />
      {isLoading && <Spinner className='my-4' />}
      {/* patient info */}
      {patientData && <PatientCard patient={patientData} />}
      {/* fields */}
      <form className='p-7 shadow-md' onSubmit={onValid}>
        <TextInput
          label='title'
          placeholder='medical record title'
          registeredProps={register('title')}
          error={errors['title']}
          type='text'
        />
        <CheckInput label='chronic' registeredProps={register('lifetime')} />

        <SelectInput
          options={ALL_ACTION_TYPES_OPTIONS}
          registeredProps={register('actionType')}
          formLabel='Medical record type'
          error={errors['actionType']}
          setValue={(v) => setValue('actionType', v)}
        />
        <div className='mb-10'></div>
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
