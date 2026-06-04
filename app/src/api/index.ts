import type { FormDetails, FormSubmissionData } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const submitForm = async (
  payload: FormSubmissionData,
): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/registrations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Failed to submit form: ${response.statusText}`);
  }
};

export const getFormDetails = async (): Promise<FormDetails> => {
  const response = await fetch(`${API_BASE_URL}/form-details`);
  if (!response.ok) {
    throw new Error(`Failed to fetch form details: ${response.statusText}`);
  }
  return response.json();
};
