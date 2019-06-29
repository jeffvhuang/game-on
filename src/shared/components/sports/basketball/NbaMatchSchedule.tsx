import * as React from 'react';
import { Row, Col } from 'antd';

import { getFormattedTime } from '../../../../helpers/utils';

interface Props {
  game: any
};

function NbaMatchSchedule({ game }: Props) {
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