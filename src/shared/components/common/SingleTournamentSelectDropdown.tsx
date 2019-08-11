import * as React from 'react';
import { Select } from 'antd';

import { getTournamentName } from '../../../helpers/utils';
import { ESportsTournament } from '../../../types/esports-api/esports-tournament.model';

const { Option } = Select;
interface Props {
  handleChange: (value: string) => void,
  options: ESportsTournament[],
  value: string
};

function SingleTournamentSelectDropdown({ handleChange, options, value }: Props) {
  return (
    <Select onChange={handleChange}
      placeholder="Select tournament"
      size="large"
      style={{ width: '80%' }}
      value={value} >
      {options.map((option, i) => {
        return <Option key={i} value={option.id.toString()}>{getTournamentName(option)}</Option>;
      })}
    </Select>
  );
}

export default SingleTournamentSelectDropdown;
