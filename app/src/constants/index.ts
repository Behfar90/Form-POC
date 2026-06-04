export const STEPS = {
  FORM_DETAILS: 1,
  USER_INFO: 2,
  PREVIEW: 3,
} as const;

export const SUBMIT_STATUS = {
  IDLE: "idle",
  SUCCESS: "success",
  ERROR: "error",
} as const;

export const FormDescription =
  "This is a sample static form description here... This can be replaced with actual form description fetched from the API.";
