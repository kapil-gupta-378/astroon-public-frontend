import React from 'react';
import Select from 'react-select';
const FormSelect = ({ selectedOption, handleChange, options, label }) => {
  return (
    <div className="form_select_wrap">
      <label>{label}</label>
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={options}
      />
    </div>
  );
};

export default FormSelect;
