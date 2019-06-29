import * as React from 'react';
import { Select } from 'antd';

const { Option, OptGroup } = Select;
interface Props {
  handleChange: (value: string) => void;
  events: string[];
};

function EventSelectDropdown({ handleChange, events }: Props) {
  return (
    <div className="select-dd">
      <Select onChange={handleChange}
        placeholder="Select sports to filter"
        mode="multiple"
        size="large"
        style={{ width: '80%' }}
        allowClear >
        {events.map(event => {
          return <Option key={event} value={event}>{event}</Option>;
        })}
      </Select>
    </div>
  );
}

export default EventSelectDropdown;