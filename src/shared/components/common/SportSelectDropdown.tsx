import * as React from 'react';
import { Select } from 'antd';

import { sportsLeagues, esports } from '../../../helpers/constants';

const { Option, OptGroup } = Select;
interface Props {
  handleChange: (value: string) => void;
  showGeneral: boolean;
};

const SportSelectDropdown = ({ handleChange, showGeneral=false }: Props) => {
  return (
    <div className="select-dd">
      <Select onChange={handleChange}
        placeholder="Select sports to filter"
        mode="multiple"
        size="large"
        style={{ width: '80%' }}
        allowClear >
        {/* {showGeneral && 
          <OptGroup label="General">
            <Option value="Popular">Popular</Option>
          </OptGroup>
        } */}
        <OptGroup label="Sports">
          {
            sportsLeagues.map(sport => {
              return (
                <Option key={sport.abbreviation} value={sport.abbreviation}>
                  {sport.uiName}
                </Option>
              ) 
            })
          }
        </OptGroup>
        <OptGroup label="Esports">
        {
            esports.map(sport => {
              return (
                <Option key={sport.abbreviation} value={sport.abbreviation}>
                  {sport.name}
                </Option>
              ) 
            })
          }
        </OptGroup>
      </Select>
    </div>
  );
};

export default SportSelectDropdown;