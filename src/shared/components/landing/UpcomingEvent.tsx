import * as React from 'react';
import { Row, Col } from 'antd';

interface Props {
  sport: string;
  leagueOrTournament: string;
  competitor1: string;
  competitor2: string;
  timeString: string;
};

function UpcomingEvent({ sport, leagueOrTournament, competitor1, competitor2, timeString }: Props) {
  return (
    <Row className="event-row upcoming-event">
      <Col span={3}>{sport}</Col>
      <Col span={8}>{leagueOrTournament}</Col>
      <Col span={11}>
        <span>{competitor1}</span> v <span>{competitor2}</span>
      </Col>
      <Col span={2}>{timeString}</Col>
    </Row>
  );
}

export default UpcomingEvent;