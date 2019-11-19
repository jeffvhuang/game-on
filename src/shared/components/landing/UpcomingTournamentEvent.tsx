import * as React from "react";
import { Row, Col } from "antd";
import { GameOnEvent } from "../../../types/game-on-general/game-on-event.model";
import { getFormattedTime } from "../../../helpers/utils";

interface Props {
  event: GameOnEvent;
  daysAheadOfToday: number;
}

function UpcomingTournamentEvent({ event, daysAheadOfToday }: Props) {
  let formattedTime = "";
  let tournamentDay = "";
  const today = new Date();

  if (event.startTime != null) {
    const startDate = new Date(event.startTime);
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

    if (event.endTime) {
      const endDate = new Date(event.endTime);
      if (endDate.getDate() === today.getDate()) {
        tournamentDay = "Final Day";
      }
    }

    if (!tournamentDay.length) {
      tournamentDay =
        "Day " +
        Math.round(
          Math.abs((today.valueOf() - startDate.valueOf()) / oneDay) +
            daysAheadOfToday
        );
    }

    formattedTime = getFormattedTime(startDate);
  }

  return (
    <Row className="event-row upcoming-event">
      <Col span={3}>{event.sport}</Col>
      <Col span={8}>{event.leagueOrTournament}</Col>
      <Col span={11}>{tournamentDay}</Col>
      <Col span={2}>{formattedTime}</Col>
    </Row>
  );
}

export default UpcomingTournamentEvent;
