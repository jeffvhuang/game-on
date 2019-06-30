import * as React from 'react';
import { Row, Col } from 'antd';

import { getFormattedTime } from '../../../../helpers/utils';
import { ESportsMatch } from '../../../../types/esports-api/esports-match.model';

interface Props {
  match: ESportsMatch;
};

function DotaTournamentMatch({ match }: Props) {
  const startDate = (match.beginAt) ? new Date(match.beginAt) : null;
  const dateString = (startDate) ? startDate.toDateString().slice(0, -5) : "No Date";
  const time = (startDate) ? getFormattedTime(startDate) : null;

  return (
    <Row>
      <Col span={5}>{match.name}</Col>
      <Col span={7}>
        {match.opponents[0].opponent.name} ({match.opponents[0].opponent.acronym})
      </Col>
      <Col span={1}>vs</Col>
      <Col span={7}>
        {match.opponents[1].opponent.name} ({match.opponents[1].opponent.acronym})
      </Col>
      <Col span={3}>{dateString}</Col>
      <Col span={1}>{time}</Col>
    </Row>
  );
}

export default DotaTournamentMatch;