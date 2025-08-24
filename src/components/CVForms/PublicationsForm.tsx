import React, { useEffect } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import styles from "./CVForms.module.scss";
import { IBaseFormProps } from "./types";

export default function PublicationsForm({
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
      publications: defaultValues?.("Publications")?.length > 0 
        ? defaultValues("Publications") 
        : [
            {
              "Publications / Presentations": "",
              "Authors": "",
              "Journal / Source": "",
              "Publication Date": "",
              "Volume / Issue / Pages": "",
              "DOI / Link": "",
              "Description / Summary": "",
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
    if (onChange) onChange(watchedValues.publications, "Publications");
  }, [watchedValues]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "publications",
  });

  useEffect(() => {
    const formContent = document.getElementById("cv-form-content");
    if (formContent) {
      formContent.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);
  useEffect(() => {
    if (isNextClick) {
      // Trigger validation for all fields before submitting
      trigger().then((isValid) => {
        if (isValid) {
          const currentValues = watch();
          console.log("PublicationsForm - Current form values:", currentValues);
          onSubmit(currentValues?.publications ?? currentValues, "Publications");
        } else {
          console.log("PublicationsForm - Form validation failed, errors:", errors);
        }
      }).catch((error) => {
        console.error("PublicationsForm - Validation error:", error);
      });
      
      // Always reset the flag to prevent infinite loops
      setIsNextClick(false);
    }
  }, [isNextClick, trigger, errors, watch, onSubmit, setIsNextClick]);

  // Debug: Log current form values
  useEffect(() => {
    console.log("PublicationsForm - Current form values:", fields);
  }, [fields]);

  const addPublication = () => {
    append({
      "Publications / Presentations": "",
      "Authors": "",
      "Journal / Source": "",
      "Publication Date": "",
      "Volume / Issue / Pages": "",
      "DOI / Link": "",
      "Description / Summary": "",
    });
  };

  return (
    <div className={styles.formSection}>
      <h2 className={styles.sectionTitle}>Publications</h2>

      <form>
        {fields.map((field, index) => (
          <div key={field.id} className={styles.affiliationCard}>
            <div className={styles.formGrid}>
              <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}>
                <label>
                Publications / Presentations <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter publication title"
                  {...register(`publications.${index}.Publications / Presentations`, {
                    required: "Publication title is required",
                  })}
                  className={
                    (errors.publications as any)?.[index]?.["Publications / Presentations"] ? styles.error : ""
                  }
                />
                {(errors.publications as any)?.[index]?.["Publications / Presentations"] && (
                  <span className={styles.errorText}>
                    {String((errors.publications as any)[index]["Publications / Presentations"]?.message)}
                  </span>
                )}
              </div>

              <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}>
                <label>
                  Authors <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter authors"
                  {...register(`publications.${index}.Authors`, {
                    required: "Authors are required",
                  })}
                  className={
                    (errors.publications as any)?.[index]?.Authors ? styles.error : ""
                  }
                />
                {(errors.publications as any)?.[index]?.Authors && (
                  <span className={styles.errorText}>
                    {String((errors.publications as any)[index]?.Authors?.message)}
                  </span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label>
                  Journal / Source <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter journal or source"
                  {...register(`publications.${index}.Journal / Source`, {
                    required: "Journal/Source is required",
                  })}
                  className={
                    (errors.publications as any)?.[index]?.["Journal / Source"] ? styles.error : ""
                  }
                />
                {(errors.publications as any)?.[index]?.["Journal / Source"] && (
                  <span className={styles.errorText}>
                    {String((errors.publications as any)[index]["Journal / Source"]?.message)}
                  </span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label>
                  Publication Date <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., 2023 Dec 1"
                  {...register(`publications.${index}.Publication Date`, {
                    required: "Publication date is required",
                  })}
                  className={
                    (errors.publications as any)?.[index]?.["Publication Date"] ? styles.error : ""
                  }
                />
                {(errors.publications as any)?.[index]?.["Publication Date"] && (
                  <span className={styles.errorText}>
                    {String((errors.publications as any)[index]["Publication Date"]?.message)}
                  </span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label>
                  Volume / Issue / Pages
                </label>
                <input
                  type="text"
                  placeholder="e.g., 208:116-117"
                  {...register(`publications.${index}.Volume / Issue / Pages` )}
                  // className={
                  //   (errors.publications as any)?.[index]?.["Volume / Issue / Pages"] ? styles.error : ""
                  // }
                />
                {/* {(errors.publications as any)?.[index]?.["Volume / Issue / Pages"] && (
                  <span className={styles.errorText}>
                    {String((errors.publications as any)[index]["Volume / Issue / Pages"]?.message)}
                  </span>
                )} */}
              </div>

              <div className={styles.formGroup}>
                <label>DOI / Link</label>
                <input
                  type="text"
                  placeholder="Enter DOI or link"
                  {...register(`publications.${index}.DOI / Link`)}
                />
              </div>

              <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}>
                <label>Description / Summary</label>
                <textarea
                  placeholder="Enter description or summary"
                  {...register(`publications.${index}.Description / Summary`)}
                  rows={3}
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
                Remove Publication
              </button>
            )}
          </div>
        ))}

        <div className="d-flex justify-content-center align-items-center">
          <button
            type="button"
            className={styles.addBtn}
            onClick={addPublication}
          >
            + Add Another Publication
          </button>
          
        </div>
      </form>
    </div>
  );
}
