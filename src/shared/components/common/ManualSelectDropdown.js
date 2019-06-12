import React from 'react';
import { func, array } from 'prop-types';
import { Select } from 'antd';

const propTypes = {
  handleChange: func.isRequired,
  options: array.isRequired,
  values: array
};

const { Option } = Select;

function ManualSelectDropdown({ handleChange, options, values }) {
  return (
    <Select onChange={handleChange}
      placeholder="Select teams to filter"
      mode="multiple"
      size="large"
      style={{ width: '80%' }}
      value={values}
      allowClear >
      {options.map((option, i) => {
        return <Option key={i} value={option.name}>{option.name}</Option>;
      })}
    </Select>
  );
}

ManualSelectDropdown.propTypes = propTypes;
export default ManualSelectDropdown;