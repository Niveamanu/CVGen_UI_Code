import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./CVForms.module.scss";
import { IBaseFormProps } from "./types";
import { CustomSelect, CustomInput } from "../FormGroup";
import { stateOptions } from "../FormGroup/selectOptions";
import { CommonService } from "../../api/services/common";
import { useApiClient } from "../../hooks/useApiClient";

// Generate year options from current year to next 20 years, plus "Present"
const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: 21 }, (_, i) => ({
  value: (currentYear + i).toString(),
  label: (currentYear + i).toString(),
}));

// Add "Present" option for ongoing positions
const yearOptionsWithPresent = [
  ...yearOptions,
  { value: "Present", label: "Present" }
];

interface CountriesResponse {
  countries: string[];
}

export default function HospitalAffiliationsForm({
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
    watch,
    trigger,
  } = useForm({
    defaultValues: {
      affiliations: [
        ...(defaultValues?.("Hospital Affiliations").length > 0 ? defaultValues?.("Hospital Affiliations") : [{
          "Hospital Name": "",
          "From Date": "",
          "To Date": "",
          "city": "",
          "state": "",
          "zipcode": "",
          "country": "",
        }]),
      ],
    },
    mode: "onChange",
  });

  const watchedValues = useWatch({ control });
  
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
        // If error is like affiliations.2.City, extract affiliations.2
        const match = firstErrorName.match(/affiliations\.(\d+)/);
        const errorCardPath = match ? `affiliations.${match[1]}` : null;
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
    if (onChange) onChange(watchedValues.affiliations as any, "Hospital Affiliations");
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
            // No transformation needed since backend field names match CV type definition
            onSubmit(data.affiliations, "Hospital Affiliations");
          })();
        }
      });
    }
  }, [isNextClick, handleSubmit, onSubmit, setIsNextClick, trigger]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "affiliations",
  });
  console.log("fields", JSON.stringify(watchedValues.affiliations));
  const addAffiliation = () => {
    append({
      "Hospital Name": "",
      "From Date": "",
      "To Date": "",
      "city": "",
      "state": "",
      "zipcode": "",
      "country": "",
    });
  };

  return (
    <div className={styles.formSection}>
      <h2 className={styles.sectionTitle}>Hospital Affiliations</h2>
      
      <form>
        {fields.map((field, index) => (
          <div key={field.id} className={styles.affiliationCard} data-error-path={`affiliations.${index}`}>
            <div className={styles.formGrid}>
              <CustomInput
                label="Hospital Name"
                name={`affiliations.${index}.Hospital Name`}
                placeholder="Enter Text"
                register={register}
                validation={{
                  required: "Hospital name is required",
                }}
                error={(errors.affiliations as any)?.[index]?.["Hospital Name"]}
                required
              />

              {/* <CustomInput
                label="Department / Specialty"
                name={`affiliations.${index}.Department / Specialty`}
                placeholder="Enter text"
                register={register}
              />

              <CustomInput
                label="Position / Role"
                name={`affiliations.${index}.Position / Role`}
                placeholder="Enter Text"
                register={register}
              />

              <div style={{ gridColumn: "1 / -1" }}>
                <CustomInput
                  label="Contact Details"
                  name={`affiliations.${index}.Contact Details`}
                  placeholder="e.g., Miami, Florida"
                  register={register}
                />
              </div> */}

              <Controller
                name={`affiliations.${index}."From Date"`}
                control={control}
                rules={{ required: "From date is required" }}
                render={({ field }) => (
                  <CustomSelect
                    label="From"
                    options={yearOptions}
                    value={yearOptions.find(option => option.value === field.value) || null}
                    onChange={(selectedOption) => field.onChange(selectedOption?.value || "")}
                    placeholder="Select year"
                    isClearable
                    required
                    error={(errors.affiliations as any)?.[index]?.["From Date"]?.message}
                  />
                )}
              />

              <Controller
                name={`affiliations.${index}."To Date"`}
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    label="To"
                    options={yearOptionsWithPresent}
                    value={yearOptionsWithPresent.find(option => option.value === field.value) || null}
                    onChange={(selectedOption) => field.onChange(selectedOption?.value || "")}
                    placeholder="Select year or Present"
                    isClearable
                    error={(errors.affiliations as any)?.[index]?.["To Date"]?.message}
                  />
                )}
              />

              <CustomInput
                label="city"
                name={`affiliations.${index}."city"`}
                placeholder="Enter city"
                register={register}
                validation={{ required: "City is required" }}
                required
                error={(errors.affiliations as any)?.[index]?.["city"]?.message}
              />

              <CustomInput
                label="State"
                name={`affiliations.${index}."state"`}
                placeholder="Enter state"
                register={register}
                validation={{ required: "State is required" }}
                required
                error={(errors.affiliations as any)?.[index]?.["state"]?.message}
              />

              {/* <CustomInput
                label="Zip Code"
                name={`affiliations.${index}.zipcode`}
                placeholder="Enter zip code"
                register={register}
                error={(errors.affiliations as any)?.[index]?.zipcode?.message}
              /> */}

              <div className={styles.formGroup}>
                <Controller
                  name={`affiliations.${index}."Country"`}
                  control={control}
                  render={({ field }) => (
                    <CustomSelect
                      label="Country"
                      options={countryOptions}
                      value={countryOptions.find(option => option.value === field.value) || null}
                      onChange={(selectedOption) => field.onChange(selectedOption?.value || "")}
                      placeholder={isLoadingCountries ? "Loading countries..." : "Select country"}
                      isClearable
                      error={(errors.affiliations as any)?.[index]?.["Country"]?.message}
                    />
                  )}
                />
              </div>
            </div>

            {fields.length > 1 && (
              <button
                type="button"
                className={styles.removeCard}
                onClick={() => remove(index)}
                style={{
                  position: "absolute",
                  top: "-18px",
                }}
              >
                Remove Affiliation
              </button>
            )}
          </div>
        ))}
        <div className="d-flex justify-content-center align-items-center">
          <button type="button" className={styles.addButton} onClick={addAffiliation}>
            + Add Another
          </button>
        </div>
      </form>
    </div>
  );
}
