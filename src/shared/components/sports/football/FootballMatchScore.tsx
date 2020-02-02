import * as React from "react";
import { Row, Col } from "antd";

import { FootballSchedule } from "../../../../types/football-api/football-schedule.model";

interface Props {
  game: FootballSchedule;
}

function FootballMatchScore({ game }: Props) {
  return (
    <Row>
      <Col span={8}>{game.awayTeam.teamName}</Col>
      <Col span={8}>{game.homeTeam.teamName}</Col>
      <Col span={5}>
        {game.goalsAwayTeam} - {game.goalsHomeTeam}
      </Col>
      <Col span={3}>{game.statusShort}</Col>
    </Row>
  );
}

export default FootballMatchScore;
