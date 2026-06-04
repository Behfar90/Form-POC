package models

type FormDetails struct {
	ClubID string `json:"clubId"`
	FormID	string `json:"formId"`
	Title  string `json:"title"`
	RegistrationOpens string `json:"registrationOpens"`
	MemberTypes []MemberType `json:"memberTypes"`
}

type MemberType struct {
	ID string `json:"id"`
	Name string `json:"name"`
}

type Registration struct {
	FormID string `json:"formId"`
	MemberTypeID string `json:"memberTypeId"`
	Name   string `json:"name"`
	Email  string `json:"email"`
	Phone  string `json:"phone"`
	BirthDate string `json:"birthDate"`
	SubmittedAt string `json:"submittedAt"`
}