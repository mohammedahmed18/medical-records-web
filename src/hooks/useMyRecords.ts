import { useEffect } from 'react';
import { useQuery } from 'react-query';

import { getMedicalRecords } from '@/api/medicalRecords';
import { MEDICAL_RECORDS_KEY } from '@/constant/queryKeys';
import { useAuth } from '@/contexts/authContext';

export const useMyRecords = (
  searchParams: Record<string, string>,
  stop = false
) => {
  const {
    user: { isAnonymous },
  } = useAuth();
  const {
    data: recordsData,
    status,
    refetch,
  } = useQuery({
    queryKey: [MEDICAL_RECORDS_KEY, { ...searchParams }],
    queryFn: ({ queryKey }) =>
      getMedicalRecords({
        actionType:
          queryKey[1] &&
          typeof queryKey[1] === 'object' &&
          queryKey[1].actionType !== ''
            ? queryKey[1].actionType
            : undefined,
      }),
    enabled: false,
  });

  useEffect(() => {
    if (!stop) return; // stop is to prevent the api call from being sent , because sometines we need to call the api when some state changes
    if (!isAnonymous) refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isAnonymous,
    stop,
    searchParams.actionType,
    searchParams.take,
    searchParams.skip,
  ]);

  return { isLoading: status === 'loading', recordsData: recordsData || [] };
};
