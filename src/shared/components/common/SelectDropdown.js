import React from 'react';
import { func, array } from 'prop-types';
import { Select } from 'antd';

const propTypes = {
  handleChange: func.isRequired,
  options: array.isRequired
};

const { Option } = Select;

function SelectDropdown({ handleChange, options }) {
  return (
    <div className="select-dd">
      <Select onChange={handleChange}
        placeholder="Select teams to filter"
        mode="multiple"
        size="large"
        style={{ width: '80%' }}
        allowClear >
        {options.map((option, i) => {
          return <Option key={i} value={option.id}>{option.name}</Option>;
        })}
      </Select>
    </div>
  );
}

SelectDropdown.propTypes = propTypes;

export default SelectDropdown;