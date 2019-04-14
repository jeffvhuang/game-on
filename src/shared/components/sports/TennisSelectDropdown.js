import React from 'react';
import { func, array } from 'prop-types';
import { Select } from 'antd';

const propTypes = {
  handleChange: func.isRequired
};

const { Option } = Select;
const tournamentTypes = [
  { name: 'Grand Slam', value: 'grand_slam' },
  { name: 'ATP 1000', value: 'atp_1000' },
  { name: 'ATP 500', value: 'atp_500' },
  { name: 'ATP 250', value: 'atp_250' },
  { name: 'WTA Premier', value: 'wta_premier' },
  { name: 'WTA International', value: 'wta_international' },
  { name: 'Mixed', value: 'mixed' }
];

function TennisSelectDropdown({ handleChange }) {
  return (
    <div className="select-dd">
      <Select onChange={handleChange}
        placeholder="Select teams to filter"
        mode="multiple"
        size="large"
        style={{ width: '80%' }}
        allowClear >
        {tournamentTypes.map((t, i) => {
          return <Option key={i} value={t.value}>{t.name}</Option>;
        })}
      </Select>
    </div>
  );
}

TennisSelectDropdown.propTypes = propTypes;

export default TennisSelectDropdown;