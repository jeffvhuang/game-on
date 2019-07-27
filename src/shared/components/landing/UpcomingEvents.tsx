import * as React from 'react';
import { Row, Col } from 'antd';
import { GameOnEvent } from '../../../types/game-on-general/game-on-event.model';
import { getFormattedTime } from '../../../helpers/utils';

interface Props {
  events: GameOnEvent[];
};

function UpcomingEvents({ events }: Props) {
  return (
    <>
      {events.map((event, i) => {
        const numOfCompetitors = event.competitors.length;
        const competitor1 = (numOfCompetitors > 0) ? event.competitors[0].name : 'TBD';
        const competitor2 = (numOfCompetitors > 1) ? event.competitors[1].name : 'TBD';
        
        const startDate = (event.startTime) ? new Date(event.startTime) : null;

        return (
          <Row key={event.id}>
            <Col span={3}>{event.sport}</Col>
            <Col span={3}>{event.leagueOrTournament}</Col>
            <Col span={7}>{competitor1}</Col>
            <Col span={1}>vs</Col>
            <Col span={7}>{competitor2}</Col>
            <Col span={3}>{getFormattedTime(startDate)}</Col>
          </Row>
        );
      })}
    </>
  );
}

export default UpcomingEvents;