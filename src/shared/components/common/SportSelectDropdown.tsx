import * as React from 'react';
import { Select } from 'antd';

import { sports, esportsTitles } from '../../../helpers/constants';

const { Option, OptGroup } = Select;
interface Props {
  handleChange: (value: string) => void;
  showGeneral: boolean;
};

const SportSelectDropdown = ({ handleChange, showGeneral=false }: Props) => {
  return (
    <div className="select-dd">
      <Select onChange={handleChange}
        placeholder="Select sports to filter"
        mode="multiple"
        size="large"
        style={{ width: '80%' }}
        allowClear >
        {showGeneral && 
          <OptGroup label="General">
            <Option value="Popular">Popular</Option>
          </OptGroup>
        }
        <OptGroup label="Sports">
          {Object.keys(sports).map(key => {
            return <Option key={key} value={sports[key]}>{sports[key]}</Option>;
          })}
        </OptGroup>
        <OptGroup label="E-Sports">
          {Object.keys(esportsTitles).map(key => {
            return <Option key={key} value={esportsTitles[key]}>{esportsTitles[key]}</Option>;
          })}
        </OptGroup>
      </Select>
    </div>
  );
};

export default SportSelectDropdown;