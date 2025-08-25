import React, { forwardRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { UseFormRegister, FieldError, Merge, FieldErrorsImpl } from 'react-hook-form';
import { Controller, Control } from 'react-hook-form';
import styles from './CustomDatePicker.module.scss';
import 'react-datepicker/dist/react-datepicker.css';
import './CustomDatePicker.scss';

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
  console.log(`CustomDatePicker: ${name} - Error: ${error}`);

  const errorMessage = getErrorMessage(error);
  const inputClassName = `${styles.input} ${errorMessage ? styles.error : ''}`;
  const CustomDateInput = forwardRef<HTMLInputElement, any>(({ value, onClick, placeholder, className, disabled, ...props }, ref) => {
    return (
    <div
      className={`custom-date-input-wrapper ${disabled ? 'disabled' : ''}`}
      onClick={disabled ? undefined : onClick}
      ref={ref as any}
      tabIndex={disabled ? -1 : 0}
      style={{ position: 'relative', width: '100%' }}
      role="button"
      aria-disabled={disabled}
    >
      <input
        className={className}
        name={name}
        id={name + "--"}
        value={value}
        placeholder={placeholder}
        readOnly
        disabled={disabled}
        style={{ cursor: disabled ? 'not-allowed' : 'pointer', width: '100%' }}
        tabIndex={-1}
      />
      <span className="calendar-icon" style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
          <rect x="3" y="5" width="18" height="16" rx="4" fill="var(--bs-secondary, #fafafa)" stroke="var(--bs-primary, #FFEA88CC)" strokeWidth="1.5"/>
          <path d="M8 3v4M16 3v4" stroke="var(--bs-primary, #FFEA88CC)" strokeWidth="1.5" strokeLinecap="round"/>
          <rect x="7" y="10" width="2" height="2" rx="1" fill="var(--bs-primary, #FFEA88CC)"/>
          <rect x="11" y="10" width="2" height="2" rx="1" fill="var(--bs-primary, #FFEA88CC)"/>
          <rect x="15" y="10" width="2" height="2" rx="1" fill="var(--bs-primary, #FFEA88CC)"/>
        </svg>
      </span>
    </div>
  )});
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
        render={({ field: { onChange, value } }) => {
          // Handle value for year picker and month-year picker, and 'present' value
          let selectedDate: Date | null = null;
          let displayValue = value;
          let effectiveDateFormat = dateFormat;
          if (showYearPicker) {
            let yearNum: number | null = null;
            if (value) {
              yearNum = Number(value);
            }
            if (yearNum && !isNaN(yearNum)) {
              selectedDate = new Date(yearNum, 0, 1);
            } else {
              selectedDate = null;
            }
            effectiveDateFormat = 'yyyy';
            displayValue = yearNum ? String(yearNum) : value;
          } else if (showMonthYearPicker) {
            let dateObj: Date | null = null;
            if (value) {
              // Accept both ISO and MMM yyyy or MM yyyy
              const tryDate = new Date(value);
              if (!isNaN(tryDate.getTime())) {
                dateObj = tryDate;
              } else {
                // Try to parse MMM yyyy or MM yyyy
                const parts = String(value).split(/[\s\/-]/);
                if (parts.length === 2) {
                  let month = isNaN(Number(parts[0])) ? new Date(Date.parse(parts[0] + ' 1, 2000')).getMonth() : Number(parts[0]) - 1;
                  let year = Number(parts[1]);
                  if (!isNaN(month) && !isNaN(year)) {
                    dateObj = new Date(year, month, 1);
                  }
                }
              }
            }
            selectedDate = dateObj;
            effectiveDateFormat = 'MMM yyyy';
            if (dateObj) {
              // Display as 'Mar 2024'
              const month = dateObj.toLocaleString('default', { month: 'short' });
              const year = dateObj.getFullYear();
              displayValue = `${month} ${year}`;
            }else{
              displayValue = value;
            }
          } else if (value) {
            const parsedDate = new Date(value);
            if (!isNaN(parsedDate.getTime())) {
              selectedDate = parsedDate;
            } else {
              selectedDate = null;
            }
          }
          return (
            <DatePicker
              selected={selectedDate}
              portalId={`root-portal-${showMonthYearPicker ? 'month-year' : showYearPicker ? 'year' : 'normal'}`}
              onChange={(date: Date | null) => {
                if (showYearPicker && date) {
                  const year = date.getFullYear();
                  onChange(String(year));
                } else if (showMonthYearPicker && date) {
                  // Store as 'MMM yyyy'
                  const month = date.toLocaleString('default', { month: 'short' });
                  const year = date.getFullYear();
                  onChange(`${month} ${year}`);
                } else {
                  onChange(date ? date.toISOString() : null);
                }
              }}
              dateFormat={effectiveDateFormat}
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
                  name={name}
                  value={displayValue}
                />
              }
              popperClassName={styles.datepicker}
              popperPlacement="bottom-start"
              showPopperArrow={false}
            />
          )
        }}
      />
      {errorMessage && <span className={styles.errorText}>{errorMessage}</span>}
    </div>
  );
};

export default CustomDatePicker;
