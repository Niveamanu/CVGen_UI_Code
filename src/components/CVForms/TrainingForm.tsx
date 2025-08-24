import React, { useEffect } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import styles from "./CVForms.module.scss";
import { IBaseFormProps } from "./types";
import { CustomInput } from "../FormGroup";

export default function TrainingForm({
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
      training: defaultValues("Training").length > 0 ? defaultValues("Training") : [
        {
          "Training Program / Course Name": "",
          "Institution / Provider": "",
          "Duration / Dates": "",
          "Certification / Qualification": "",
          "Description / Details": "",
          "Start": "",
        },
      ],
    },
  });

  useEffect(() => {
    const formContent = document.getElementById("cv-form-content");
    if (formContent) {
      formContent.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  const watchedValues = useWatch({ control });
  useEffect(() => {
    if (onChange) onChange(watchedValues.training, "Training");
  }, [watchedValues]);

  useEffect(() => {
    if (isNextClick) {
      setIsNextClick(false);
      handleSubmit((data) => onSubmit(data.training, "Training"))();
    }
  }, [isNextClick, handleSubmit, onSubmit, setIsNextClick]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "training",
  });

  const addTraining = () => {
    append({
      "Training Program / Course Name": "",
      "Institution / Provider": "",
      "Duration / Dates": "",
      "Certification / Qualification": "",
      "Description / Details": "",
      "Start": "",
    });
  };

  return (
    <div className={styles.formSection}>
      <h2 className={styles.sectionTitle}>Training</h2>
      
      <form>
        {fields.map((field, index) => (
          <div key={field.id} className={styles.affiliationCard}>
            <div className={styles.formGrid}>
                <CustomInput
                  name={`training.${index}.Training Program / Course Name`}
                  register={register}
                  label={"Training Program / Course Name"}
                  required
                  validation={{ required: "Training program name is required" }}
                  placeholder="Enter text"
                  error={(errors.training as any)?.[index]?.["Training Program / Course Name"]}
                />


                <CustomInput
                  name={`training.${index}.Institution / Provider`}
                  register={register}
                  label={"Institution / Provider"}
                  required
                  validation={{ required: "Institution is required" }}
                  placeholder="Enter text"
                  error={(errors.training as any)?.[index]?.["Institution / Provider"]}
                />

                <CustomInput
                  name={`training.${index}.Start`}
                  register={register}
                  label={"Start"}
                  required
                  validation={{ required: "Duration is required" }}
                  placeholder="Select year and month"
                  error={(errors.training as any)?.[index]?.["Start"]}
                />

                
                {/* <CustomInput
                  name={`training.${index}.Certification / Qualification`}
                  register={register}
                  label={"Certification / Qualification"}
                  required
                  placeholder="Enter text"
                />

                <CustomInput
                  name={`training.${index}.Description / Details`}
                  register={register}
                  validation={{ required: "Description is required" }}
                  placeholder="Enter text"
                  isTextarea={true}
                  label={"Description / Details"}
                  required
                  rows={4}
                  error={(errors.training as any)?.[index]?.["Description / Details"]}
                /> */}
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

        <button type="button" className={styles.addButton} onClick={addTraining}>
          + Add Another
        </button>
      </form>
    </div>
  );
}
