import { api } from './axios';

export type ModelAttributeInputType = 'text' | 'number' | 'select';

export type ModelAttribute = {
  label: string;
  comment?: string;
  selectOptions?: { label: string; value: string | number }[];
  type: ModelAttributeInputType;
  min?: number;
  max?: number;
};

export type MlModel = {
  name: string;
  modelKey: string;
  modelPath: string;
  attributes: ModelAttribute[];
};
export type createAiTestParams = {
  inputData: Record<string, string>;
  modelKey: string;
  userId: string;
};

export const getAllModels = async () => {
  return api.get<MlModel[]>('/ml/models').then((res) => res.data);
};

export const saveAiTest = async (input: createAiTestParams) => {
  return api.post('/ml/test', input).then((res) => res.data);
};
