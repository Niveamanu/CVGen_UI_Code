import React, { useEffect } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import styles from "./CVForms.module.scss";
import { IBaseFormProps } from "./types";

export default function ClinicalResearchTrialsForm({
  defaultValues,
  onSubmit,
  isNextClick,
  setIsNextClick,
  onChange
}: IBaseFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
  } = useForm({
    defaultValues: {
      trials: defaultValues("Clinical Research Trials Conducted").length > 0 ? defaultValues("Clinical Research Trials Conducted") : [
        {
          "Trial Title": "",
          "Trial ID / Registration Number": "",
          "Institution / Organization": "",
          "Role / Position": "",
          "Start Date": "",
          "End Date": "",
          "Brief Description / Outcome": "",
        },
      ],
    },
    mode: "onChange",
  });


  // Helper to generate the error path for a given field (dot notation)
  const getErrorPath = (index: number, key: string) => `trials.${index}.${key}`;

  useEffect(() => {
    if (isNextClick && errors && Object.keys(errors).length > 0) {
      const findFirstErrorName = (errObj: any, prefix = ""): string | null => {
        for (const key in errObj) {
          if (
            typeof errObj[key] === "object" &&
            errObj[key] !== null &&
            (errObj[key].type === undefined || errObj[key].type === null)
          ) {
            const nested = findFirstErrorName(errObj[key], prefix ? `${prefix}.${key}` : key);
            if (nested) return nested;
          } else if (errObj[key]) {
            return prefix ? `${prefix}.${key}` : key;
          }
        }
        return null;
      };
      const firstErrorName = findFirstErrorName(errors);
      if (firstErrorName) {
        // Try to find the div with the matching data-error-path attribute (dot notation)
        const el = document.querySelector(`[data-error-path='${firstErrorName}']`);
        if (el && typeof (el as HTMLElement).scrollIntoView === 'function') {
          (el as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }
  }, [errors, isNextClick]);
  const watchedValues = useWatch({ control });
  useEffect(() => {
    if (onChange) onChange(watchedValues.trials, "Clinical Research Trials Conducted");
  }, [watchedValues]);
  useEffect(() => {
    const formContent = document.getElementById("cv-form-content");
    if (formContent) {
      formContent.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);
  useEffect(() => {
    if (isNextClick) {
      console.log("ClinicalResearchTrialsForm - Next button clicked, triggering validation...");
      
      // Trigger validation for all fields before submitting
      trigger().then((isValid) => {
        console.log("ClinicalResearchTrialsForm - Validation result:", isValid);
        if (isValid) {
          console.log("ClinicalResearchTrialsForm - Form is valid, submitting...");
          // Get current form values using watch
          const currentValues = watch();
          console.log("ClinicalResearchTrialsForm - Current form values:", currentValues);
          onSubmit(currentValues.trials, "Clinical Research Trials Conducted");
        } else {
          console.log("ClinicalResearchTrialsForm - Form validation failed, errors:", errors);
        }
      }).catch((error) => {
        console.error("ClinicalResearchTrialsForm - Validation error:", error);
      });
      
      // Always reset the flag to prevent infinite loops
      setIsNextClick(false);
    }
  }, [isNextClick, trigger, errors, watch, onSubmit, setIsNextClick]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "trials",
  });

  const addTrial = () => {
    append({
      "Trial Title": "",
      "Trial ID / Registration Number": "",
      "Institution / Organization": "",
      "Role / Position": "",
      "Start Date": "",
      "End Date": "",
      "Brief Description / Outcome": "",
    });
  };

  return (
    <div className={styles.formSection}>
      <h2 className={styles.sectionTitle}>Clinical Research Trials Conducted</h2>
      
      <form>
        {fields.map((field, index) => {
          // Find the first error key for this trial (if any)
          let errorKey = null;
          if ((errors.trials as any)?.[index]) {
            errorKey = Object.keys((errors.trials as any)[index])[0];
          }
          // Generate the error path for this div if there is an error (dot notation)
          const errorPath = errorKey ? `trials.${index}.${errorKey}` : undefined;
          return (
            <div
              key={field.id}
              className={styles.affiliationCard}
              {...(errorPath ? { 'data-error-path': errorPath } : {})}
            >
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>Trial Title <span className={styles.required}>*</span></label>
                  <input
                    type="text"
                    placeholder="Enter text"
                    {...register(`trials.${index}["Trial Title"]`, {
                      required: "Trial title is required",
                    })}
                    className={
                      (errors.trials as any)?.[index]?.["Trial Title"] ? styles.error : ""
                    }
                  />
                  {(errors.trials as any)?.[index]?.["Trial Title"] && (
                    <span className={styles.errorText}>
                      {String((errors.trials as any)[index]["Trial Title"]?.message)}
                    </span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label>Trial ID / Registration Number <span className={styles.required}>*</span></label>
                  <input
                    type="text"
                    placeholder="Enter text"
                    {...register(`trials.${index}["Trial ID / Registration Number"]`, {
                      required: "Trial ID is required",
                    })}
                    className={
                      (errors.trials as any)?.[index]?.["Trial ID / Registration Number"] ? styles.error : ""
                    }
                  />
                  {(errors.trials as any)?.[index]?.["Trial ID / Registration Number"] && (
                    <span className={styles.errorText}>
                      {String((errors.trials as any)[index]["Trial ID / Registration Number"]?.message)}
                    </span>
                  )}
                </div>

                {/* <div className={styles.formGroup}>
                  <label>Institution / Organization <span className={styles.required}>*</span></label>
                  <input
                    type="text"
                    placeholder="Enter text"
                    {...register(`trials.${index}["Institution / Organization"]`, {
                      required: "Institution is required",
                    })}
                    className={
                      (errors.trials as any)?.[index]?.["Institution / Organization"] ? styles.error : ""
                    }
                  />
                  {(errors.trials as any)?.[index]?.["Institution / Organization"] && (
                    <span className={styles.errorText}>
                      {String((errors.trials as any)[index]["Institution / Organization"]?.message)}
                    </span>
                  )}
                </div> */}

                <div className={styles.formGroup}>
                  <label>Role / Position <span className={styles.required}>*</span></label>
                  <select
                    {...register(`trials.${index}["Role / Position"]`, {
                      required: "Role is required",
                    })}
                    className={
                      (errors.trials as any)?.[index]?.["Role / Position"] ? styles.error : ""
                    }
                  >
                    <option value="">Select role/position</option>
                    <option value="Principal Investigator">Principal Investigator</option>
                    <option value="Co-Investigator">Co-Investigator</option>
                    <option value="Research Coordinator">Research Coordinator</option>
                    <option value="Study Monitor">Study Monitor</option>
                    <option value="Data Manager">Data Manager</option>
                    <option value="Other">Other</option>
                  </select>
                  {(errors.trials as any)?.[index]?.["Role / Position"] && (
                    <span className={styles.errorText}>
                      {String((errors.trials as any)[index]["Role / Position"]?.message)}
                    </span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label>Start Date <span className={styles.required}>*</span></label>
                  <input
                    type="date"
                    {...register(`trials.${index}["Start Date"]`, {
                      required: "Start date is required",
                    })}
                    className={
                      (errors.trials as any)?.[index]?.["Start Date"] ? styles.error : ""
                    }
                  />
                  {(errors.trials as any)?.[index]?.["Start Date"] && (
                    <span className={styles.errorText}>
                      {String((errors.trials as any)[index]["Start Date"]?.message)}
                    </span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label>End Date <span className={styles.required}>*</span></label>
                  <input
                    type="date"
                    {...register(`trials.${index}["End Date"]`, {
                      required: "End date is required",
                    })}
                    className={
                      (errors.trials as any)?.[index]?.["End Date"] ? styles.error : ""
                    }
                  />
                  {(errors.trials as any)?.[index]?.["End Date"] && (
                    <span className={styles.errorText}>
                      {String((errors.trials as any)[index]["End Date"]?.message)}
                    </span>
                  )}
                </div>

                {/* <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}>
                  <label>Brief Description / Outcome</label>
                  <textarea
                    placeholder="Enter text"
                    {...register(`trials.${index}["Brief Description / Outcome"]`)}
                    rows={4}
                  />
                </div> */}
              </div>
              {fields.length > 1 && (
                <button
                  type="button"
                  className={styles.removeCard}
                  style={{
                    top: "-1rem"
                  }}
                  onClick={() => remove(index)}
                >
                  Remove Membership
                </button>
              )}
            </div>
            )})}


        <div className="d-flex justify-content-center align-items-center">
          <button type="button" className={styles.addButton} onClick={addTrial}>
            + Add Another
          </button>
          
        </div>
      </form>
    </div>
  );
}
