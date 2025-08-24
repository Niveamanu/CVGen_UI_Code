import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import styles from "./CVForms.module.scss";
import { IBaseFormProps } from "./types";
import { CustomSelect, CustomInput } from "../FormGroup";
import { CommonService } from "../../api/services/common";
import { useApiClient } from "../../hooks/useApiClient";

interface PersonalInfo {
  "First Name": string;
  "Middle Name": string;
  "Last Name": string;
  "Degree Title": string[];
  "Certifications": string;
  "Business Number": string;
  "Business Email Address": string;
  "Languages"?: { "Language Name": string; "Proficiency": string }[];
}

interface CredentialsResponse {
  "Degree Title": string[];
  "Certifications": string[];
}

// Helper function to parse degree titles from various formats
const parseDegreeTitles = (degreeTitle: any): string[] => {
  if (!degreeTitle) return [];
  
  // If it's already an array, return as is
  if (Array.isArray(degreeTitle)) {
    return degreeTitle;
  }
  
  // If it's a string, split by comma and trim whitespace
  if (typeof degreeTitle === 'string') {
    return degreeTitle.split(',').map(title => title.trim()).filter(title => title.length > 0);
  }
  
  return [];
};

// Helper function to get all available options including custom ones
const getAllDegreeOptions = (currentValues: string[], degreeTitleOptions: Array<{value: string, label: string}>) => {
  const customOptions = currentValues
    .filter(value => !degreeTitleOptions.find(option => option.value === value))
    .map(value => ({ value, label: value }));
  
  return [...degreeTitleOptions, ...customOptions];
};
 
