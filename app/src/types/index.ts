import { STEPS, SUBMIT_STATUS } from "../constants";
export interface FormDetails {
  clubId: string;
  memberTypes: MemberType[];
  formId: string;
  title: string;
  registrationOpens: string;
}

export interface MemberType {
  id: string;
  name: string;
}

export type Steps = (typeof STEPS)[keyof typeof STEPS];

export interface FormSubmissionData {
  formId: string;
  memberTypeId: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  submittedAt: string;
}

export type SubmitStatus = (typeof SUBMIT_STATUS)[keyof typeof SUBMIT_STATUS];
