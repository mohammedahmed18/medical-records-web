import { useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';

import { getAllModels, MlModel, saveAiTest } from '@/api/ml';
import Button from '@/components/buttons/Button';
import BetaLabel from '@/components/common/beta';
import Modal from '@/components/common/modal';
import Spinner from '@/components/common/spinner';
import ModelAttributesForm from '@/components/doctors/modelAttributes';
import { GET_ML_MODELS } from '@/constant/queryKeys';
import { showToast } from '@/utils/toast';

import { PatientQrInfo } from '@/types/user';

import CheckIcon from '~/svg/check-mark-circle-icon.svg';

type Props = {
  patientData?: PatientQrInfo;
};
const AiTestsForm = ({ patientData }: Props) => {
  const [showModelsModal, setShowModelsModal] = useState(true);
  const [selectedModel, setSelectedModel] = useState<MlModel>();
  const { data: models, isLoading } = useQuery(GET_ML_MODELS, {
    queryFn: getAllModels,
  });

  const { mutate } = useMutation({
    mutationFn: saveAiTest,
  });

  const handleCloseModal = () => setShowModelsModal(false);

  const onSubmitTest = (data: FieldValues) => {
    if (!patientData) return showToast('you must scan the qr code', 'error');
    if (!selectedModel) return;

    mutate({
      userId: patientData.id,
      inputData: data,
      modelKey: selectedModel.modelKey,
    });
  };

  return (
    <div className='flex flex-col gap-4'>
      <div className='mb-10 w-fit'>
        <Button
          variant='light'
          size='lg'
          onClick={() => setShowModelsModal(true)}
        >
          Select AI Test
        </Button>
      </div>
      {/* //////////////////////// */}
      {/* Select Ml model modal */}
      {/* //////////////////////// */}

      <Modal shown={showModelsModal} onClose={handleCloseModal}>
        {isLoading && (
          <div className='center-content'>
            <Spinner />
          </div>
        )}
        {models && (
          <>
            <div className='mb-10 w-fit'>
              <BetaLabel theme='dark' />
            </div>
            <div className='grid h-[400px] grid-cols-1 overflow-y-auto md:grid-cols-2 lg:grid-cols-3'>
              {models.map((model) => (
                <div
                  key={model.modelKey}
                  className='relative h-fit cursor-pointer rounded-2xl border-2 px-7 py-4 text-2xl shadow-sm transition-all duration-300 hover:shadow-md'
                  onClick={() => {
                    setSelectedModel(model);
                  }}
                >
                  {model.name}
                  {model.modelKey === selectedModel?.modelKey && (
                    <CheckIcon className='absolute right-0 top-1/2 h-8 w-8 translate-y-1/2 fill-success' />
                  )}
                </div>
              ))}
            </div>

            <Button
              variant='light'
              size='lg'
              className='float-right'
              onClick={handleCloseModal}
            >
              Okay
            </Button>
          </>
        )}
      </Modal>

      {/* //////////////////////// */}
      {/* Ml model attributes form  */}
      {/* //////////////////////// */}
      {selectedModel && (
        <div className='mt-8 rounded-lg border-2 py-10 px-5 shadow-lg'>
          <h2 className='text-4xl '>{selectedModel.name}</h2>
          <div className='divider'></div>

          <ModelAttributesForm
            attributes={selectedModel.attributes}
            onSubmit={onSubmitTest}
          />
        </div>
      )}
    </div>
  );
};

export default AiTestsForm;
