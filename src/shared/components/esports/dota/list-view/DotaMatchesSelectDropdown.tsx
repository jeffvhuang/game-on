import * as React from 'react';
import { Select } from 'antd';

const { Option } = Select;
interface Props {
  handleChange: (value: string) => void,
  options: any[]
};

function DotaMatchesSelectDropdown({ handleChange, options }: Props) {
  return (
    <div className="select-dd">
      <Select onChange={handleChange}
        placeholder="Select teams to filter"
        mode="multiple"
        size="large"
        style={{ width: '80%' }}
        allowClear >
        {options.map((option, i) => {
          return <Option key={i} value={option.name}>{option.league.name}</Option>;
        })}
      </Select>
    </div>
  );
}

export default DotaMatchesSelectDropdown;