import * as React from "react";
import { Row, Col } from "antd";

import {
  getFormattedTime,
  getNumberWithOrdinal
} from "../../../../helpers/utils";
import { FootballSchedule } from "../../../../types/football-api/football-schedule.model";
import { days, months } from "../../../../helpers/constants";

interface Props {
  game: FootballSchedule;
}

function FootballMatchSchedule({ game }: Props) {
  const startDate = new Date(game.eventDate);
  // format: Wed, 21st Nov
  const startDateString = `${days[startDate.getDay()]}, ${getNumberWithOrdinal(
    startDate.getDate()
  )} ${months[startDate.getMonth()]}`;

  return (
    <Row>
      <Col span={8}>{game.awayTeam.teamName}</Col>
      <Col span={8}>{game.homeTeam.teamName}</Col>
      <Col span={5}>{startDateString}</Col>
      <Col span={3}>{getFormattedTime(startDate)}</Col>
    </Row>
  );
}

export default FootballMatchSchedule;
