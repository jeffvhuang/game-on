import * as React from 'react';
import { Select } from 'antd';

interface Props {
  handleChange: (values: string[]) => void;
  options: any[]
};

const { Option } = Select;

function SelectDropdown({ handleChange, options }: Props) {
  return (
    <Select onChange={handleChange}
      placeholder="Select teams to filter"
      mode="multiple"
      size="large"
      style={{ width: '80%' }}
      allowClear >
      {options.map((option, i) => {
        return <Option key={i} value={option.name}>{option.name}</Option>;
      })}
    </Select>
  );
}

export default SelectDropdown;