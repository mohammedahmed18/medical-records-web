import React, { useState } from 'react';
import { useQuery } from 'react-query';

import { getAllDoctors, GetDoctorsParams } from '@/api/doctors';
import Spinner from '@/components/common/spinner';
import { GET_DOCTORS_KEY } from '@/constant/queryKeys';

import DoctorSearchCard from '../doctorSearchCard';

const DoctorsList = () => {
  const [searchParmas] = useState<GetDoctorsParams>({});

  const { isLoading, data: results } = useQuery({
    queryKey: [GET_DOCTORS_KEY],
    queryFn: () => getAllDoctors(searchParmas),
  });

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <div className='grid grid-cols-2 gap-5 p-4 md:grid-cols-4 lg:grid-cols-5'>
        {results?.map((doctor) => (
          <DoctorSearchCard key={doctor.id} doctor={doctor} />
        ))}
      </div>
    </>
  );
};

export default DoctorsList;
