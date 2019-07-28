import * as React from 'react';
import { Row, Col } from 'antd';
import { GameOnEvent } from '../../../types/game-on-general/game-on-event.model';

interface Props {
  events: GameOnEvent[]
};

function EventsToday({ events }: Props) {
  const now = new Date();
  return (
    <>
      {events.map((event, i) => {
        // Set class for event depending on whether it is completed, live or upcoming
        let eventClass = 'event-row';
        const startTime = (event.startTime) ? new Date(event.startTime) : null;
        const endTime = (event.endTime) ? new Date(event.endTime) : null;

        if (endTime) {
          if (now > endTime) {
            eventClass += ' completed-event';
          } else if (startTime && now > startTime && now < endTime) {
            eventClass += ' live-event';
          }
        } else {
          eventClass += ' upcoming-event';
        }

        const numOfCompetitors = event.competitors.length;
        const competitor1 = (numOfCompetitors > 0) ? event.competitors[0].name : 'TBD';
        const score1 = (numOfCompetitors > 0) ? event.competitors[0].score : '';
        const competitor2 = (numOfCompetitors > 1) ? event.competitors[1].name : 'TBD';
        const score2 = (numOfCompetitors > 1) ? event.competitors[1].score : '';
        
        return (
          <Row key={event.id} className={eventClass}>
            <Col span={3}>{event.sport}</Col>
            <Col span={8}>{event.leagueOrTournament}</Col>
            <Col span={11}>
              <span>{competitor1}</span> v <span>{competitor2}</span>
            </Col>
            <Col span={2}>{score1} - {score2}</Col>
          </Row>
        );
      })}
    </>
  );
}

export default EventsToday;