import * as React from 'react';
import { Row, Col } from 'antd';
import { GameOnEvent } from '../../../types/game-on-general/game-on-event.model';

interface Props {
  event: GameOnEvent
};

function EventWithScore({ event }: Props) {
  const numOfCompetitors = event.competitors.length;
  const score1 = (numOfCompetitors > 0) ? event.competitors[0].score : '';
  const score2 = (numOfCompetitors > 1) ? event.competitors[1].score : '';
  
  const competitor1 = (numOfCompetitors > 0) ? event.competitors[0].name : 'TBD';
  const competitor2 = (numOfCompetitors > 1) ? event.competitors[1].name : 'TBD';

  let eventClass = 'event-row';
  if (event.status == 'Completed') {
    eventClass += ' completed-event';
  } else if (event.status == 'Live') {
    eventClass += ' live-event';
  }
  
  return (
    <Row className={eventClass}>
      <Col span={3}>{event.sport}</Col>
      <Col span={8}>{event.leagueOrTournament}</Col>
      <Col span={11}>
        <span>{competitor1}</span> v <span>{competitor2}</span>
      </Col>
      <Col span={2}>{score1} - {score2}</Col>
    </Row>
  );
}

export default EventWithScore;