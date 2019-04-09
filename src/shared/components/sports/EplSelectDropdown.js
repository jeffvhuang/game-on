import React from 'react';
import { func, array } from 'prop-types';
import { Select } from 'antd';

const propTypes = {
  handleChange: func.isRequired,
  teams: array.isRequired
};

const { Option } = Select;

function EplSelectDropdown({ handleChange, teams }) {
  return (
    <div className="select-dd">
      <Select onChange={handleChange}
        placeholder="Select teams to filter"
        mode="multiple"
        size="large"
        style={{ width: '80%' }}
        allowClear >
        {teams.map((team, i) => {
          return <Option key={i} value={team.name}>{team.name}</Option>;
        })}
      </Select>
    </div>
  );
}

EplSelectDropdown.propTypes = propTypes;

export default EplSelectDropdown;