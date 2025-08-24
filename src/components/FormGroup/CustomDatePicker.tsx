import React, { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import { UseFormRegister, FieldError, Merge, FieldErrorsImpl } from 'react-hook-form';
import { Controller, Control } from 'react-hook-form';
import styles from './CustomDatePicker.module.scss';
import 'react-datepicker/dist/react-datepicker.css';

export interface CustomDatePickerProps {
  label?: string;
  name: string;
  placeholder?: string;
  control: Control<any>;
  validation?: any;
  error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  required?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  showMonthYearPicker?: boolean;
  showYearPicker?: boolean;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
}

const getErrorMessage = (error: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined): string | undefined => {
  if (!error) return undefined;
  if (typeof error === 'string') return error;
  if (typeof error === 'object' && 'message' in error) return String(error.message);
  return undefined;
};

// Custom input component for DatePicker
const CustomDateInput = forwardRef<HTMLInputElement, any>(({ value, onClick, placeholder, className, disabled }, ref) => (
  <input
    className={className}
    onClick={onClick}
    ref={ref}
    value={value}
    placeholder={placeholder}
    readOnly
    disabled={disabled}
    style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
  />
));

CustomDateInput.displayName = 'CustomDateInput';

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  label,
  name,
  placeholder = "Select date",
  control,
  validation,
  error,
  required = false,
  dateFormat = "MM/dd/yyyy",
  showTimeSelect = false,
  showMonthYearPicker = false,
  showYearPicker = false,
  minDate,
  maxDate,
  disabled = false,
}) => {
  const errorMessage = getErrorMessage(error);
  const inputClassName = `${styles.input} ${errorMessage ? styles.error : ''}`;

  return (
    <div className={styles.formGroup}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        rules={validation}
        render={({ field: { onChange, value } }) => (
          <DatePicker
            selected={value ? new Date(value) : null}
            onChange={(date: Date | null) => {
              onChange(date ? date.toISOString() : null);
            }}
            dateFormat={dateFormat}
            placeholderText={placeholder}
            showTimeSelect={showTimeSelect}
            showMonthYearPicker={showMonthYearPicker}
            showYearPicker={showYearPicker}
            minDate={minDate}
            maxDate={maxDate}
            disabled={disabled}
            customInput={
              <CustomDateInput 
                className={inputClassName}
                placeholder={placeholder}
                disabled={disabled}
              />
            }
            popperClassName={styles.datepicker}
            popperPlacement="bottom-start"
            showPopperArrow={false}
          />
        )}
      />
      {errorMessage && <span className={styles.errorText}>{errorMessage}</span>}
    </div>
  );
};

export default CustomDatePicker;
