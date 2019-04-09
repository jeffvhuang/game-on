import React from 'react';
import { Row, Col } from 'antd';
import { object } from 'prop-types';

import { getFormattedTime } from '../../../helpers/utils';

EplMatchSchedule.propTypes = {
  game: object.isRequired
};

function EplMatchSchedule({ game }) {
  const startDate = new Date(game.event_date);
  return (
    <Row>
      <Col span={7}>{game.awayTeam}</Col>
      <Col span={2}>vs</Col>
      <Col span={7}>{game.homeTeam}</Col>
      <Col span={5}>{startDate.toDateString()}</Col>
      <Col span={3}>{getFormattedTime(startDate)}</Col>
    </Row>
  );
}

export default EplMatchSchedule;