import React from 'react';
import { func, bool } from 'prop-types';
import { Select } from 'antd';

import { sports, esports } from '../../../helpers/constants';

const { Option, OptGroup } = Select;

const SelectDropdown = ({ handleChange, showGeneral=false }) => {
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
          {Object.keys(esports).map(key => {
            return <Option key={key} value={esports[key]}>{esports[key]}</Option>;
          })}
        </OptGroup>
      </Select>
    </div>
  );
};

SelectDropdown.propTypes = {
  handleChange: func.isRequired,
  showGeneral: bool
};

export default SelectDropdown;