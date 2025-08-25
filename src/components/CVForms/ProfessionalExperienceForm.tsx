import React, { useEffect } from "react";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import styles from "./CVForms.module.scss";
import { IBaseFormProps } from "./types";
import { CustomInput, CustomSelect } from "../FormGroup";
import { countryOptions, monthOptions, yearOptions } from "../FormGroup/selectOptions";

export default function ProfessionalExperienceForm({
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
      experiences: defaultValues?.("Professional Experience")?.length > 0 
        ? defaultValues("Professional Experience") 
        : [
            {
              "Job Title": "",
              "Organization/Hospital Name": "",
              "Start Date": "",
              "End Date": "",
              "City": "",
              "State": "",
              "Country": "",
            },
          ],
    },
    mode: "onChange",
  });

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
          (el as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'center' });
          if (typeof (el as HTMLElement).focus === 'function') (el as HTMLElement).focus();
        }
      }
    }
  }, [errors, isNextClick]);
  const watchedValues = useWatch({ control });
  useEffect(() => {
    if (onChange) onChange(watchedValues.experiences, "Professional Experience");
  }, [watchedValues]);
  useEffect(() => {
    const formContent = document.getElementById("cv-form-content");
    if (formContent) {
      formContent.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);
  // useEffect(() => {
  //   if (isNextClick) {
  //     console.log("ProfessionalExperienceForm - Next button clicked, triggering validation...");
      
  //     // Trigger validation for all fields before submitting
  //     trigger().then((isValid) => {
  //       console.log("ProfessionalExperienceForm - Validation result:", isValid);
  //       if (isValid) {
  //         console.log("ProfessionalExperienceForm - Form is valid, submitting...");
  //         // Get current form values using watch
  //         const currentValues = watch();
  //         console.log("ProfessionalExperienceForm - Current form values:", currentValues);
  //         onSubmit(currentValues, "Professional Experience");
  //       } else {
  //         console.log("ProfessionalExperienceForm - Form validation failed, errors:", errors);
  //       }
  //     }).catch((error) => {
  //       console.error("ProfessionalExperienceForm - Validation error:", error);
  //     });
      
  //     // Always reset the flag to prevent infinite loops
  //     setIsNextClick(false);
  //   }
  // }, [isNextClick, trigger, errors, watch, onSubmit, setIsNextClick]);

  // Debug: Log default values to see what's being received
  
  useEffect(() => {
    if (isNextClick) {
      setIsNextClick(false);
      // Trigger validation for all fields before submitting
      trigger().then((isValid) => {
        if (isValid) {
          handleSubmit((data) => {
            // Transform the data to match the expected format
            const transformedData = data.experiences.map((experience: any) => ({
              "Job Title": experience["Job Title"],
              "Organization/Hospital Name": experience["Organization/Hospital Name"],
              "Start Date": experience["Start Date"],
              "End Date": experience["End Date"],
              "City": experience["City"],
              "State": experience["State"],
              "Country": experience["Country"],
            }));
            onSubmit(transformedData, "Professional Experience");
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
      "Job Title": "",
      "Organization/Hospital Name": "",
      "Start Date": "",
      "End Date": "",
      "City": "",
      "State": "",
      "Country": "",
    });
  };

  return (
    <div className={styles.formSection}>
      <h2 className={styles.sectionTitle}>Professional Experience</h2>

      <form>
        {fields.map((field, index) => (
          <div key={field.id} className={styles.affiliationCard}>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>
                  Job Title <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter text"
                  {...register(`experiences.${index}.Job Title`, {
                    required: "Job title is required",
                  })}
                  className={
                    (errors.experiences as any)?.[index]?.["Job Title"] ? styles.error : ""
                  }
                />
                {(errors.experiences as any)?.[index]?.["Job Title"] && (
                  <span className={styles.errorText}>
                    {String((errors.experiences as any)[index]["Job Title"]?.message)}
                  </span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label>
                  Organization/Hospital Name <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter text"
                  {...register(`experiences.${index}.Organization/Hospital Name`, {
                    required: "Organization/Hospital name is required",
                  })}
                  className={
                    (errors.experiences as any)?.[index]?.["Organization/Hospital Name"] ? styles.error : ""
                  }
                />
                {(errors.experiences as any)?.[index]?.["Organization/Hospital Name"] && (
                  <span className={styles.errorText}>
                    {String((errors.experiences as any)[index]["Organization/Hospital Name"]?.message)}
                  </span>
                )}
              </div>

              {/* <div className={styles.formGroup}>
                <label>
                  Start Date <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Select month and year"
                  {...register(`experiences.${index}.Start Date`, {
                    required: "Start date is required",
                  })}
                  className={
                    (errors.experiences as any)?.[index]?.["Start Date"] ? styles.error : ""
                  }
                />
                {(errors.experiences as any)?.[index]?.["Start Date"] && (
                  <span className={styles.errorText}>
                    {String((errors.experiences as any)[index]["Start Date"]?.message)}
                  </span>
                )}
              </div> */}
              <CustomInput
                name={`experiences.${index}.Start Date`}
                type="date"
                label="Start Date"
                showMonthYearPicker
                control={control}
                placeholder="Start Year"
                error={(errors.experiences as any)?.[index]?.["Start Date"]}
              />

              {/* <div className={styles.formGroup}>
                <label>
                  End Date <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Select month and year"
                  {...register(`experiences.${index}.End Date`, {
                    required: "End date is required",
                  })}
                  className={
                    (errors.experiences as any)?.[index]?.["End Date"] ? styles.error : ""
                  }
                />
                {(errors.experiences as any)?.[index]?.["End Date"] && (
                  <span className={styles.errorText}>
                    {String((errors.experiences as any)[index]["End Date"]?.message)}
                  </span>
                )}
              </div> */}
              <CustomInput
                name={`experiences.${index}.End Date`}
                type="date"
                label="End Date"
                showMonthYearPicker
                control={control}
                placeholder="End Year"
                error={(errors.experiences as any)?.[index]?.["End Date"]}
              />

              <div className={styles.formGroup}>
                <label>
                  City <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter text"
                  {...register(`experiences.${index}.City`, {
                    required: "City is required",
                  })}
                  className={
                    (errors.experiences as any)?.[index]?.City ? styles.error : ""
                  }
                />
                {(errors.experiences as any)?.[index]?.City && (
                  <span className={styles.errorText}>
                    {String((errors.experiences as any)[index]?.City?.message)}
                  </span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label>
                  State <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter text"
                  {...register(`experiences.${index}.State`, {
                    required: "State is required",
                  })}
                  className={
                    (errors.experiences as any)?.[index]?.State ? styles.error : ""
                  }
                />
                {(errors.experiences as any)?.[index]?.State && (
                  <span className={styles.errorText}>
                    {String((errors.experiences as any)[index]?.State?.message)}
                  </span>
                )}
              </div>

              <div className={styles.formGroup}>
                <Controller
                  name={`experiences.${index}.Country`}
                  control={control}
                  render={({ field }) => (
                    <CustomSelect
                      label="Country"
                      options={countryOptions}
                      value={countryOptions.find(option => option.value === field.value) || null}
                      onChange={(selectedOption) => field.onChange(selectedOption?.value || "")}
                      placeholder="Select country"
                      isClearable
                    />
                  )}
                />
              </div>
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
