import Image from 'next/image';
import React from 'react';
import filterByIcon from '../../../../public/assets/images/filerByIcon.svg';
import Select from 'react-select';
const FilterBy = ({ selectedOption, handleChange, options, ...props }) => {
  return (
    <div className="filter_wrap">
      <Select
        {...props}
        components={{
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
        }}
        value={selectedOption}
        onChange={handleChange}
        options={options}
        placeholder={
          <div>
            <Image
              src={filterByIcon}
              width={15}
              height={15}
              layout="fixed"
              alt="filter-icon"
            />
            Filter
          </div>
        }
      />
    </div>
  );
};

export default FilterBy;
