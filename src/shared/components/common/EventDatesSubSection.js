import React from 'react';
import { Row, Col } from 'antd';
import { string, array } from 'prop-types';

EventDatesSubSection.propTypes = {
  header: string,
  events: array
};

function EventDatesSubSection({ header, events }) {
  return (
    <div className="margin-bot">
      <h2>{header}</h2>
      {events.map((event, i) => {
        return (
          <Row key={i}>
            <Col span={16}>{event.name}</Col>
            <Col span={8}>{event.startDate} --> {event.endDate}</Col>
          </Row>
        );
      })}
    </div>
  );
}

export default EventDatesSubSection;