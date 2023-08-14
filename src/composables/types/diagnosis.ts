import { 
  AgeRequestType,
  ExtrasType,
  EvidenceType,
} from '@/composables/types';

export type ConditionsItemType = {
  id: string,
  name: string,
  name_common: string,
  probability: number,
}

export type ChoicePresentType = {
  id: 'present',
  label: 'Yes',
}

export type ChoiceAbsentType = {
  id: 'absent',
  label: 'No',
}

export type ChoiceUnknownType = {
  id: 'unknown',
  label: 'Don\'t know',
}

export type QuestionItemsType = {
  id: string,
  name: string,
  choices: ChoicePresentType[] | ChoiceAbsentType[] | ChoiceUnknownType[],
}

export type QuestionType = {
  type: 'single' | 'group_single' | 'group_multiple',
  text: string,
  items: QuestionItemsType[],
  extras?: ExtrasType,
}

export type DiagnosisRequestBodyType = {
  sex: 'male' | 'female',
  age: AgeRequestType,
  evidence?: EvidenceType[],
  evaluated_at?: string,
  extras?: ExtrasType,
}

export type DiagnosisResponseType = {
  question?: QuestionType,
  conditions?: ConditionsItemType[],
  extras?: ExtrasType,
  has_emergency_evidence?: boolean,
  should_stop?: boolean,
  interview_token?: string
}