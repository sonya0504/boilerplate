import type {
  AxiosResponse,
  AxiosError,
} from 'axios';
import {
  engineApiConfig,
  useSetAuthHeaders,
  type RiskFactorDetailsType,
  type RiskFactorsByIdParams,
} from '@/services';

export async function useRiskFactorsById(params: RiskFactorsByIdParams) {
  const {
    riskFactorsId,
    age,
    enableTriage3,
  } = params;

  const { engineApi } = useSetAuthHeaders(engineApiConfig);

  let response: AxiosResponse<RiskFactorDetailsType> | null = null;
  let error: AxiosError | null = null;
  let id: RiskFactorDetailsType['id'] | null = null;
  let name: RiskFactorDetailsType['name'] | null = null;
  let commonName: RiskFactorDetailsType['commonName'] | undefined;
  let question: RiskFactorDetailsType['question'] | null = null;
  let questionThirdPerson: RiskFactorDetailsType['questionThirdPerson'] | undefined;
  let sexFilter: RiskFactorDetailsType['sexFilter'] | null = null;
  let category: RiskFactorDetailsType['category'] | undefined;
  let extras: RiskFactorDetailsType['extras'] | undefined;
  let imageUrl: RiskFactorDetailsType['imageUrl'] | undefined;
  let imageSource: RiskFactorDetailsType['imageSource'] | undefined;
  let seriousness: RiskFactorDetailsType['seriousness'] | undefined;

  await engineApi.get(`/risk_factors/${riskFactorsId}`, {
    params: {
      'age.value': age.value,
      'age.unit': age.unit,
      enable_triage_3: enableTriage3,
    },
  })
    .then((res: AxiosResponse<RiskFactorDetailsType>) => {
      response = res;
      id = res.data.id;
      name = res.data.name;
      commonName = res.data.commonName;
      question = res.data.question;
      questionThirdPerson = res.data.questionThirdPerson;
      sexFilter = res.data.sexFilter;
      category = res.data.category;
      extras = res.data.extras;
      imageUrl = res.data.imageUrl;
      imageSource = res.data.imageSource;
      seriousness = res.data.seriousness;
    })
    .catch((err: AxiosError) => {
      error = err;
    });

  return {
    response,
    id,
    name,
    commonName,
    question,
    questionThirdPerson,
    sexFilter,
    category,
    extras,
    imageUrl,
    imageSource,
    seriousness,
    error,
  };
}