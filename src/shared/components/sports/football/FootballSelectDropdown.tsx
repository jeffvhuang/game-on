import * as React from 'react';
import { Select } from 'antd';
import { FootballTeam } from '../../../../types/football-api/football-team.model';

const { Option } = Select;
interface Props {
  handleChange: (values: string[]) => void;
  teams: FootballTeam[];
};

function FootballSelectDropdown({ handleChange, teams } : Props) {
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

export default FootballSelectDropdown;