import * as React from 'react';
import { Row, Col } from 'antd';
import { GameOnEvent } from '../../../types/game-on-general/game-on-event.model';

interface Props {
  event: GameOnEvent
};

function EventWithMessage({ event }: Props) {
  const numOfCompetitors = event.competitors.length;
  const competitor1 = (numOfCompetitors > 0) ? event.competitors[0].name : 'TBD';
  const competitor2 = (numOfCompetitors > 1) ? event.competitors[1].name : 'TBD';

  let eventClass = 'event-row';
  if (event.status == 'Postponed') {
    eventClass += ' postponed-event';
  } else if (event.status == 'Canceled') {
    eventClass += ' canceled-event';
  }
  
  return (
    <Row className={eventClass}>
      <Col span={3}>{event.sport}</Col>
      <Col span={8}>{event.leagueOrTournament}</Col>
      <Col span={11}>
        <span>{competitor1}</span> v <span>{competitor2}</span>
      </Col>
      <Col span={2}>{event.status.toLowerCase()}</Col>
    </Row>
  );
}

export default EventWithMessage;