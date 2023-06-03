import React, { useState } from 'react';
import { useQuery } from 'react-query';

import { getAllDoctors, GetDoctorsParams } from '@/api/doctors';
import DoctorsFilters from '@/components/doctors/doctorsFilters';
import DoctorsSkeleton from '@/components/skeletons/doctors.skeleton';
import { GET_DOCTORS_KEY } from '@/constant/queryKeys';

import DoctorSearchCard from '../doctorSearchCard';

const DoctorsList = () => {
  const [searchParmas, setSearchParams] = useState<GetDoctorsParams>({});

  const { isLoading, data: results } = useQuery({
    queryKey: [GET_DOCTORS_KEY, JSON.stringify(searchParmas)],
    queryFn: () => getAllDoctors(searchParmas),
  });

  return (
    <div className='flex flex-col gap-3 md:flex-row'>
      <div className='w-full md:w-1/4'>
        <DoctorsFilters
          setSearchParams={(values: GetDoctorsParams) =>
            setSearchParams((prev) => ({ ...prev, ...values }))
          }
          clearFilters={() => setSearchParams({})}
        />
      </div>
      {isLoading ? (
        <DoctorsSkeleton />
      ) : (
        <div className='grid h-fit w-full grid-cols-1 gap-5 p-4 md:grid-cols-2 lg:grid-cols-3'>
          {results?.map((doctor) => (
            <DoctorSearchCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorsList;
