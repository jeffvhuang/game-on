import * as React from 'react';
import { Row, Col } from 'antd';

import { getFormattedTime } from '../../../../helpers/utils';

interface Props {
  game: any
};

function FootballMatchSchedule({ game }: Props) {
  const startDate = new Date(game.eventDate);

  return (
    <Row>
      <Col span={7}>{game.awayTeam.teamName}</Col>
      <Col span={2}>vs</Col>
      <Col span={7}>{game.homeTeam.teamName}</Col>
      <Col span={5}>{startDate.toDateString()}</Col>
      <Col span={3}>{getFormattedTime(startDate)}</Col>
    </Row>
  );
}

export default FootballMatchSchedule;