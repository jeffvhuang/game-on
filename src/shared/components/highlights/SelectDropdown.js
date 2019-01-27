import React from 'react';
import { func } from 'prop-types';
import { sports, esports } from '../../../helpers/constants';
import { Select } from 'antd';

const { Option, OptGroup } = Select;

const SelectDropdown = ({ handleChange }) => {
  return (
    <div className="select-dd">
      <Select onChange={handleChange}
        placeholder="Select sports to filter"
        mode="multiple"
        size="large"
        style={{ width: '80%' }} >
        <OptGroup label="Sports">
          {Object.keys(sports).map(key => {
            return <Option key={key} value={key}>{sports[key]}</Option>;
          })}
        </OptGroup>
        <OptGroup label="E-Sports">
          {Object.keys(esports).map(key => {
            return <Option key={key} value={key}>{esports[key]}</Option>;
          })}
        </OptGroup>
      </Select>
    </div>
  );
};

SelectDropdown.propTypes = {
  handleChange: func.isRequired
};

export default SelectDropdown;