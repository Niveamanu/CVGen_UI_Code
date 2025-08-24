import React, { useEffect } from "react";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import styles from "./CVForms.module.scss";
import { IBaseFormProps } from "./types";
import { CustomInput, CustomSelect } from "../FormGroup";
import { yearOptions } from "../FormGroup/selectOptions";

export default function AchievementsAwardsForm({
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
  } = useForm({
    defaultValues: {
      achievements: defaultValues("Achievements or Awards").length > 0 ? defaultValues("Achievements or Awards") : [
        {
          "Award / Achievement Name": "",
          "Awarding Organization/Institution": "",
          "Awarded / Achieved Month": "",
          "Awarded / Achieved Year": "",
          "Description / Details": "",
        },
      ],
      mode: "onChange",
    },
  });


  const watchedValues = useWatch({ control });
  useEffect(() => {
    if (onChange) onChange(watchedValues.achievements, "Achievements or Awards");
  }, [watchedValues]);

  useEffect(() => {
    const formContent = document.getElementById("cv-form-content");
    if (formContent) {
      formContent.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    if (isNextClick) {
      console.log("AchievementsAwardsForm - Next button clicked, submitting form...");
      setIsNextClick(false);
      handleSubmit((data) => onSubmit(data, "Achievements or Awards"))();
    }
  }, [isNextClick, handleSubmit, onSubmit, setIsNextClick]);

  // Debug: Log default values to see what's being received
  useEffect(() => {
    console.log("AchievementsAwardsForm - defaultValues received:", defaultValues);
    console.log("AchievementsAwardsForm - Achievements or Awards data:", defaultValues("Achievements or Awards"));
  }, [defaultValues]);

  // Debug: Log errors to see what's happening
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.log("Form validation errors:", errors);
      console.log("Achievements errors:", errors.achievements);
    }
  }, [errors]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "achievements",
  });

  const addAchievement = () => {
    append({
      "Award / Achievement Name": "",
      "Awarding Organization/Institution": "",
      "Awarded / Achieved Month": "",
      "Awarded / Achieved Year": "",
      "Description / Details": "",
    });
  };

  return (
    <div className={styles.formSection}>
      <h2 className={styles.sectionTitle}>Achievements or Awards</h2>
      
      <form onSubmit={(e) => {
        e.preventDefault();
        console.log("Form submit event triggered");
        console.log("Current form data:", fields);
        console.log("Form errors:", errors);
        console.log("Achievements errors:", errors.achievements);
      }}>
        {fields.map((field, index) => (
          <div key={field.id} className={styles.affiliationCard}>
            <div className={styles.formGrid}>

                <CustomInput
                  name={`achievements.${index}.Award / Achievement Name`}
                  register={register}
                  label="Award / Achievement Name"
                  required
                  validation={{ required: "Award name is required" }}
                  placeholder="Enter text"
                  error={(errors.achievements as any)?.[index]?.["Award / Achievement Name"]?.message || (errors.achievements as any)?.[index]?.["Award / Achievement Name"]}
                />

                <CustomInput
                  name={`achievements.${index}.Awarding Organization/Institution`}
                  register={register}
                  label="Awarding Organization/Institution"
                  placeholder="Enter text"
                />

                <CustomInput
                  name={`achievements.${index}.Awarded / Achieved Month`}
                  register={register}
                  label="Awarded / Achieved Month"
                  placeholder="e.g., January, February, etc."
                />

                <CustomInput
                  name={`achievements.${index}.Awarded / Achieved Year`}
                  register={register}
                  label="Awarded / Achieved Year"
                  placeholder="e.g., 2023, 2024, etc."
                />

              <div style={{ gridColumn: "1 / -1" }}>
                <CustomInput
                  name={`achievements.${index}.Description / Details`}
                  register={register}
                  label="Description / Details"
                  placeholder="Enter text"
                  isTextarea={true}
                  rows={4}
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
                Remove Membership
              </button>
            )}
          </div>
        ))}

        <div className="d-flex justify-content-center align-items-center">
          <button type="button" className={styles.addButton} onClick={addAchievement}>
            + Add Another
          </button>
           
          {/* <button
            type="button"
            onClick={() => {
              console.log("Testing Award Name validation...");
              trigger("achievements.0.Award / Achievement Name").then((isValid) => {
                console.log("Award Name validation result:", isValid);
                console.log("Award Name errors:", (errors.achievements as any)?.[0]?.["Award / Achievement Name"]);
              });
            }}
            style={{ marginLeft: '10px', padding: '8px 16px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}
          >
            Test Award Name Only
          </button> */}
        </div>
      </form>
    </div>
  );
}
