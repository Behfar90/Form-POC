import type { FormDetails, FormSubmissionData } from "../types";
import { FormDescription } from "../constants";
import styles from "./Step1.module.css";

export function Step1({
  formConfig,
  updateFormHandler,
}: {
  formConfig: FormDetails;
  updateFormHandler: (data: Partial<FormSubmissionData>) => void;
}) {
  return (
    <div className={styles.formGrid}>
      <p>{FormDescription}</p>

      <div className={styles.memberTypes}>
        {formConfig.memberTypes.map((type) => (
          <label key={type.id}>
            <input
              type="radio"
              name="memberType"
              required
              onChange={() => updateFormHandler({ memberTypeId: type.id })}
            />{" "}
            {type.name}
          </label>
        ))}
      </div>
    </div>
  );
}
