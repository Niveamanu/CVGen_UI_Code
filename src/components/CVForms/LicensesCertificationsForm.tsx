import React, { useState, useEffect } from "react";
import { useForm, useFieldArray, SubmitHandler, Controller, useWatch } from "react-hook-form";
import styles from "./CVForms.module.scss";
import { IBaseFormProps } from "./types";
import { CustomInput, CustomDatePicker, CustomSelect } from "../FormGroup";
import { yearOptions } from "../FormGroup/selectOptions";

interface LicenseData {
  licenseName: string;
  issuingAuthority: string;
  issueDate: string;
  expiryDate: string;
  licenseNumber: string;
}

interface CertificationData {
  certificateTitle: string;
  issuingOrganization: string;
  issueDate: string;
  expiryDate: string;
  certificationId: string;
}

interface FormData {
  licenses: LicenseData[];
  certifications: CertificationData[];
}

export default function LicensesCertificationsForm({
  defaultValues,
  onSubmit,
  isNextClick,
  setIsNextClick,
  onChange
}: IBaseFormProps) {
  const [expandedSections, setExpandedSections] = useState({
    licenses: true,
    certifications: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitWrapper: SubmitHandler<FormData> = (data) => {
    try {
      onSubmit(data, "Licenses & Certifications");
    } catch (error) {
      console.error("Error in form submission:", error);
    }
  };


  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<FormData>({
    defaultValues: {
      License: [
        {
          licenseName: "",
          issuingAuthority: "",
          issueDate: "",
          // expiryDate: "",
          licenseNumber: "",
        },
      ],
      certifications: [
        {
          certificateTitle: "",
          issuingOrganization: "",
          issueDate: "",
          expiryDate: "",
          certificationId: "",
        },
      ],
      ...(defaultValues?.("Licenses & Certifications") || {}),
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
    if (onChange) onChange(watchedValues as any, "Licenses & Certifications");
  }, [watchedValues]);

  useEffect(() => {
    const formContent = document.getElementById("cv-form-content");
    if (formContent) {
      formContent.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    if (isNextClick && !isSubmitting) {
      console.log("Next button clicked, triggering validation...");
      setIsSubmitting(true);
      
      // Trigger validation and handle submission
      trigger()
        .then((isValid) => {
          if (isValid) {
            handleSubmit(handleSubmitWrapper)();
          } else {
            console.log("Form validation failed");
          }
        })
        .catch((error) => {
          console.error("Validation error:", error);
          console.log("Falling back to direct submission...");
          handleSubmit(handleSubmitWrapper)();
        })
        .finally(() => {
          // Always reset states after processing
          setIsNextClick(false);
          setIsSubmitting(false);
        });
    }
  }, [isNextClick, handleSubmit, handleSubmitWrapper, setIsNextClick, trigger, isSubmitting]);

  // Debug: Log errors only when they change and are not empty
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.log("Form validation errors:", errors);
    }
  }, [errors]);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const {
    fields: licenseFields,
    append: appendLicense,
    remove: removeLicense,
  } = useFieldArray({
    control,
    name: "licenses",
  });

  const {
    fields: certificationFields,
    append: appendCertification,
    remove: removeCertification,
  } = useFieldArray({
    control,
    name: "certifications",
  });

  const addLicense = () => {
    appendLicense({
      licenseName: "",
      issuingAuthority: "",
      issueDate: "",
      expiryDate: "",
      licenseNumber: "",
    });
  };

  const addCertification = () => {
    appendCertification({
      certificateTitle: "",
      issuingOrganization: "",
      issueDate: "",
      expiryDate: "",
      certificationId: "",
    });
  };

  return (
    <div className={styles.formSection}>
      <h2 className={styles.sectionTitle}>Licenses & Certifications</h2>

      <form onSubmit={(e) => {
        e.preventDefault();
        console.log("Form submit event triggered");
        // Only submit if next button was clicked
        if (isNextClick) {
          handleSubmit(handleSubmitWrapper)();
        }
      }}>
        {/* Licenses Section */}
        {/* <div className={styles.expandableSection}>
          {/* <div 
            className={styles.sectionHeader}
            onClick={() => toggleSection('licenses')}
          >
            <h3>License</h3>
            <button type="button" className={styles.toggleBtn}>
              {expandedSections.licenses ? '▼' : '▶'}
            </button>
          </div> */}
        <div className={styles.languagesSection}>
          <div className={styles.languagesHeader}>
            <h3>License <span className={styles.required}>*</span></h3>
            <div
            style={{
              cursor: 'pointer',
              transform: expandedSections.licenses ? 'rotate(0deg)' : 'rotate(180deg)',
              transition: 'transform 0.2s',
              width: '22px',
              height: '22px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={() =>toggleSection('licenses')}
            >
              <svg
                width="12" height="8" viewBox="0 0 12 8" fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.59 0.296875L6 4.87687L1.41 0.296875L0 1.70687L6 7.70687L12 1.70687L10.59 0.296875Z" fill="black" fillOpacity="0.54"/>
              </svg>
            </div>
          </div>

          {expandedSections.licenses && (
            <>
              <div className={styles.nestedGrid}>
                {licenseFields.map((field, index) => (
                  <div
                    key={index}
                    style={{ position: "relative" }}
                  >
                       <div className={styles.nestedRow}>
                        <div className={styles.formGroup}>
                          <label>License Name <span className={styles.required}>*</span></label>
                          <CustomInput
                            name={`licenses.${index}.licenseName`}
                            register={register}
                            validation={{ required: "License name is required" }}
                            placeholder="Enter text"
                            error={errors.licenses?.[index]?.licenseName}
                          />
                        </div>

                        <div className={styles.formGroup}>
                          <label>Issuing Authority <span className={styles.required}>*</span></label>
                          <CustomInput
                            name={`licenses.${index}.issuingAuthority`}
                            register={register}
                            validation={{ required: "Issuing authority is required" }}
                            placeholder="Enter text"
                            error={errors.licenses?.[index]?.issuingAuthority}
                          />
                        </div>

                        {/* <div className={styles.formGroup}>
                          <Controller
                            name={`licenses.${index}.issueDate`}
                            control={control}
                            rules={{ required: "Issue year is required" }}
                            render={({ field }) => (
                              <CustomSelect
                                label="Issue Year"
                                options={yearOptions}
                                value={yearOptions.find(option => option.value === field.value) || null}
                                onChange={(selectedOption) => field.onChange(selectedOption?.value || "")}
                                placeholder="Select year"
                                isClearable
                                required
                                error={(errors.licenses as any)?.[index]?.issueDate?.message || (errors.licenses as any)?.[index]?.issueDate}
                              />
                            )}
                          />
                        </div> */}
                        <CustomInput
                          label="Issue Year"
                          type="date"
                          name={`licenses.${index}.issueDate`}
                          placeholder="Select Issue Year"
                          showYearPicker
                          control={control}
                          validation={{
                            required: "Issue date is required"
                          }}
                          error={(errors.licenses as any)?.[index]?.issueDate}
                          required
                        />

                        {/* <div className={styles.formGroup}>
                          <Controller
                            name={`licenses.${index}.expiryDate`}
                            control={control}
                            rules={{ required: "Expiry year is required" }}
                            render={({ field }) => (
                              <CustomSelect
                                label="Expiry Year"
                                options={yearOptions}
                                value={yearOptions.find(option => option.value === field.value) || null}
                                onChange={(selectedOption) => field.onChange(selectedOption?.value || "")}
                                placeholder="Select year"
                                isClearable
                                required
                                error={(errors.licenses as any)?.[index]?.expiryDate?.message || (errors.licenses as any)?.[index]?.expiryDate}
                              />
                            )}
                          />
                        </div> */}

                          <CustomInput
                            label="License Number"
                            name={`licenses.${index}.licenseNumber`}
                            register={register}
                            validation={{ required: "License number is required" }}
                            placeholder="Enter text"
                            error={errors.licenses?.[index]?.licenseNumber}
                            required
                          />
                      </div>

                      {licenseFields.length > 1 && (
                        // <button
                        //   type="button"
                        //   className={styles.removeCard}
                        //   onClick={() => removeLicense(index)}
                        // >
                        //   Remove License
                        // </button>
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
                            onClick={() => removeLicense(index)}
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
                    {/* </div> */}
                  </div>
                ))}
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <button type="button" className={styles.addButton} onClick={addLicense}>
                  + Add Another
                </button>
                
              </div>
            </>
          )}
        </div>

        {/* Certifications Section */}
        {/* <div className={styles.expandableSection}>
          <div 
            className={styles.sectionHeader}
            onClick={() => toggleSection('certifications')}
          >
            <h3>Certifications</h3>
            <button type="button" className={styles.toggleBtn}>
              {expandedSections.certifications ? '▼' : '▶'}
            </button>
          </div> */}
        <div className={styles.languagesSection}>
          <div className={styles.languagesHeader}>
            <h3>Certifications <span className={styles.required}>*</span></h3>
            <div
            style={{
              cursor: 'pointer',
              transform: expandedSections.certifications ? 'rotate(0deg)' : 'rotate(180deg)',
              transition: 'transform 0.2s',
              width: '22px',
              height: '22px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={() =>toggleSection('certifications')}
            >
              <svg
                width="12" height="8" viewBox="0 0 12 8" fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.59 0.296875L6 4.87687L1.41 0.296875L0 1.70687L6 7.70687L12 1.70687L10.59 0.296875Z" fill="black" fillOpacity="0.54"/>
              </svg>
            </div>
          </div>

          {expandedSections.certifications && (
            <>
              <div className={styles.nestedGrid}>
                {certificationFields.map((field, index) => (
                  <div className={styles.formSection} key={field.id}
                    style={{ position: "relative" }}>
                    <div className={`${styles.nestedRow}`}>
                      <CustomInput
                        name={`certifications.${index}.certificateTitle`}
                        register={register}
                        label="Certification Title"
                        validation={{ required: "Certification title is required" }}
                        placeholder="Enter text"
                        error={errors.certifications?.[index]?.certificateTitle}
                        required
                      />

                      <CustomInput
                        name={`certifications.${index}.issuingOrganization`}
                        register={register}
                        label="Issuing Organization"
                        validation={{ required: "Issuing organization is required" }}
                        placeholder="Enter text"
                        error={errors.certifications?.[index]?.issuingOrganization}
                        required
                      />
                      <CustomInput
                        name={`certifications.${index}.issueDate`}
                        type="date"
                        label="Issue Year"
                        control={control}
                        showYearPicker
                        required
                        validation={{ required: "Issue Year is required" }}
                        placeholder="Issue Year"
                        error={(errors.certifications as any)?.[index]?.["issueDate"]}
                      />


                        {/* <Controller
                          name={`certifications.${index}.expiryDate`}
                          control={control}
                          
                          render={({ field }) => (
                            <CustomSelect
                              label="Expiry Year"
                              options={yearOptions}
                              value={yearOptions.find(option => option.value === field.value) || null}
                              onChange={(selectedOption) => field.onChange(selectedOption?.value || "")}
                              placeholder="Select year"
                              isClearable
                               
                              error={(errors.certifications as any)?.[index]?.expiryDate?.message || (errors.certifications as any)?.[index]?.expiryDate}
                            />
                          )}
                        /> */}

                        <CustomInput
                          name={`certifications.${index}.expiryDate`}
                          type="date"
                          label="Expiry Year"
                          control={control}
                          showYearPicker
                          placeholder="Expiry Year"
                          error={(errors.certifications as any)?.[index]?.["expiryDate"]}
                        />

                        <CustomInput
                          name={`certifications.${index}.certificationId`}
                          register={register}
                          label="Certification ID"
                          placeholder="Enter certification ID" 
                        />
                    </div>

                    {certificationFields.length > 1 && (
                      // <button
                      //   type="button"
                      //   className={styles.removeCard}
                      //   onClick={() => removeCertification(index)}
                      // >
                      //   Remove Certification
                      // </button>
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
                            onClick={() => removeCertification(index)}
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
                ))}
                <div className="d-flex justify-content-center align-items-center">  
                  <button type="button" className={styles.addButton} onClick={addCertification}>
                    + Add Another
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