export default function PersonalDetailsForm({
  defaultValues,
  onSubmit,
  isNextClick,
  setIsNextClick,
  onChange
}: IBaseFormProps) {
  // const PersonalDetailsForm = forwardRef((props: IBaseFormProps, ref) => {
  //   const { defaultValues, onSubmit, isNextClick, setIsNextClick, onChange } = props;
  const { store } = useApiClient();
  const [degreeTitleOptions, setDegreeTitleOptions] = useState<Array<{value: string, label: string}>>([]);
  const [isLoadingCredentials, setIsLoadingCredentials] = useState(true);

  useEffect(() => {
    const fetchCredentials = async () => {
      try {
        setIsLoadingCredentials(true);
        const commonService = new CommonService(store);
        const response = await commonService.getCredentials();
        
        if (response && response.data && (response.data as CredentialsResponse)["Degree Title"]) {
          const credentialsData = response.data as CredentialsResponse;
          const options = credentialsData["Degree Title"].map((title: string) => ({
            value: title,
            label: title
          }));
          setDegreeTitleOptions(options);
        }
      } catch (error) {
        console.error("Failed to fetch credentials:", error);
        // Fallback to empty array if API fails
        setDegreeTitleOptions([]);
      } finally {
        setIsLoadingCredentials(false);
      }
    };

    fetchCredentials();
  }, [store]);

  // Parse degree titles from default values
  const defaultDegreeTitles = parseDegreeTitles(
    defaultValues?.("Personal Information")?.["Degree Title"]
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
    setValue,
    trigger
  } = useForm({
    defaultValues: {
      "First Name": "",
      "Middle Name": "",
      "Last Name": "",
      "Certifications": "",
      "Business Number": "",
      "Business Email Address": "",
      ...(defaultValues?.("Personal Information") || {}),
      "Languages": [
        ...(defaultValues?.("Languages")?.length > 0 ?  defaultValues?.("Languages") : [{
          "Language Name": "",
          "Proficiency Level": "",
          "Certification / Qualification": "",
        }])
      ],
      "Degree Title": defaultDegreeTitles,
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
            (el as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            if (typeof (el as HTMLElement).focus === 'function') (el as HTMLElement).focus();
          }
        }
      }
    }, [errors, isNextClick]);

  const watchedValues = useWatch({ control });
  useEffect(() => {
    if (onChange) onChange(watchedValues, "Personal Information");
  }, [watchedValues]);

  const languages = watch("Languages") || [
    {
      "Language Name": "",
      "Proficiency Level": "",
      "Certification / Qualification": "",
    },
  ];

  const addLanguage = () => {
    setValue("Languages", [
      ...languages,
      {
        "Language Name": "",
        "Proficiency Level": "",
        "Certification / Qualification": "",
      },
    ]);
  };

  const removeLanguage = (index: number) => {
    // Prevent removing the first language if it's the only one
    if (languages.length > 1) {
      setValue(
        "Languages",
        languages.filter((_: any, i: any) => i !== index)
      );
    }
  };

  const [showLanguages, setShowLanguages] = useState(true);

  const handleToggleLanguages = () => setShowLanguages((prev) => !prev);

  useEffect(() => {
    if (isNextClick) {
      setIsNextClick(false);
      handleSubmit((data) => onSubmit(data, "Personal Information"))();
    }
  }, [isNextClick, handleSubmit, onSubmit, setIsNextClick, languages]);

  useEffect(() => {
    const formContent = document.getElementById("cv-form-content");
    if (formContent) {
      formContent.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);
  return (
    <div className={styles.formSection}>
      <h2 className={styles.sectionTitle}>Personal Details</h2>

      <form>
        <div className={styles.formGrid}>
          {/* Name Fields */}
          <CustomInput
            type="text"
            label="First Name"
            placeholder="Enter First Name"
            register={register}
            name="First Name"
            error={errors["First Name"]}
            required
            validation={{ required: "First name is required" }}
          />

          <CustomInput
            type="text"
            label="Middle Name"
            placeholder="Enter Middle Name (Optional)"
            register={register}
            name="Middle Name"
            error={errors["Middle Name"]}
          />

          <CustomInput
            type="text"
            label="Last Name"
            placeholder="Enter Last Name"
            register={register}
            name="Last Name"
            error={errors["Last Name"]}
            required
            validation={{ required: "Last name is required" }}
          />

          {/* Degree Title Dropdown */}
          <Controller
            name="Degree Title"
            control={control}
            rules={{ required: "Degree title is required" }}
            render={({ field }) => {
              const currentValues = field.value ? (Array.isArray(field.value) ? field.value : [field.value]) : [];
              
              const allOptions = getAllDegreeOptions(currentValues, degreeTitleOptions);
              
              const selectedOptions = allOptions.filter(option => 
                currentValues.includes(option.value)
              );
              
              return (
                <CustomSelect
                  label="Degree Title"
                  options={allOptions}
                  value={selectedOptions}
                  onChange={(selectedOptions) => {
                    const values = selectedOptions ? 
                      (Array.isArray(selectedOptions) ? selectedOptions.map(opt => opt.value) : [selectedOptions.value]) : 
                      [];
                    field.onChange(values);
                  }}
                  placeholder={isLoadingCredentials ? "Loading degree titles..." : "Select degree titles (e.g., BS, DC, DDS) or type to add custom titles"}
                  isMulti
                  isClearable
                  isSearchable
                  required
                  error={String(errors["Degree Title"]?.message || "")}
                />
              );
            }}
          />

          {/* Certifications */}
          <CustomInput
            label="Certifications"
            name="Certifications"
            type="text"
            placeholder="e.g., Board Certified, Licensed, etc."
            register={register}
            error={errors["Certifications"]}
            required
            validation={{ required: "Certifications are required" }}
          />

          {/* Business Information */}
          <CustomInput
            label="Business Number"
            name="Business Number"
            type="tel"
            placeholder="Enter Business Phone Number"
            register={register}
            error={errors["Business Number"]}
            validation={{ required: "Business number is required" }}
            required
          />

          <CustomInput
            label="Business Email Address"
            name="Business Email Address"
            type="email"
            placeholder="Enter Business Email"
            register={register}
            validation={{
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Please enter a valid email address",
              },
              required: "Business email address is required"
            }}
            error={errors["Business Email Address"]}
            required
          />
        </div>

        {/* Languages Section */}
        <div className={styles.languagesSection}>
          <div className={styles.languagesHeader}>
            <h3>Languages <span className={styles.required}>*</span></h3>
            <div
            style={{
              cursor: 'pointer',
              transform: showLanguages ? 'rotate(0deg)' : 'rotate(180deg)',
              transition: 'transform 0.2s',
              width: '22px',
              height: '22px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={handleToggleLanguages}
            >
              <svg
                width="12" height="8" viewBox="0 0 12 8" fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.59 0.296875L6 4.87687L1.41 0.296875L0 1.70687L6 7.70687L12 1.70687L10.59 0.296875Z" fill="black" fillOpacity="0.54"/>
              </svg>
            </div>
          </div>
          {showLanguages && (
            <>
              <div className={styles.nestedGrid}>
                {languages.map((language: any, index: number) => (
                  <div
                    key={index}
                    style={{ position: "relative" }}
                  >
                    <div className={styles.nestedRow}>
                      <CustomInput
                        label="Language Name"
                        name={`Languages.${index}."Language Name"`}
                        placeholder="Enter language name"
                        register={register}
                        required
                        validation={{ required: "Language name is required" }}
                        error={
                          (errors.Languages &&
                            Array.isArray(errors.Languages) &&
                            errors.Languages[index]?.["Language Name"]) ||
                          undefined
                        }
                      />
                      {languages.length > 1 && (
                        <div
                          style={{
                            position: "absolute",
                            top: "-10px",
                            right: 0,
                            cursor: "pointer",
                            zIndex: 1000,
                          }}
                        >
                          <svg
                            className={styles.removeBtn}
                            onClick={() => removeLanguage(index)}
                            width="30px"
                            height="25px"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 12V16M10 14H14M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6"
                              stroke="#FF0000FF"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <button
                  type="button"
                  className={styles.addBtn}
                  onClick={addLanguage}
                >
                  + Add Language
                </button>
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  );
};