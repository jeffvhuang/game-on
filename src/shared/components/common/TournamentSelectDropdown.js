import React from 'react';
import { func, array } from 'prop-types';
import { Select } from 'antd';

import { getTournamentName } from '../../../helpers/utils';

const propTypes = {
  handleChange: func.isRequired,
  options: array.isRequired
};

const { Option } = Select;

function TournamentSelectDropdown({ handleChange, options }) {
  return (
    <Select onChange={handleChange}
      placeholder="Select tournaments to filter"
      mode="multiple"
      size="large"
      style={{ width: '80%' }}
      allowClear >
      {options.map((option, i) => {
        return <Option key={i} value={getTournamentName(option.name)}>{getTournamentName(option.name)}</Option>;
      })}
    </Select>
  );
}

TournamentSelectDropdown.propTypes = propTypes;
export default TournamentSelectDropdown;
