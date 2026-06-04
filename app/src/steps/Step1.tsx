import type { FormDetails } from "../types";
import { FormDescription } from "../constants";
import styles from "./Step1.module.css";

export function Step1({ formConfig }: { formConfig: FormDetails }) {
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
              onChange={() => console.log("Selected member type:", type.name)}
            />{" "}
            {type.name}
          </label>
        ))}
      </div>
    </div>
  );
}
