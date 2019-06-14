import React from 'react';
import { func, array } from 'prop-types';
import { Select } from 'antd';

const { Option, OptGroup } = Select;

EventSelectDropdown.propTypes = {
  handleChange: func.isRequired,
  events: array
};

function EventSelectDropdown({ handleChange, events }) {
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