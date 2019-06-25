import * as React from 'react';
import { Select } from 'antd';

interface Props {
  handleChange: (values: string[]) => void,
  teams: any[]
};

const { Option } = Select;

function NbaSelectDropdown({ handleChange, teams }: Props) {
  return (
    <div className="select-dd">
      <Select onChange={handleChange}
        placeholder="Select teams to filter"
        mode="multiple"
        size="large"
        style={{ width: '80%' }}
        allowClear >
        {teams.map((team, i) => {
          return <Option key={i} value={team.shortName}>{team.fullName}</Option>;
        })}
      </Select>
    </div>
  );
}

export default NbaSelectDropdown;