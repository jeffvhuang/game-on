import React from 'react';
import { func, array } from 'prop-types';
import { Select } from 'antd';

const propTypes = {
  handleChange: func.isRequired,
  teams: array.isRequired
};

const { Option } = Select;

function TeamSelectDropdown({ handleChange, teams }) {
  return (
    <div className="select-dd">
      <Select onChange={handleChange}
        placeholder="Select teams to filter"
        mode="multiple"
        size="large"
        style={{ width: '80%' }}
        allowClear >
        {teams.map(team => {
          return <Option key={team.shortName} value={team.shortName}>{team.fullName}</Option>;
        })}
      </Select>
    </div>
  );
}

TeamSelectDropdown.propTypes = propTypes;

export default TeamSelectDropdown;