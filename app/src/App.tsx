import { useState } from "react";
import type { FormDetails } from "./types/form";
import styles from "./App.module.css";
import mockData from "../mockData.json";
import { Loader } from "lucide-react";

export default function App() {
  const [formConfig] = useState<FormDetails>(mockData as FormDetails);
  const [currentStep, setCurrentStep] = useState(1);

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

      <form
        className={styles.form}
        onSubmit={() => console.log("Submit form data")}
      >
        {currentStep === 1 && <div>Step 1</div>}

        {currentStep === 2 && <div>Step 2</div>}

        {currentStep === 3 && <div>Step 3</div>}

        <div className={styles.buttonContainer}>
          <button
            type="button"
            className={styles.button}
            disabled={currentStep === 1}
            onClick={() => setCurrentStep((prev) => prev - 1)}
          >
            Back
          </button>
          <button type="submit" className={styles.button}>
            {currentStep === 3 ? "Submit" : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
}
