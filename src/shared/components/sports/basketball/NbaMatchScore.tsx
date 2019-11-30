import * as React from "react";
import { Row, Col } from "antd";
import { NbaSchedule } from "../../../../types/nba-api/nba-schedule.model";
import { getDateWithOrdinal } from "../../../../helpers/utils";

interface Props {
  game: NbaSchedule;
}

function NbaMatchScore({ game }: Props) {
  const startDate = new Date(game.startTimeUTC);
  const awayScore = game.vTeam.score.points ? game.vTeam.score.points : "0";
  const homeScore = game.hTeam.score.points ? game.hTeam.score.points : "0";
  return (
    <Row>
      <Col span={8}>{game.vTeam.fullName}</Col>
      <Col span={8}>{game.hTeam.fullName}</Col>
      <Col span={3}>
        {awayScore} - {homeScore}
      </Col>
      <Col span={2} />
      <Col span={3}>{getDateWithOrdinal(startDate)}</Col>
    </Row>
  );
}

export default NbaMatchScore;
