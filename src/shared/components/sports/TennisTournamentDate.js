import React from 'react';
import { Row, Col } from 'antd';
import { object } from 'prop-types';

import { months, days } from '../../../helpers/constants';

TennisTournamentDate.propTypes = {
  tournament: object.isRequired
};

function TennisTournamentDate({ tournament }) {
  const startDate = new Date(tournament.current_season.start_date);
  const endDate = new Date(tournament.current_season.end_date);
  return (
    <Row>
      <Col span={14}>{tournament.name}</Col>
      <Col span={4}>{days[startDate.getDay()]} {months[startDate.getMonth()]} {startDate.getDate()}</Col>
      <Col span={2}>-</Col>
      <Col span={4}>{days[endDate.getDay()]} {months[endDate.getMonth()]} {endDate.getDate()}</Col>
    </Row>
  );
}

export default TennisTournamentDate;