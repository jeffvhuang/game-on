import * as React from "react";
import { Row, Col } from "antd";
import { GameOnEvent } from "../../../types/game-on-general/game-on-event.model";
import { getFormattedTime } from "../../../helpers/utils";

interface Props {
  event: GameOnEvent;
}

function UpcomingEvent({ event }: Props) {
  const numOfCompetitors = event.competitors ? event.competitors.length : 0;
  const competitor1 = numOfCompetitors > 0 ? event.competitors[0].name : "TBD";
  const competitor2 = numOfCompetitors > 1 ? event.competitors[1].name : "TBD";

  const startDate = event.startTime ? new Date(event.startTime) : null;

  return (
    <Row className="event-row upcoming-event">
      <Col span={3}>{event.sport}</Col>
      <Col span={8}>{event.leagueOrTournament}</Col>
      <Col span={11}>
        <span>{competitor1}</span> v <span>{competitor2}</span>
      </Col>
      <Col span={2}>{getFormattedTime(startDate)}</Col>
    </Row>
  );
}

export default UpcomingEvent;
