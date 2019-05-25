import React from 'react';
import { Row, Col } from 'antd';
import { object } from 'prop-types';

import { getDayMonthDate } from '../../../helpers/utils';

TennisMatchup.propTypes = {
  match: object.isRequired
};

function TennisMatchup({ match }) {
  const player1 = match.competitors[0];
  const player2 = match.competitors[1];

  return (
    <Row>
      <Col span={3} className="capitalise">{match.tournamentRound.name.replace(/_/g, ' ')}</Col>
      <Col span={1}>{player1.countryCode}</Col>
      <Col span={6}>{player1.name} {(player1.seed) && '[' + player1.seed + ']'}</Col>
      <Col span={1}>vs</Col>
      <Col span={1}>{player2.countryCode}</Col>
      <Col span={6}>{player2.name} {(player2.seed) && '[' + player2.seed + ']'}</Col>
      <Col span={3}>{getDayMonthDate(match.scheduled)}</Col>
      <Col span={3} className="capitalise">{match.status.replace(/_/g, ' ')}</Col>
    </Row>
  );
}

export default TennisMatchup;