import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useQuery } from 'react-query';

import Container from '@components/container';
import Layout from '@components/layout';
import Seo from '@components/Seo';

import { getDoctorProfile } from '@/api/doctors';
import protectedRoute from '@/components/common/protectedRoute';
import DoctorProfile from '@/components/doctors/doctorProfile';
import { DOCTORP_ROFILE } from '@/constant/queryKeys';

function DoctorProfilePage() {
  const { id } = useRouter().query;

  const {
    data: doctor,
    refetch,
    status,
  } = useQuery({
    queryKey: [DOCTORP_ROFILE, id],
    queryFn: () => getDoctorProfile(id?.toString()),
    enabled: false,
    retry: false,
  });

  useEffect(() => {
    if (id) refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const _isLoading = status === 'loading';

  //TODO: skeleton , make sure the user is doctor
  return (
    <Layout>
      <Container>
        {doctor && (
          <DoctorProfile user={doctor} doctorId={id?.toString() || ''} />
        )}
      </Container>
    </Layout>
  );
}
const SeoInfo = () => {
  // TODO: get the doctor as the title
  return <Seo templateTitle='doctor profile' />;
};
export default protectedRoute(DoctorProfilePage, {
  Seo: SeoInfo,
});
