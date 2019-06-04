import React from 'react';
import { Row, Col } from 'antd';
import { object } from 'prop-types';

import { getFormattedTime } from '../../../../helpers/utils';

NbaMatchSchedule.propTypes = {
  game: object.isRequired
};

function NbaMatchSchedule({ game }) {
  const startDate = new Date(game.startTimeUTC);
  
  return (
    <Row>
      <Col span={7}>{game.vTeam.fullName}</Col>
      <Col span={2}>vs</Col>
      <Col span={7}>{game.hTeam.fullName}</Col>
      <Col span={5}>{startDate.toDateString()}</Col>
      <Col span={3}>{getFormattedTime(startDate)}</Col>
    </Row>
  );
}

export default NbaMatchSchedule;