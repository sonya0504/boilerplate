import type { 
  AxiosResponse,
  AxiosError,
} from 'axios';
import { 
  engineApiConfig,
  useSetAuthHeaders,
} from '@/composables';
import type { 
  SymptomType,
  SymptomsParamsType,
 } from './types';

export async function useSymptoms ( params: SymptomsParamsType ) {

  const {
    age,
    enableTriage3
  } = params;

  const { engineApi } = useSetAuthHeaders(engineApiConfig)

  let response: AxiosResponse | null = null;
  let error: AxiosError | null = null;
  let symptoms: SymptomType[] = [];

  await engineApi.get('/symptoms', {
    params: {
      'age.value': age.value,
      'age.unit': age.unit,
      enable_triage_3: enableTriage3,
    },
  })
    .then((res: AxiosResponse) => {
      response = res;
      symptoms = res.data;
    })
    .catch((err: AxiosError) => error = err);
  
  return {
    response,
    symptoms,
    error,
  }
}
