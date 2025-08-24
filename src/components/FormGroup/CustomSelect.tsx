import React from 'react';
import Select, { MultiValue, SingleValue } from 'react-select';
import styles from './CustomSelect.module.scss';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  label?: string;
  required?: boolean;
  error?: string;
  options: Option[];
  placeholder?: string;
  isMulti?: boolean;
  className?: string;
  value?: Option | Option[] | null;
  onChange?: (value: any) => void;
  name?: string;
  isDisabled?: boolean;
  isClearable?: boolean;
  isSearchable?: boolean;
  noOptionsMessage?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  required = false,
  error,
  options,
  placeholder = "Select option",
  isMulti = false,
  className,
  value,
  onChange,
  isSearchable = true,
  noOptionsMessage = "No options available",
  ...selectProps
}) => {
  const getSelectedValue = () => {
    if (!value) return null;
    
    if (typeof value === 'string') {
      return options.find(option => option.value === value) || null;
    }
    
    return value;
  };

  const handleChange = (selectedOption: MultiValue<Option> | SingleValue<Option>) => {
    if (onChange) {
      onChange(selectedOption)
    }
  };

  return (
    <div className={`${styles.formGroup} ${className || ''}`}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      {/* Hidden input for scroll-to-error support */}
      {selectProps.name && (
        <input
          type="text"
          name={selectProps.name}
          style={{
            "width": "0px",
            "height": "0px",
            "opacity": 0,
            "position": "absolute",
          }}
        />
      )}
      <Select
        options={options}
        value={getSelectedValue()}
        onChange={handleChange}
        isMulti={isMulti}
        isSearchable={isSearchable}
        placeholder={placeholder}
        noOptionsMessage={() => noOptionsMessage}
        className={error ? styles.error : ''}
        classNamePrefix="react-select"
        menuPortalTarget={document.body}
        styles={{
          control: (provided, state) => ({
            ...provided,
            borderColor: error ? '#dc3545' : state.isFocused ? '#dee2e6' : '#dee2e6',
            boxShadow: 'none',
            '&:hover': {
              borderColor: error ? '#dc3545' : '#ffea88'
            },
            cursor: 'pointer'
          }),
          singleValue: (provided) => ({
            ...provided,
            fontWeight: '200',
            color: '#343a40'
          }),
          input: (provided) => ({
            ...provided,
            caretColor: getSelectedValue() && !isMulti ? 'transparent' : '#ffea88',
            color: getSelectedValue() && !isMulti ? 'transparent' : '#343a40',
            boxShadow: 'none',
          }),
          valueContainer: (provided) => ({
            ...provided,
            cursor: getSelectedValue() && !isMulti ? 'pointer' : 'text'
          }),
          placeholder: (provided) => ({
            ...provided,
            color: '#6c757d',
            fontStyle: 'italic'
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected 
              ? '#ffea88' 
              : state.isFocused 
                ? '#f8f9fa' 
                : 'white',
            color: '#343a40',
            cursor: 'pointer',
            '&:active': {
              backgroundColor: '#ffea88'
            }
          }),
          menu: (provided) => ({
            ...provided,
            zIndex: 9999,
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            border: '1px solid #dee2e6'
          }),
          menuPortal: (provided) => ({
            ...provided,
            zIndex: 9999
          }),
          dropdownIndicator: (provided, state) => ({
            ...provided,
            color: state.isFocused ? '#ffea88' : '#6c757d',
            '&:hover': {
              color: '#ffea88'
            }
          }),
          clearIndicator: (provided) => ({
            ...provided,
            color: '#6c757d',
            '&:hover': {
              color: '#dc3545'
            }
          }),
          multiValue: (provided) => ({
            ...provided,
            backgroundColor: '#f8f9fa',
            border: '1px solid #dee2e6'
          }),
          multiValueLabel: (provided) => ({
            ...provided,
            color: '#343a40',
            fontWeight: '200'
          }),
          multiValueRemove: (provided) => ({
            ...provided,
            color: '#6c757d',
            '&:hover': {
              backgroundColor: '#dc3545',
              color: 'white'
            }
          })
        }}
        {...selectProps}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};

export default CustomSelect;
