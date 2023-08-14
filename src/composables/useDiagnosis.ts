import { ref } from 'vue';
import type { 
  AxiosResponse,
  AxiosError,
} from 'axios';
import { 
  engineApiConfig,
  useSetAuthHeaders,
 } from '@/composables';
import { 
  ConditionsItemType,
  DiagnosisRequestType,
  DiagnosisResponseType,
  ExtrasType,
  QuestionType,
} from '@/composables/types';

export async function useDiagnosis (requestBody: DiagnosisRequestType) {
  const { engineApi } = useSetAuthHeaders(engineApiConfig);
  const URI = new URL(`${import.meta.env.VITE_API}/diagnosis`);
  const response = ref<AxiosResponse<DiagnosisResponseType> | null>(null);
  const error = ref<AxiosError | null>(null);
  const question = ref<QuestionType | undefined>(undefined);
  const conditions = ref<ConditionsItemType | undefined>(undefined);
  const extras = ref<ExtrasType | undefined>(undefined);
  const has_emergency_evidence = ref<boolean | undefined>(undefined);
  const should_stop = ref<boolean | undefined>(undefined);
  const interview_token = ref<string | undefined>(undefined);

  await engineApi.post(URI.toString(), requestBody)
    .then((res: AxiosResponse) => {
      response.value = res;
      question.value = res.data.question;
      conditions.value = res.data.conditions;
      extras.value = res.data.extras;
      has_emergency_evidence.value = res.data.has_emergency_evidence;
      should_stop.value = res.data.should_stop;
      interview_token.value = res.data.interview_token;

    })
    .catch((err: AxiosError) => error.value = err);

  return {
    response: response.value,
    question: question.value, 
    conditions: conditions.value,
    extras: extras.value,
    has_emergency_evidence: has_emergency_evidence.value,
    should_stop: should_stop.value,
    interview_token: interview_token.value,
    error: error.value,
  }
}
