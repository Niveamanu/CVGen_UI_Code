import React, { useEffect } from "react";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import styles from "./CVForms.module.scss";
import { IBaseFormProps } from "./types";
import { CustomSelect } from "../FormGroup";
import { yearOptionsForPrevPlus10Years as yearOptions } from "../FormGroup/selectOptions";

export default function ProfessionalActiveMembershipsForm({
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
      memberships: defaultValues?.("Professional Active Memberships")?.length > 0 
        ? defaultValues("Professional Active Memberships") 
        : [
            {
              "Organization Name": "",
              "Membership ID/Number": "",
              "Membership Type": "",
              "Status": "",
              "Start Date": "",
              "End Date": "",
              "Notes / Comments": "",
            },
          ],
    },
    mode: "onChange",
  });
  const watchedValues = useWatch({ control });
  useEffect(() => {
    if (onChange) onChange(watchedValues.memberships, "Professional Active Memberships");
  }, [watchedValues]);
  useEffect(() => {
    const formContent = document.getElementById("cv-form-content");
    if (formContent) {
      formContent.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);


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
  useEffect(() => {
    if (isNextClick) {
      trigger().then((isValid) => {
        if (isValid) {
          const currentValues = watch();
          onSubmit(currentValues.memberships, "Professional Active Memberships");
        } else {
          console.log("ProfessionalActiveMembershipsForm - Form validation failed, errors:", errors);
        }
      }).catch((error) => {
        console.error("ProfessionalActiveMembershipsForm - Validation error:", error);
      });
      
      // Always reset the flag to prevent infinite loops
      setIsNextClick(false);
    }
  }, [isNextClick, trigger, errors, watch, onSubmit, setIsNextClick]);

  // Debug: Log default values to see what's being received
  useEffect(() => {
    console.log("ProfessionalActiveMembershipsForm - defaultValues received:", defaultValues);
    console.log("ProfessionalActiveMembershipsForm - Professional Active Memberships data:", defaultValues?.("Professional Active Memberships"));
  }, [defaultValues]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "memberships",
  });

  const addMembership = () => {
    append({
      "Organization Name": "",
      "Membership ID/Number": "",
      "Membership Type": "",
      "Status": "",
      "Start Date": "",
      "End Date": "",
      "Notes / Comments": "",
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
          (el as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'center' });
          if (typeof (el as HTMLElement).focus === 'function') (el as HTMLElement).focus();
        }
      }
    }
  }, [errors, isNextClick]);
  return (
    <div className={styles.formSection}>
      <h2 className={styles.sectionTitle}>Professional Active Memberships</h2>

      <form>
        {fields.map((field, index) => (
          <div key={field.id} className={styles.affiliationCard}>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>
                  Organisation Name <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter text"
                  {...register(`memberships.${index}.Organization Name`, {
                    required: "Organisation name is required",
                  })}
                  className={
                    (errors.memberships as any)?.[index]?.["Organization Name"] ? styles.error : ""
                  }
                />
                {(errors.memberships as any)?.[index]?.["Organization Name"] && (
                  <span className={styles.errorText}>
                    {String((errors.memberships as any)[index]["Organization Name"]?.message)}
                  </span>
                )}
              </div>

              {/* <div className={styles.formGroup}>
                <label>Membership ID/Number</label>
                <input
                  type="text"
                  placeholder="Enter text"
                  {...register(`memberships.${index}.Membership ID/Number`)}
                />
              </div> */}

              <div className={styles.formGroup}>
                <label>Membership Type</label>
                <input
                  type="text"
                  placeholder="Enter text"
                  {...register(`memberships.${index}.Membership Type`)}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Status</label>
                <select
                  {...register(`memberships.${index}.Status`)}
                >
                  <option value="">Select status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Pending">Pending</option>
                  <option value="Expired">Expired</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <Controller
                  name={`memberships.${index}.Start Date`}
                  control={control}
                  render={({ field }) => (
                    <CustomSelect
                      label="Start Year"
                      options={yearOptions}
                      value={yearOptions.find(option => option.value === field.value) || null}
                      onChange={(selectedOption) => field.onChange(selectedOption?.value || "")}
                      placeholder="Select year"
                      isClearable
                    />
                  )}
                />
              </div>

              <div className={styles.formGroup}>
                <Controller
                  name={`memberships.${index}.End Date`}
                  control={control}
                  render={({ field }) => (
                    <CustomSelect
                      label="End Year"
                      options={yearOptions}
                      value={yearOptions.find(option => option.value === field.value) || null}
                      onChange={(selectedOption) => field.onChange(selectedOption?.value || "")}
                      placeholder="Select year"
                      isClearable
                    />
                  )}
                />
              </div>

              {/* <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}>
                <label>Notes / Comments</label>
                <textarea
                  placeholder="Enter text"
                  {...register(`memberships.${index}.Notes / Comments`)}
                  rows={3}
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
        ))}

        <div className="d-flex justify-content-center align-items-center">
          <button
            type="button"
            className={styles.addBtn}
            onClick={addMembership}
          >
            + Add Another
          </button>
          
        </div>
      </form>
    </div>
  );
}
