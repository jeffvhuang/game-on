import * as React from 'react';
import { Row, Col } from 'antd';
import { GameOnEvent } from '../../../types/game-on-general/game-on-event.model';

interface Props {
  events: GameOnEvent[];
  getDateString: (event: GameOnEvent) => string | null;
};

function UpcomingEventsSection({ events, getDateString }: Props) {
  return (
    <>
      {events.map((event, i) => {
        const numOfCompetitors = event.competitors.length;
        const competitor1 = (numOfCompetitors > 0) ? event.competitors[0].name : 'TBD';
        const competitor2 = (numOfCompetitors > 1) ? event.competitors[1].name : 'TBD';
        
        return (
          <Row key={event.id}>
            <Col span={3}>{event.sport}</Col>
            <Col span={3}>{event.leagueOrTournament}</Col>
            <Col span={7}>{competitor1}</Col>
            <Col span={1}>vs</Col>
            <Col span={7}>{competitor2}</Col>
            <Col span={3}>{getDateString(event)}</Col>
          </Row>
          
        );
      })}
    </>
  );
}

export default UpcomingEventsSection;