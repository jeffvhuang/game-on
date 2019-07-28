import * as React from 'react';
import { Row, Col } from 'antd';

interface Props {
  eventClass: string;
  sport: string;
  leagueOrTournament: string;
  competitor1: string;
  competitor2: string;
  score1: string;
  score2: string;
};

function EventWithScore({ eventClass, sport, leagueOrTournament, competitor1, competitor2, score1, score2 }: Props) {
  return (
    <Row className={eventClass}>
      <Col span={3}>{sport}</Col>
      <Col span={8}>{leagueOrTournament}</Col>
      <Col span={11}>
        <span>{competitor1}</span> v <span>{competitor2}</span>
      </Col>
      <Col span={2}>{score1} - {score2}</Col>
    </Row>
  );
}

export default EventWithScore;