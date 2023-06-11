import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { useMyRecords } from '@/hooks/useMyRecords';

import { ProtectedRoute } from '@components/common/protectedRoute';
import Container from '@components/container';
import Layout from '@components/layout';
import MedicalRecordsList from '@components/medicalRecordsList';
import Seo from '@components/Seo';
import MedicalRecordsSkeleton from '@components/skeletons/medicalRecords.skeleton';
import MedicalRecordsPageSkeleton from '@components/skeletons/medicalRecordsPage.skeleton';

import { MedicalRecordsActionTypes } from '@/types/medicalRecords';

const FilterItem = ({
  value,
  active,
  setType,
}: {
  value: string;
  active: boolean;
  setType: () => void;
}) => {
  return (
    <span
      onClick={setType}
      className={twMerge(
        'cursor-pointer rounded-lg p-4 text-2xl transition-colors duration-300 ease-in-out',
        active
          ? 'bg-primary-300 text-white'
          : 'bg-transparent hover:bg-gray-100'
      )}
    >
      {value}
    </span>
  );
};

const NoRecords = (
  <span className='block text-center text-5xl capitalize text-gray-400'>
    No records to show
  </span>
);

function MedicalRecordsPage() {
  const [actionType, setActionType] = useState('');
  const { recordsData, isLoading } = useMyRecords({ actionType });

  return (
    <Layout>
      <Seo templateTitle='Medical Records' />

      <main>
        <ProtectedRoute Skeleton={MedicalRecordsPageSkeleton}>
          <Container className='my-7'>
            <div className='flex flex-col gap-3 md:flex-row'>
              <div className='flex h-fit flex-col gap-7 p-3 shadow-md md:w-1/4'>
                <FilterItem
                  setType={() => setActionType('')}
                  active={actionType === ''}
                  value='All'
                />
                {Object.keys(MedicalRecordsActionTypes).map((type) => (
                  <FilterItem
                    setType={() => setActionType(type)}
                    active={actionType === type}
                    value={type}
                    key={type}
                  />
                ))}
              </div>
              <div className='flex-1'>
                {isLoading && <MedicalRecordsSkeleton />}
                {recordsData && <MedicalRecordsList records={recordsData} />}
                {recordsData?.length == 0 && !isLoading && NoRecords}
              </div>
            </div>
          </Container>
        </ProtectedRoute>
      </main>
    </Layout>
  );
}

export default MedicalRecordsPage;
