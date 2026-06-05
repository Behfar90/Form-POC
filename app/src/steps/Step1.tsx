import type { FormDetails, UserFormEntries } from "../types";
import { FormDescription } from "../constants";
import styles from "./Step1.module.css";

export function Step1({
  formConfig,
  updateFormHandler,
  membershipId,
}: {
  formConfig: FormDetails;
  updateFormHandler: (data: Partial<UserFormEntries>) => void;
  membershipId?: UserFormEntries["memberTypeId"];
}) {
  return (
    <div className={styles.formGrid}>
      <p>{FormDescription}</p>

      <div>
        <p className={styles.memberTypesLabel}>Choose your membership type:</p>
        <div className={styles.memberTypes}>
          {formConfig.memberTypes.map((type) => (
            <label key={type.id}>
              <input
                type="radio"
                name="memberType"
                onChange={() => updateFormHandler({ memberTypeId: type.id })}
                checked={type.id === membershipId}
                required
              />{" "}
              {type.name}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
