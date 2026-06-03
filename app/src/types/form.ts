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
