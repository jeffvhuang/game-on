import React from 'react';
import { func, array, number } from 'prop-types';
import { Select } from 'antd';

import { getTournamentName } from '../../../helpers/utils';

const { Option } = Select;
const propTypes = {
  handleChange: func.isRequired,
  options: array.isRequired,
  value: number
};

function SingleTournamentSelectDropdown({ handleChange, options, value }) {
  return (
    <Select onChange={handleChange}
      placeholder="Select tournament"
      size="large"
      style={{ width: '80%' }}
      value={value} >
      {options.map((option, i) => {
        return <Option key={i} value={option.id}>{getTournamentName(option)}</Option>;
      })}
    </Select>
  );
}

SingleTournamentSelectDropdown.propTypes = propTypes;
export default SingleTournamentSelectDropdown;
