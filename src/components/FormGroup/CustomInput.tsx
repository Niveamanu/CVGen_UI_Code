import React from 'react';
import { UseFormRegister, FieldError, Merge, FieldErrorsImpl } from 'react-hook-form';
import styles from './CustomInput.module.scss';
import CustomDatePicker from './CustomDatePicker';

export interface CustomInputProps {
  label?: string;
  name: string;
  type?: 'text' | 'email' | 'tel' | 'password' | 'number' | 'date';
  placeholder?: string;
  register: UseFormRegister<any>;
  validation?: any;
  error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  required?: boolean;
  isTextarea?: boolean;
  rows?: number;
  control?: any; // For date picker integration
}

const getErrorMessage = (error: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined): string | undefined => {
  if (!error) return undefined;
  if (typeof error === 'string') return error;
  if (typeof error === 'object' && 'message' in error) return String(error.message);
  return undefined;
};

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  name,
  type = 'text',
  placeholder,
  register,
  validation,
  error,
  required = false,
  isTextarea = false,
  rows = 3,
  control,
}) => {
  const errorMessage = getErrorMessage(error);

  // If type is date and control is provided, use CustomDatePicker
  if (type === 'date' && control) {
    return (
      <CustomDatePicker
        label={label}
        name={name}
        placeholder={placeholder || "Select date"}
        control={control}
        validation={validation}
        error={error}
        required={required}
      />
    );
  }

  const inputClassName = `${styles.input} ${errorMessage ? styles.error : ''}`;

  return (
    <div className={styles.formGroup}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      {isTextarea ? (
        <textarea
          className={inputClassName}
          placeholder={placeholder}
          rows={rows}
          {...register(name, validation)}
        />
      ) : (
        <input
          type={type}
          className={inputClassName}
          placeholder={placeholder}
          {...register(name, validation)}
        />
      )}
      {errorMessage && <span className={styles.errorText}>{errorMessage}</span>}
    </div>
  );
};

export default CustomInput;
