import * as React from 'react';
import { Select } from 'antd';

import { getTournamentName } from '../../../helpers/utils';
import { ESportsTournament } from '../../../types/esports-api/esports-tournament.model';

const { Option } = Select;
interface Props {
  handleChange: (value: string) => void,
  options: ESportsTournament[]
};

function TournamentSelectDropdown({ handleChange, options }: Props) {
  return (
    <Select onChange={handleChange}
      placeholder="Select tournaments to filter"
      mode="multiple"
      size="large"
      style={{ width: '80%' }}
      allowClear >
      {options.map((option) => {
        return <Option key={option.id} value={getTournamentName(option) + ' ' + option.id}>{getTournamentName(option)}</Option>;
      })}
    </Select>
  );
}

export default TournamentSelectDropdown;
