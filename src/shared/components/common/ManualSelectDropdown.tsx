import * as React from "react";
import { Select } from "antd";

const { Option } = Select;
interface Props {
  handleChange: (value: string) => void;
  options: any[];
  values: string[];
}

function ManualSelectDropdown({ handleChange, options, values }) {
  return (
    <div className="select-dd">
      <Select
        onChange={handleChange}
        placeholder="Select teams to filter"
        mode="multiple"
        size="large"
        style={{ width: "80%" }}
        value={values}
        allowClear
      >
        {options.map((option, i) => {
          return (
            <Option key={i} value={option.name}>
              {option.name}
            </Option>
          );
        })}
      </Select>
    </div>
  );
}

export default ManualSelectDropdown;
