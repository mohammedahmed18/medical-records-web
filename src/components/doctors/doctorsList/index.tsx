import React, { useState } from 'react';
import { useQuery } from 'react-query';

import { getAllDoctors, GetDoctorsParams } from '@/api/doctors';
import DoctorsSkeleton from '@/components/skeletons/doctors.skeleton';
import { GET_DOCTORS_KEY } from '@/constant/queryKeys';

import DoctorSearchCard from '../doctorSearchCard';

const DoctorsList = () => {
  const [searchParmas] = useState<GetDoctorsParams>({});

  const { isLoading, data: results } = useQuery({
    queryKey: [GET_DOCTORS_KEY, JSON.stringify(searchParmas)],
    queryFn: () => getAllDoctors(searchParmas),
  });

  if (isLoading) return <DoctorsSkeleton />;
  return (
    <>
      <div className='grid grid-cols-1 gap-5 p-4 md:grid-cols-3 lg:grid-cols-4'>
        {results?.map((doctor) => (
          <DoctorSearchCard key={doctor.id} doctor={doctor} />
        ))}
      </div>
    </>
  );
};

export default DoctorsList;
