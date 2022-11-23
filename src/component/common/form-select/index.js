import React from 'react';
import Select from 'react-select';
const FormSelect = ({
  selectedOption,
  handleChange,
  options,
  label,
  titleBackground,
}) => {
  return (
    <div className="form_select_wrap">
      <label
        style={{
          background: titleBackground,
          lineHeight: '17px',
          padding: '0px 20px 0px 10px',
        }}
      >
        {label}
      </label>
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={options}
      />
    </div>
  );
};

FormSelect.defaultProps = {
  titleBackground: '#05052d',
};

export default FormSelect;
