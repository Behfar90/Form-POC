import type { UserFormEntries } from "../types";
import { convertDateToISO } from "../utils";
import styles from "./Step2.module.css";

export function Step2({
  formData,
  updateFormHandler,
}: {
  formData: Partial<UserFormEntries> | null;
  updateFormHandler: (data: Partial<UserFormEntries>) => void;
}) {
  const minBirthDate = new Date();
  minBirthDate.setFullYear(minBirthDate.getFullYear() - 150);
  const minBirthDateStr = minBirthDate.toISOString().split("T")[0];

  return (
    <div className={styles.formGrid}>
      <div className={styles.field}>
        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          type="text"
          required
          pattern="[A-Za-z]+ [A-Za-z]+"
          className={styles.input}
          value={formData?.name ?? ""}
          onChange={(e) =>
            updateFormHandler({
              name: e.target.value.replace(/[^A-Za-z ]/g, ""),
            })
          }
        />
        <span className={styles.hint}>First and last name e.g. John Doe</span>
      </div>

      <div className={styles.field}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          required
          pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
          className={styles.input}
          value={formData?.email ?? ""}
          onChange={(e) => updateFormHandler({ email: e.target.value })}
        />
        <span className={styles.hint}>e.g. name@domain.com</span>
      </div>

      <div className={styles.field}>
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          type="tel"
          required
          inputMode="numeric"
          pattern="\+?[0-9]+"
          className={styles.input}
          value={formData?.phone ?? ""}
          onChange={(e) =>
            updateFormHandler({ phone: e.target.value.replace(/[^+0-9]/g, "") })
          }
        />
        <span className={styles.hint}>Numbers only, optional leading +</span>
      </div>

      <div className={styles.field}>
        <label htmlFor="birthDate">Date of Birth</label>
        <input
          id="birthDate"
          type="date"
          required
          min={minBirthDateStr}
          max={new Date().toISOString().split("T")[0]}
          className={styles.input}
          value={formData?.birthDate?.split("T")[0] ?? ""}
          onChange={(e) =>
            updateFormHandler({ birthDate: convertDateToISO(e.target.value) })
          }
        />
      </div>
    </div>
  );
}
