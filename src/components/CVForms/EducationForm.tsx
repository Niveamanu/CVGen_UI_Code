import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import styles from "./CVForms.module.scss";
import { IBaseFormProps } from "./types";
import { CustomSelect, CustomInput } from "../FormGroup";
import { stateOptions, yearOptions } from "../FormGroup/selectOptions";
import { CommonService } from "../../api/services/common";
import { useApiClient } from "../../hooks/useApiClient";

interface CountriesResponse {
  countries: string[];
}

export default function EducationForm({
  defaultValues,
  onSubmit,
  isNextClick,
  setIsNextClick,
  onChange
}: IBaseFormProps) {
  const { store } = useApiClient();
  const [countryOptions, setCountryOptions] = useState<Array<{value: string, label: string}>>([]);
  const [isLoadingCountries, setIsLoadingCountries] = useState(true);

  // Fetch countries from API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setIsLoadingCountries(true);
        const commonService = new CommonService(store);
        const response = await commonService.getCountries();
        
        if (response && response.data && (response.data as CountriesResponse).countries) {
          const countriesData = response.data as CountriesResponse;
          const options = countriesData.countries.map((country: string) => ({
            value: country,
            label: country
          }));
          setCountryOptions(options);
        }
      } catch (error) {
        console.error("Failed to fetch countries:", error);
        // Fallback to empty array if API fails
        setCountryOptions([]);
      } finally {
        setIsLoadingCountries(false);
      }
    };

    fetchCountries();
  }, [store]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm({
    defaultValues: {
      education: defaultValues?.("Education").length > 0 ? defaultValues?.("Education") : [
        {
          startYear: "",
          endYear: "",
          degree: "",
          universityName: "",
          city: "",
          state: "",
          country: "",
        },
      ],
    },
    shouldUnregister: false,
    mode: "onChange",
  });
  
  const watchedValues = useWatch({ control });
  useEffect(() => {
    const transformedData = watchedValues.education.map((education: any) => ({
      "startYear": education.startYear,
      "endYear": education.endYear,
      "degree": education.degree,
      "universityName": education.universityName,
      "city": education.city,
      "state": education.state,
      "country": education.country,
    }));
    if (onChange) onChange(transformedData as any, "Education");
  }, [watchedValues]);
  useEffect(() => {
    const formContent = document.getElementById("cv-form-content");
    if (formContent) {
      formContent.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
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
        // If error is like education.2.city, extract education.2
        const match = firstErrorName.match(/education\.(\d+)/);
        const errorCardPath = match ? `education.${match[1]}` : null;
        if (errorCardPath) {
          const card = document.querySelector(`[data-error-path='${errorCardPath}']`);
          if (card && typeof (card as HTMLElement).scrollIntoView === 'function') {
            (card as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }
      }
    }
  }, [errors, isNextClick]);
  
  useEffect(() => {
    if (isNextClick) {
      setIsNextClick(false);
      // Trigger validation for all fields before submitting
      trigger().then((isValid) => {
        console.log("Form validation result:", isValid);
        if (isValid) {
          handleSubmit((data) => {
            // Transform the data to match the expected format
            const transformedData = data.education.map((education: any) => ({
              "startYear": education.startYear,
              "endYear": education.endYear,
              "degree": education.degree,
              "universityName": education.universityName,
              "city": education.city,
              "state": education.state,
              "country": education.country,
            }));
            onSubmit(transformedData, "Education");
          })();
        }
      });
    }
  }, [isNextClick, handleSubmit, onSubmit, setIsNextClick, trigger, fields]);

  const addEducation = () => {
    append({
      startYear: "",
      endYear: "",
      degree: "",
      universityName: "",
      city: "",
      state: "",
      country: "",
    });
  };

  return (
    <div className={styles.formSection}>
      <h2 className={styles.sectionTitle}>Education</h2>
      
      <form>
        {fields.map((field, index) => (
          <div key={field.id} className={styles.affiliationCard} data-error-path={`education.${index}`}>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <Controller
                  name={`education.${index}.startYear`}
                  control={control}
                  rules={{ required: "Start year is required" }}
                  render={({ field }) => (
                    <CustomSelect
                      label="Start Year"
                      options={yearOptions}
                      value={yearOptions.find(option => option.value === field.value) || null}
                      onChange={(selectedOption) => field.onChange(selectedOption?.value || "")}
                      placeholder="Select year"
                      isClearable
                      required
                      error={(errors.education as any)?.[index]?.startYear?.message || (errors.education as any)?.[index]?.startYear}
                    />
                  )}
                />
              </div>

              <div className={styles.formGroup}>
                <Controller
                  name={`education.${index}.endYear`}
                  control={control}
                  rules={{ required: "End year is required" }}
                  render={({ field }) => (
                    <CustomSelect
                      label="End Year"
                      options={yearOptions}
                      value={yearOptions.find(option => option.value === field.value) || null}
                      onChange={(selectedOption) => field.onChange(selectedOption?.value || "")}
                      placeholder="Select year"
                      isClearable
                      required
                      error={(errors.education as any)?.[index]?.endYear?.message || (errors.education as any)?.[index]?.endYear}
                    />
                  )}
                />
              </div>

              <div style={{ gridColumn: "1 / -1" }}>
                <CustomInput
                  label="Degree"
                  name={`education.${index}.degree`}
                  placeholder="e.g., Medical Doctorate (M.D.)"
                  register={register}
                  validation={{
                    required: "Degree is required",
                  }}
                  error={(errors.education as any)?.[index]?.degree}
                  required
                />
              </div>

              <div style={{ gridColumn: "1 / -1" }}>
                <CustomInput
                  label="University Name"
                  name={`education.${index}.universityName`}
                  placeholder="e.g., University of Miami Miller School of Medicine"
                  register={register}
                  validation={{
                    required: "University name is required",
                  }}
                  error={(errors.education as any)?.[index]?.universityName}
                  required
                />
              </div>

              <CustomInput
                label="City"
                name={`education.${index}.city`}
                placeholder="e.g., Miami"
                register={register}
                validation={{
                  required: "City is required",
                }}
                error={(errors.education as any)?.[index]?.city}
                required
              />

              <div className={styles.formGroup}>
                <Controller
                  name={`education.${index}.state`}
                  control={control}
                  rules={{ required: "State is required" }}
                  render={({ field }) => (
                    <CustomSelect
                      label="State"
                      options={stateOptions}
                      value={stateOptions.find(option => option.value === field.value) || null}
                      onChange={(selectedOption) => field.onChange(selectedOption?.value || "")}
                      placeholder="Select state"
                      isClearable
                      required
                      error={(errors.education as any)?.[index]?.state?.message || (errors.education as any)?.[index]?.state}
                    />
                  )}
                />
              </div>

              <div className={styles.formGroup}>
                <Controller
                  name={`education.${index}.country`}
                  control={control}
                  render={({ field }) => (
                    <CustomSelect
                      label="Country"
                      options={countryOptions}
                      value={countryOptions.find(option => option.value === field.value) || null}
                      onChange={(selectedOption) => field.onChange(selectedOption?.value || "")}
                      placeholder={isLoadingCountries ? "Loading countries..." : "Select country"}
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
                  top: '-1rem'
                }}
                onClick={() => remove(index)}
              >
                Remove Education
              </button>
            )}
          </div>
        ))}

        <div className="d-flex justify-content-center align-items-center">
          <button type="button" className={styles.addButton} onClick={addEducation}>
            + Add Another
          </button>
         
        </div>
      </form>
    </div>
  );
}
