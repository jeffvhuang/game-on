import * as React from "react";
import { Row, Col } from "antd";

import {
  getNumberWithOrdinal,
  getFormattedTime
} from "../../../../helpers/utils";
import { days, months } from "../../../../helpers/constants";

interface Props {
  game: any;
}

function NbaMatchSchedule({ game }: Props) {
  const startDate = new Date(game.startTimeUTC);
  // format: Wed, 21st Nov
  const startDateString = `${days[startDate.getDay()]}, ${getNumberWithOrdinal(
    startDate.getDate()
  )} ${months[startDate.getMonth()]}`;

  return (
    <Row>
      <Col span={8}>{game.vTeam.fullName}</Col>
      <Col span={8}>{game.hTeam.fullName}</Col>
      <Col span={5}>{startDateString}</Col>
      <Col span={3}>{getFormattedTime(startDate)}</Col>
    </Row>
  );
}

export default NbaMatchSchedule;
