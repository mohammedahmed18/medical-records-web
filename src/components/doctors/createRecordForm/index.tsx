import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import createMedicalRecordSchema from '@/lib/formSchemas/createMedicalRecordSchema';
import logger from '@/lib/logger';

import Button from '@/components/buttons/Button';
import CheckInput from '@/components/common/CheckInput';
import Spinner from '@/components/common/spinner';
import TextInput from '@/components/common/textInput';
import PatientCard from '@/components/doctors/patientCard';
import ScanQrCode from '@/components/doctors/scanQrCode';

import { scanQrCode } from '@/api/doctors';

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createMedicalRecordSchema),
    defaultValues: {
      title: '',
      lifetime: false,
    },
  });
  const onValid = handleSubmit((data) => {
    logger(data);
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
      {isLoading && <Spinner />}
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

        <Button variant='primary' size='lg' type='submit'>
          Create medical record
        </Button>
      </form>
    </div>
  );
};

export default CreateRecordForm;
