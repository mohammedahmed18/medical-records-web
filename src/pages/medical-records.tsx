import { useQuery } from 'react-query';

import protectedRoute from '@/components/common/protectedRoute';
import Layout from '@/components/layout/Layout';
import MedicalRecordsList from '@/components/medicalRecordsList';
import Seo from '@/components/Seo';
import MedicalRecordsSkeleton from '@/components/skeletons/medicalRecords.skeleton';
import MedicalRecordsPageSkeleton from '@/components/skeletons/medicalRecordsPage.skeleton';

import { getMedicalRecords } from '@/api/medicalRecords';
import { MEDICAL_RECORDS_KEY } from '@/constant/queryKeys';

function MedicalRecordsPage() {
  const { data: recordsData, isLoading } = useQuery({
    queryKey: [MEDICAL_RECORDS_KEY],
    queryFn: () => getMedicalRecords({}),
  });

  return (
    <Layout>
      <Seo templateTitle='Medical Records' />
      <main>
        {isLoading && <MedicalRecordsSkeleton />}
        {recordsData && <MedicalRecordsList records={recordsData} />}
      </main>
    </Layout>
  );
}

export default protectedRoute(MedicalRecordsPage, MedicalRecordsPageSkeleton);
