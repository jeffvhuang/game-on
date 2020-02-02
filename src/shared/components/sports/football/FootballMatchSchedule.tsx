import * as React from "react";
import { Row, Col } from "antd";

import {
  getFormattedTime,
  getDateWithOrdinal
} from "../../../../helpers/utils";
import { FootballSchedule } from "../../../../types/football-api/football-schedule.model";

interface Props {
  game: FootballSchedule;
}

function FootballMatchSchedule({ game }: Props) {
  const startDate = new Date(game.eventDate);
  return (
    <Row>
      <Col span={8}>{game.awayTeam.teamName}</Col>
      <Col span={8}>{game.homeTeam.teamName}</Col>
      <Col span={5}>{getDateWithOrdinal(startDate)}</Col>
      <Col span={3}>{getFormattedTime(startDate)}</Col>
    </Row>
  );
}

export default FootballMatchSchedule;
