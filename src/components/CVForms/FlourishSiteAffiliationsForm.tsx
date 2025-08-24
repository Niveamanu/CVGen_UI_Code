import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import styles from "./CVForms.module.scss";
import { IBaseFormProps } from "./types";
import { CustomInput, CustomSelect } from "../FormGroup";
import { countryOptions } from "../FormGroup/selectOptions";
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
 
export default function FlourishSiteAffiliationsForm({
  defaultValues,
  onSubmit,
  isNextClick,
  setIsNextClick,
  onChange
}: IBaseFormProps) {
  const { store } = useApiClient();
  const [siteNameOptions, setSiteNameOptions] = useState<Array<{value: string, label: string}>>([
  ]);
  const [sitesData, setSitesData] = useState<SiteData[]>([]);
  const [isLoadingSites, setIsLoadingSites] = useState(true);
  // Fetch sites from API
  useEffect(() => {
    const fetchSites = async () => {
      try {
        setIsLoadingSites(true);
        const commonService = new CommonService(store);
        const response = await commonService.getSites();
       
        if (response && response.data && (response.data as SitesResponse).sites) {
          const sitesResponse = response.data as SitesResponse;
          setSitesData(sitesResponse.sites);
          const options = [
            ...sitesResponse.sites.map((site: SiteData) => ({
              value: site.Site,
              label: site.Site
            }))
          ];
          setSiteNameOptions(options);
        }
      } catch (error) {
        console.error("Failed to fetch sites:", error);
        // Fallback to default option if API fails
        setSiteNameOptions([{ value: "", label: "Select site name" }]);
      } finally {
        setIsLoadingSites(false);
      }
    };
    if(sitesData.length <= 0){
      fetchSites();
    }
  }, [store, sitesData]);
 
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    setValue,
  } = useForm({
    defaultValues: {
      affiliations: [
        ...(defaultValues?.("Flourish Site Affiliations").length > 0 ? defaultValues?.("Flourish Site Affiliations") : [{
          "Site Name": "",
          "CTMS Site Name": "",
          "Site Address": "",
          "City": "",
          "State": "",
          "Zipcode": "",
          "Country": "",
          "Description of Affiliation": "",
        }]),
      ],
    },
    mode: "onBlur",
    reValidateMode: "onChange",
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
          // Try data-name first (for CustomSelect), fallback to name
          let el = document.querySelector(`[data-name='${firstErrorName}']`);
          if (!el) {
            el = document.querySelector(`[name='${firstErrorName}']`);
          }
          if (el && typeof (el as HTMLElement).scrollIntoView === 'function') {
            (el as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'center' });
            if (typeof (el as HTMLElement).focus === 'function') (el as HTMLElement).focus();
          }
        }
      }
    }, [errors, isNextClick]);

  const watchedValues = useWatch({ control });
  useEffect(() => {
    if (onChange) onChange(watchedValues.affiliations as any, "Flourish Site Affiliations");
  }, [watchedValues]);
  
  useEffect(() => {
    const formContent = document.getElementById("cv-form-content");
    if (formContent) {
      formContent.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);
 
  useEffect(() => {
    const formContent = document.getElementById("cv-form-content");
    if (formContent) {
      formContent.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);
 
  const { fields, append, remove } = useFieldArray({
    control,
    name: "affiliations",
  });
 
  // Function to auto-populate fields when a site is selected
  const handleSiteSelection = (selectedSiteName: string, index: number) => {
    if (!selectedSiteName || selectedSiteName === "") {
      // Clear fields if no site is selected
      setValue(`affiliations.${index}.CTMS Site Name`, "");
      setValue(`affiliations.${index}.Site Address`, "");
      setValue(`affiliations.${index}.City`, "");
      setValue(`affiliations.${index}.State`, "");
      setValue(`affiliations.${index}.Zipcode`, "");
      return;
    }
 
    // Find the selected site data
    const selectedSite = sitesData.find(site => site.Site === selectedSiteName);
   
    if (selectedSite) {
      // Auto-populate the fields
      setValue(`affiliations.${index}.CTMS Site Name`, selectedSite.CtmssiteName);
     
      // Combine Address1 and Address2 for the Site Address field
      const combinedAddress = selectedSite.Address2 && selectedSite.Address2.trim()
        ? `${selectedSite.Address1}, ${selectedSite.Address2}`
        : selectedSite.Address1;
     
      setValue(`affiliations.${index}.Site Address`, combinedAddress);
      setValue(`affiliations.${index}.City`, selectedSite.City);
      setValue(`affiliations.${index}.State`, selectedSite.State);
      setValue(`affiliations.${index}.Zipcode`, selectedSite.ZipCode.toString());
    }
  };
 
  useEffect(() => {
    if (isNextClick) {
      setIsNextClick(false);
      // Trigger validation for all fields before submitting
      trigger().then((isValid) => {
        if (isValid) {
          handleSubmit((data) => onSubmit(data.affiliations, "Flourish Site Affiliations"))();
        } else {
          // Force validation display for all site name fields
          fields.forEach((_, index) => {
            trigger(`affiliations.${index}.Site Name`);
          });
        }
      });
    }
  }, [isNextClick, handleSubmit, onSubmit, setIsNextClick, trigger, fields]);
 
  const addAffiliation = () => {
    append({
      "Site Name": "",
      "CTMS Site Name": "",
      "Site Address": "",
      "City": "",
      "State": "",
      "Zipcode": "",
      "Country": "",
      "Description of Affiliation": "",
    });
  };
 
  return (
    <div className={styles.formSection}>
      <h2 className={styles.sectionTitle}>Flourish Site Affiliations</h2>
 
      <form>
        {fields.map((field, index) => (
          <div key={field.id} className={styles.affiliationCard}>
            <div className={styles.formGrid}>
              <Controller
                name={`affiliations.${index}.Site Name`}
                control={control}
                rules={{
                  required: "Site name is required"
                }}
                render={({ field, fieldState, formState }) => {
                  return (
                  <CustomSelect
                    {...field}
                    name={`affiliations.${index}.Site Name`}
                    label="Site Name"
                    options={siteNameOptions && siteNameOptions.length > 0 ? siteNameOptions : [{ value: formState.defaultValues?.affiliations?.[index]?.["Site Name"], label: formState.defaultValues?.affiliations?.[index]?.["Site Name"] || "No sites available" }, { value: "ASDASADS", label: "ASDASADS" }]}
                    isDisabled={isLoadingSites}
                    isClearable
                    isSearchable
                    required
                    error={fieldState.error?.message || (errors.affiliations as any)?.[index]?.["Site Name"]?.message}
                    placeholder={isLoadingSites ? "Loading sites..." : "Select site name"}
                    onChange={(selectedOption) => {
                      // Extract only the value (site name string) for storage
                      const selectedValue = selectedOption ? (Array.isArray(selectedOption) ? selectedOption[0]?.value : selectedOption.value) : "";
                     
                      // Store only the value in the form
                      field.onChange(selectedValue);
                     
                      // Auto-populate other fields based on selection
                      handleSiteSelection(selectedValue, index);
                    }}
                  />
                )}}
              />
 
              <CustomInput
                name={`affiliations.${index}.CTMS Site Name`}
                register={register}
                validation={{ required: "CTMS site name is required" }}
                label="CTMS Site Name"
                placeholder="Enter Text"
                required={true}
                error={(errors.affiliations as any)?.[index]?.["CTMS Site Name"]?.message}
              />
 
              <div style={{ gridColumn: "1 / -1" }}>
                <CustomInput
                  name={`affiliations.${index}.Site Address`}
                  register={register}
                  label="Site Address"
                  placeholder="Enter Text"
                  isTextarea={true}
                  rows={3}
                />
              </div>
 
              <CustomInput
                name={`affiliations.${index}.City`}
                register={register}
                validation={{ required: "City is required" }}
                label="City"
                placeholder="Enter Text"
                required={true}
                error={(errors.affiliations as any)?.[index]?.City?.message}
              />
 
              <CustomInput
                name={`affiliations.${index}.State`}
                register={register}
                validation={{ required: "State is required" }}
                label="State"
                placeholder="Enter Text"
                required={true}
                error={(errors.affiliations as any)?.[index]?.State?.message}
              />
 
              <CustomInput
                name={`affiliations.${index}.Zipcode`}
                register={register}
                label="Zipcode"
                placeholder="Enter Text"
              />
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