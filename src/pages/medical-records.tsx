import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useIsFetching, useQuery } from 'react-query';

import protectedRoute from '@/components/common/protectedRoute';
import Container from '@/components/container';
import Layout from '@/components/layout/Layout';
import MedicalRecordsList from '@/components/medicalRecordsList';
import Seo from '@/components/Seo';
import MedicalRecordsSkeleton from '@/components/skeletons/medicalRecords.skeleton';
import MedicalRecordsPageSkeleton from '@/components/skeletons/medicalRecordsPage.skeleton';

import { getMedicalRecords } from '@/api/medicalRecords';
import { MEDICAL_RECORDS_KEY } from '@/constant/queryKeys';

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
      className={clsx(
        'cursor-pointer rounded-lg p-4 text-2xl transition-colors duration-300',
        active ? 'bg-indigo-700 text-white' : 'hover:bg-gray-100'
      )}
    >
      {value}
    </span>
  );
};
function MedicalRecordsPage() {
  const [actionType, setActionType] = useState('');
  const {
    data: recordsData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [MEDICAL_RECORDS_KEY, actionType],
    queryFn: () =>
      getMedicalRecords({
        actionType: actionType !== '' ? actionType : undefined,
      }),
    enabled: false,
    staleTime: Infinity,
  });

  useEffect(() => {
    refetch();
  }, [actionType, refetch]);
  const isFetching = useIsFetching([MEDICAL_RECORDS_KEY, actionType]);
  const finalLoading = isFetching || isLoading;

  const NoRecords = (
    <span className='block text-center text-5xl capitalize text-gray-400'>
      No records to show
    </span>
  );
  return (
    <Layout>
      <Seo templateTitle='Medical Records' />
      <main>
        <Container className='my-7'>
          <div className='flex flex-col gap-3 md:flex-row'>
            <div className='flex flex-col gap-7 p-3 shadow-md md:w-1/4'>
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
              {finalLoading && <MedicalRecordsSkeleton />}
              {recordsData && <MedicalRecordsList records={recordsData} />}
              {recordsData?.length == 0 && !finalLoading && NoRecords}
            </div>
          </div>
        </Container>
      </main>
    </Layout>
  );
}

export default protectedRoute(MedicalRecordsPage, MedicalRecordsPageSkeleton);
