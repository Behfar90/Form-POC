import { useState } from "react";
import type { FormDetails, Steps } from "./types";
import styles from "./App.module.css";
import mockData from "../mockData.json";
import { Loader } from "lucide-react";
import { STEPS } from "./constants";
import { clsx } from "clsx";
import { Step1 } from "./steps";

export default function App() {
  const [formConfig] = useState<FormDetails>(mockData as FormDetails);
  const [currentStep, setCurrentStep] = useState<Steps>(STEPS.FORM_DETAILS);

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
        <p>
          Opens on {new Date(formConfig.registrationOpens).toLocaleDateString()}
        </p>
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
        onSubmit={() => console.log("Submit form data")}
      >
        {currentStep === STEPS.FORM_DETAILS && (
          <Step1 formConfig={formConfig} />
        )}

        {currentStep === STEPS.USER_INFO && <div>Step 2</div>}

        {currentStep === STEPS.PREVIEW && <div>Step 3</div>}

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
          <button type="button" className={styles.button}>
            {currentStep === STEPS.PREVIEW ? "Submit" : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
}
