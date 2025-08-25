import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import styles from "./CVForms.module.scss";
import { IBaseFormProps } from "./types";
import { CustomSelect, CustomInput } from "../FormGroup";
import { yearOptionsFom1950Plus10Years as yearOptions } from "../FormGroup/selectOptions";
import { CommonService } from "../../api/services/common";
import { useApiClient } from "../../hooks/useApiClient";

interface SiteData {
  Email: string;
  Site: string;
  CtmssiteName: string;
  Phone1: string;
  Phone2: string;
  Phone3: string;
  Address1: string;
  Address2: string;
  City: string;
  State: string;
  ZipCode: number;
}

interface SitesResponse {
  sites: SiteData[];
  total_sites: number;
  status: string;
  message: string;
}

export default function ResearchAffiliationsForm({
  defaultValues,
  onSubmit,
  isNextClick,
  setIsNextClick,
  onChange
}: IBaseFormProps) {
  const { store } = useApiClient();
  const [siteNameOptions, setSiteNameOptions] = useState<Array<{value: string, label: string}>>([
    { value: "", label: "Select institution" }
  ]);
  const [isLoadingSites, setIsLoadingSites] = useState(true);
  
  // Fetch sites from API
  useEffect(() => {
    const fetchSites = async () => {
      try {
        setIsLoadingSites(true);
        const commonService = new CommonService(store);
        const response = await commonService.getSites();
        
        if (response && response.data && (response.data as SitesResponse).sites) {
          const sitesData = response.data as SitesResponse;
          const options = [
            { value: "", label: "Select institution" },
            ...sitesData.sites.map((site: SiteData) => ({
              value: site.Site,
              label: site.Site
            }))
          ];
          setSiteNameOptions(options);
        }
      } catch (error) {
        console.error("Failed to fetch sites:", error);
        // Fallback to default option if API fails
        setSiteNameOptions([{ value: "", label: "Select institution" }]);
      } finally {
        setIsLoadingSites(false);
      }
    };

    fetchSites();
  }, [store]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm({
    defaultValues: {
      affiliations:
        defaultValues("Research Affiliations").length > 0
          ? defaultValues("Research Affiliations")
          : [
              {
                "institutionName": "",
                "position": "",
                "start": "",
                "end": "",
              },
            ],
    },
    mode: "onChange",
  });
  const watchedValues = useWatch({ control });
  useEffect(() => {
    if (onChange) onChange(watchedValues.affiliations, "Research Affiliations");
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
    if (isNextClick) {
      setIsNextClick(false);
      // Trigger validation for all fields before submitting
              trigger().then((isValid) => {
          if (isValid) {
            handleSubmit((data) => {
              // Transform the data to match the expected format
              const transformedData = data.affiliations.map((affiliation: any) => ({
                "institutionName": affiliation.institutionName,
                "position": affiliation.position,
                "start": affiliation.start,
                "end": affiliation.end,
              }));
              onSubmit(transformedData, "Research Affiliations");
            })();
          }
        });
    }
  }, [isNextClick, handleSubmit, onSubmit, setIsNextClick, trigger]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "affiliations",
  });

  const addAffiliation = () => {
    append({
      institutionName: "",
      researchArea: "",
      position: "",
      start: "",
      end: "",
      projectTitle: "",
      address: "",
      city: "",
      state: "",
    });
  };

  return (
    <div className={styles.formSection}>
      <h2 className={styles.sectionTitle}>Research Affiliations</h2>
      <form>
        {fields.map((field, index) => (
          <div key={field.id} className={styles.affiliationCard}
          data-error-path={`affiliations.${index}`} >
            <div className={styles.formGrid}>
              <Controller
                name={`affiliations.${index}.institutionName`}
                control={control}
                rules={{ required: "Institution name is required" }}
                render={({ field }) => (
                  <CustomSelect
                    label="Institution Name"
                    options={siteNameOptions}
                    value={siteNameOptions.find(option => option.value === field.value) || null}
                    onChange={(selectedOption) => field.onChange(selectedOption?.value || "")}
                    placeholder={isLoadingSites ? "Loading institutions..." : "Select institution"}
                    isClearable
                    required
                    error={(errors.affiliations as any)?.[index]?.institutionName?.message || (errors.affiliations as any)?.[index]?.institutionName}
                  />
                )}
              />

              {/* <CustomInput
                label="Research Area / Focus"
                name={`affiliations.${index}.Research Area / Focus`}
                placeholder="Enter text"
                register={register}
                validation={{
                  required: "Research area is required",
                }}
                error={(errors.affiliations as any)?.[index]?.["Research Area / Focus"]}
                required
              /> */}

              <CustomInput
                label="Position / Role"
                name={`affiliations.${index}.position`}
                placeholder="Enter text"
                register={register}
                validation={{
                  required: "Position is required",
                }}
                error={(errors.affiliations as any)?.[index]?.position}
                required
              />

              {/* <div className={styles.formGroup}>
                <Controller
                  name={`affiliations.${index}.start`}
                  control={control}
                  rules={{ required: "Start date is required" }}
                  render={({ field }) => (
                    <CustomSelect
                      label="Start"
                      options={yearOptions}
                      value={yearOptions.find(option => option.value === field.value) || null}
                      onChange={(selectedOption) => field.onChange(selectedOption?.value || "")}
                      placeholder="Select year"
                      isClearable
                      required
                      error={(errors.affiliations as any)?.[index]?.start?.message || (errors.affiliations as any)?.[index]?.start}
                    />
                  )}
                />
              </div> */}
              <CustomInput
                label="Start"
                type="date"
                name={`affiliations.${index}.start`}
                placeholder="Select Start Year"
                showYearPicker
                control={control}
                validation={{
                  required: "Start date is required"
                }}
                error={(errors.affiliations as any)?.[index]?.start}
                required
              />

              {/* <div className={styles.formGroup}>
                <Controller
                  name={`affiliations.${index}.end`}
                  control={control}
                  rules={{ required: "End date is required" }}
                  render={({ field }) => (
                    <CustomSelect
                      label="End"
                      options={yearOptions}
                      value={yearOptions.find(option => option.value === field.value) || null}
                      onChange={(selectedOption) => field.onChange(selectedOption?.value || "")}
                      placeholder="Select year"
                      isClearable
                      required
                      error={(errors.affiliations as any)?.[index]?.end?.message || (errors.affiliations as any)?.[index]?.end}
                    />
                  )}
                />
              </div> */}
              <CustomInput
                label="End"
                type="date"
                name={`affiliations.${index}.end`}
                placeholder="Select End Year"
                showYearPicker
                control={control}
                validation={{
                  required: "End date is required"
                }}
                error={(errors.affiliations as any)?.[index]?.end}
                required
              />

              {/* <div
                className={styles.formGroup}
                style={{ gridColumn: "1 / -1" }}
              >
                <label>Project Title / Description</label>
                <textarea
                  placeholder="Lorem ipsum"
                  {...register(
                    `affiliations.${index}.Project Title / Description`
                  )}
                  rows={4}
                />
              </div>

              <div
                className={styles.formGroup}
                style={{ gridColumn: "1 / -1" }}
              >
                <label>Address</label>
                <textarea
                  placeholder="Lorem ipsum"
                  {...register(`affiliations.${index}.Address`)}
                  rows={3}
                />
              </div>

              <div className={styles.formGroup}>
                <label>City</label>
                <CustomInput
                  register={register}
                  name={`affiliations.${index}.City`}
                  placeholder="Enter Text"
                />
              </div>

              <div className={styles.formGroup}>
                <label>State</label>
                <CustomInput
                  register={register}
                  name={`affiliations.${index}.State`}
                  placeholder="Enter Text"
                />
              </div> */}
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
          <button
            type="button"
            className={styles.addButton}
            onClick={addAffiliation}
          >
            + Add Another
          </button>
          
        </div>
      </form>
    </div>
  );
}
