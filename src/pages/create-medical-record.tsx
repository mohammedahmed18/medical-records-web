import { useState } from 'react';
import { useMutation } from 'react-query';
import { twMerge } from 'tailwind-merge';

import Container from '@components/container';
import CreateRecordForm from '@components/doctors/createRecordForm';
import PatientCard from '@components/doctors/patientCard';
import ScanQrCode from '@components/doctors/scanQrCode';
import Layout from '@components/layout';
import Seo from '@components/Seo';

import { scanQrCode } from '@/api/doctors';
import Button from '@/components/buttons/Button';
import protectedRoute from '@/components/common/protectedRoute';
import Spinner from '@/components/common/spinner';
import AiTestsForm from '@/components/doctors/aiTestsForm';

import QrIcon from '~/svg/qr-code.svg';

function CreateMedicalRecordPage() {
  const [showQrModal, setShowQrModal] = useState(false);
  type RecordType = 'mlTest' | 'normal';
  const [tab, setTab] = useState<RecordType>('normal');
  const {
    data: patientData,
    isLoading,
    mutate,
  } = useMutation({
    mutationFn: scanQrCode,
  });

  const tabClass = (text: RecordType) =>
    twMerge(
      'tab tab-lg tab-primary-100 transition-colors duration-300 text-2xl',
      tab === text && 'tab-active bg-primary-200'
    );

  const onSelectTab = (tabName: RecordType) => {
    setTab(tabName);
  };
  return (
    <Layout>
      <Container narrow>
        {/* //////////////////////////// */}
        {/* select user by qr code */}
        <Button
          variant='light'
          size='lg'
          onClick={() => setShowQrModal(true)}
          className='gap-4 rounded-lg'
        >
          <QrIcon />
          <span>scan patient qr code</span>
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

        <div className='mb-10'></div>

        {/* //////////////////////////// */}

        <div className='center-content'>
          <div className='tabs tabs-boxed mb-5'>
            <span
              onClick={() => onSelectTab('normal')}
              className={tabClass('normal')}
            >
              Normal Medical record
            </span>
            <span
              onClick={() => onSelectTab('mlTest')}
              className={tabClass('mlTest')}
            >
              AI Test
            </span>
          </div>
        </div>
        {tab === 'normal' && <CreateRecordForm patientData={patientData} />}
        {tab === 'mlTest' && <AiTestsForm patientData={patientData} />}
      </Container>
    </Layout>
  );
}
const SeoInfo = () => <Seo templateTitle='Create-medical-record' />;
export default protectedRoute(CreateMedicalRecordPage, {
  Seo: SeoInfo,
  requireDoctor: true,
});
