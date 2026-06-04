import { useState } from "react";
import type { FormDetails, Steps, FormSubmissionData } from "./types";
import styles from "./App.module.css";
import mockData from "../mockData.json";
import { Loader } from "lucide-react";
import { STEPS } from "./constants";
import { clsx } from "clsx";
import { Step1, Step2, Step3 } from "./steps";
import { convertToLocaleDate } from "./utils";

export default function App() {
  const [formConfig] = useState<FormDetails>(mockData as FormDetails);
  const [currentStep, setCurrentStep] = useState<Steps>(STEPS.FORM_DETAILS);
  const [formSubmissionData, setFormSubmissionData] = useState<
    Partial<FormSubmissionData>
  >({ formId: formConfig.formId });

  const updateFormData = (data: Partial<FormSubmissionData>) => {
    setFormSubmissionData((prev) => ({ ...prev, ...data }));
  };

  const handleSubmit = () => {
    if (currentStep === STEPS.PREVIEW) {
      if (!isFormComplete(formSubmissionData)) return;
      const payload = {
        ...formSubmissionData,
        submittedAt: new Date().toISOString(),
      };
      console.log("Submitting form with data:", payload);
    } else {
      setCurrentStep((prev) =>
        prev < STEPS.PREVIEW ? ((prev + 1) as Steps) : prev,
      );
    }
  };

  const isFormComplete = (
    data: Partial<FormSubmissionData>,
  ): data is FormSubmissionData =>
    !!(
      data.formId &&
      data.memberTypeId &&
      data.name &&
      data.email &&
      data.phone &&
      data.birthDate
    );

  if (!formConfig)
    return (
      <div>
        Loading... <Loader />
      </div>
    );

  if (new Date(formConfig.registrationOpens) > new Date()) {
    return (
      <div className={styles.card}>
        <h2>Registration Not Open</h2>
        <p>Opens on {convertToLocaleDate(formConfig.registrationOpens)}</p>
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
              membershipId={formSubmissionData?.memberTypeId}
            />
          )}

          {currentStep === STEPS.USER_INFO && (
            <Step2
              formData={formSubmissionData}
              updateFormHandler={updateFormData}
            />
          )}

          {currentStep === STEPS.PREVIEW && (
            <Step3
              formData={formSubmissionData}
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
