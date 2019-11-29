import * as React from "react";
import { Row, Col } from "antd";

import {
  getFormattedTime,
  getDateWithOrdinal
} from "../../../../helpers/utils";

interface Props {
  game: any;
}

function NbaMatchSchedule({ game }: Props) {
  const startDate = new Date(game.startTimeUTC);
  return (
    <Row>
      <Col span={8}>{game.vTeam.fullName}</Col>
      <Col span={8}>{game.hTeam.fullName}</Col>
      <Col span={5}>{getDateWithOrdinal(startDate)}</Col>
      <Col span={3}>{getFormattedTime(startDate)}</Col>
    </Row>
  );
}

export default NbaMatchSchedule;
