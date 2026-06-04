import type { FormSubmissionData, MemberType } from "../types";
import { convertToLocaleDate, getMemberTypeName } from "../utils";
import styles from "./Step3.module.css";

export function Step3({
  formData,
  memberTypes,
}: {
  formData: Partial<FormSubmissionData>;
  memberTypes: MemberType[];
}) {
  return (
    <div className={styles.previewContainer}>
      <p className={styles.previewHeader}>Review your details</p>

      <div className={styles.row}>
        <span className={styles.label}>Membership type</span>
        <span className={styles.value}>
          {formData.memberTypeId
            ? getMemberTypeName(formData.memberTypeId, memberTypes)
            : ""}
        </span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Name</span>
        <span className={styles.value}>{formData.name}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Email</span>
        <span className={styles.value}>{formData.email}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Phone</span>
        <span className={styles.value}>{formData.phone}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Date of Birth</span>
        <span className={styles.value}>
          {formData.birthDate ? convertToLocaleDate(formData.birthDate) : ""}
        </span>
      </div>
    </div>
  );
}
