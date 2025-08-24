import React, { useEffect } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import styles from "./CVForms.module.scss";
import { IBaseFormProps } from "./types";

export default function PsychometricRatingScalesExperienceForm({
  defaultValues,
  onSubmit,
  isNextClick,
  setIsNextClick,
  onChange
}: IBaseFormProps) {
  // Debug logging for default values
  console.log("=== PSYCHOMETRIC FORM - DEFAULT VALUES DEBUG ===");
  console.log("defaultValues function:", defaultValues);
  console.log("defaultValues('Psychometric Rating/Scales Experiences'):", defaultValues?.("Psychometric Rating/Scales Experiences"));
  console.log("All available keys:", defaultValues ? Object.keys(defaultValues) : "No defaultValues");
  
  // Get the existing data from defaultValues
  const existingData = defaultValues?.("Psychometric Rating/Scales Experiences") || [];
  console.log("Existing data from defaultValues:", existingData);
  
  // Create the initial experiences array
  const initialExperiences = existingData.length > 0 ? existingData : [
    {
      "Scale / Rating Name": "",
      "Number of Scales Used": "",
      "Description / Experience": "",
      "Context / Application": "",
    },
  ];
  
  console.log("Initial experiences array:", initialExperiences);
  
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm({
    defaultValues: {
      experiences: initialExperiences,
    },
    mode: "onChange",
  });

  const watchedValues = useWatch({ control });
  useEffect(() => {
    if (onChange) onChange(watchedValues.experiences, "Psychometric Rating/Scales Experiences");
  }, [watchedValues]);

  useEffect(() => {
    const formContent = document.getElementById("cv-form-content");
    if (formContent) {
      formContent.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    if (isNextClick) {
      setIsNextClick(false);
      // Trigger validation for all fields before submitting
      trigger().then((isValid) => {
        if (isValid) {
          handleSubmit((data) => {
            // Extract the experiences array from the form data
            const experiencesData = data.experiences || [];
            onSubmit(experiencesData, "Psychometric Rating/Scales Experiences");
          })();
        }
      });
    }
  }, [isNextClick, handleSubmit, onSubmit, setIsNextClick, trigger]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiences",
  });

  const addExperience = () => {
    append({
      "Scale / Rating Name": "",
      "Number of Scales Used": "",
      "Description / Experience": "",
      "Context / Application": "",
    });
  };

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
        const el = document.querySelector(`[name='${firstErrorName}']`);
        if (el && typeof (el as HTMLElement).scrollIntoView === 'function') {
          (el as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' });
          if (typeof (el as HTMLElement).focus === 'function') (el as HTMLElement).focus();
        }
      }
    }
  }, [errors, isNextClick]);

  return (
    <div className={styles.formSection}>
      <h2 className={styles.sectionTitle}>Psychometric Rating/Scales Experience</h2>

      <form>
        {fields.map((field, index) => (
          <div key={field.id} className={styles.affiliationCard}>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>Scale / Rating Name *</label>
                <input
                  type="text"
                  placeholder="Enter text"
                  {...register(`experiences.${index}.Scale / Rating Name`, {
                    required: "Scale / Rating Name is required"
                  })}
                  className={(errors.experiences as any)?.[index]?.["Scale / Rating Name"] ? styles.error : ""}
                />
                {(errors.experiences as any)?.[index]?.["Scale / Rating Name"] && (
                  <span className={styles.errorText}>
                    {(errors.experiences as any)?.[index]?.["Scale / Rating Name"]?.message}
                  </span>
                )}
              </div>

              {/* <div className={styles.formGroup}>
                <label>Number of Scales Used</label>
                <select
                  {...register(`experiences.${index}.Number of Scales Used`)}
                >
                  <option value="">Enter text</option>
                  <option value="1-5">1-5</option>
                  <option value="6-10">6-10</option>
                  <option value="11-20">11-20</option>
                  <option value="21-50">21-50</option>
                  <option value="50+">50+</option>
                </select>
              </div>

              <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}>
                <label>Description / Experience</label>
                <textarea
                  placeholder="Enter text"
                  {...register(`experiences.${index}.Description / Experience`)}
                  rows={4}
                />
              </div>

              <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}>
                <label>Context / Application</label>
                <select
                  {...register(`experiences.${index}.Context / Application`)}
                >
                  <option value="">Enter text</option>
                  <option value="Clinical Practice">Clinical Practice</option>
                  <option value="Research">Research</option>
                  <option value="Educational">Educational</option>
                  <option value="Assessment">Assessment</option>
                  <option value="Therapy">Therapy</option>
                  <option value="Other">Other</option>
                </select>
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
                Remove Experience
              </button>
            )}
          </div>
        ))}

         <div className="d-flex justify-content-center align-items-center">
          <button
            type="button"
            className={styles.addBtn}
            onClick={addExperience}
          >
            + Add Another
          </button>
         </div>
      </form>
    </div>
  );
}
