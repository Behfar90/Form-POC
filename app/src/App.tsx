import { useEffect, useState } from "react";
import type {
  FormDetails,
  Steps,
  FormSubmissionData,
  UserFormEntries,
  SubmitStatus,
} from "./types";
import styles from "./App.module.css";
import { STEPS, SUBMIT_STATUS } from "./constants";
import { clsx } from "clsx";
import { Step1, Step2, Step3 } from "./steps";
import { convertToLocaleDate } from "./utils";
import { getFormDetails, submitForm } from "./api";
import { Banner } from "./components/Banner";

export default function App() {
  const [formConfig, setFormConfig] = useState<FormDetails | null>(null);
  const [currentStep, setCurrentStep] = useState<Steps>(STEPS.FORM_DETAILS);
  const [formEntries, setFormEntries] =
    useState<Partial<UserFormEntries> | null>(null);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(
    SUBMIT_STATUS.IDLE,
  );
  const [fetchError, setFetchError] = useState(false);

  const updateFormData = (data: Partial<UserFormEntries>) => {
    setFormEntries((prev) => ({ ...prev, ...data }));
  };

  useEffect(() => {
    getFormDetails()
      .then((data) => setFormConfig(data))
      .catch((err) => {
        console.error("Failed to fetch form details:", err);
        setFetchError(true);
      });
  }, []);

  const handleSubmit = () => {
    if (currentStep === STEPS.PREVIEW) {
      if (!isFormComplete(formEntries) || !formConfig) return;
      const payload: FormSubmissionData = {
        ...formEntries,
        formId: formConfig.formId,
        submittedAt: new Date().toISOString(),
      };
      submitForm(payload)
        .then(() => setSubmitStatus(SUBMIT_STATUS.SUCCESS))
        .catch((err) => {
          console.error(err);
          setSubmitStatus(SUBMIT_STATUS.ERROR);
        });
    } else {
      setCurrentStep((prev) =>
        prev < STEPS.PREVIEW ? ((prev + 1) as Steps) : prev,
      );
    }
  };

  const isFormComplete = (
    data: Partial<UserFormEntries> | null,
  ): data is UserFormEntries =>
    !!(
      data &&
      data.memberTypeId &&
      data.name &&
      data.email &&
      data.phone &&
      data.birthDate
    );

  if (fetchError)
    return (
      <div className={styles.card}>
        <Banner
          variant="error"
          title="Failed to load form"
          message="Could not reach the server. Please try again later."
        />
      </div>
    );

  if (!formConfig)
    return (
      <div className={styles.card}>
        <Banner variant="loading" title="Loading..." message="" />
      </div>
    );

  if (submitStatus === SUBMIT_STATUS.SUCCESS) {
    return (
      <div className={styles.card}>
        <Banner
          variant="success"
          title="You're registered!"
          message={`Your registration for ${formConfig.title} has been received.`}
        />
      </div>
    );
  }

  if (submitStatus === SUBMIT_STATUS.ERROR) {
    return (
      <div className={styles.card}>
        <Banner
          variant="error"
          title="Submission Failed"
          message="There was an error submitting your registration. Please try again later."
        />
      </div>
    );
  }

  if (new Date(formConfig.registrationOpens) > new Date()) {
    return (
      <div className={styles.card}>
        <Banner
          variant="info"
          title="Registration Not Open"
          message={`Opens on ${convertToLocaleDate(formConfig.registrationOpens)}`}
        />
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <h2>{formConfig.title}</h2>

      <div className={styles.stepIndicator}>
        {Object.values(STEPS).map((step) => (
          <div
            key={step}
            className={clsx(
              styles.stepCircle,
              currentStep >= step && styles.activeStep,
            )}
          >
            {step}
          </div>
        ))}
      </div>

      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className={styles.stepContent}>
          {currentStep === STEPS.FORM_DETAILS && (
            <Step1
              formConfig={formConfig}
              updateFormHandler={updateFormData}
              membershipId={formEntries?.memberTypeId}
            />
          )}

          {currentStep === STEPS.USER_INFO && (
            <Step2
              formData={formEntries}
              updateFormHandler={updateFormData}
            />
          )}

          {currentStep === STEPS.PREVIEW && (
            <Step3
              formData={formEntries}
              memberTypes={formConfig.memberTypes}
            />
          )}
        </div>

        <div className={styles.buttonContainer}>
          <button
            type="button"
            className={styles.button}
            disabled={currentStep === STEPS.FORM_DETAILS}
            onClick={() =>
              setCurrentStep((prev) =>
                prev > STEPS.FORM_DETAILS ? ((prev - 1) as Steps) : prev,
              )
            }
          >
            Back
          </button>
          <button type="submit" className={styles.button}>
            {currentStep === STEPS.PREVIEW ? "Submit" : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
}
