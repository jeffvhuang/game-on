import React from 'react';
import { Row, Col } from 'antd';
import { object } from 'prop-types';

import { getFormattedTime } from '../../../helpers/utils';

DotaTournamentMatch.propTypes = {
  match: object.isRequired
};

function DotaTournamentMatch({ match }) {
  const startDate = new Date(match.beginAt);
  
  return (
    <Row>
      <Col span={7}>{match.matchType}</Col>
      <Col span={2}>{match.numberOfGames}</Col>
      <Col span={7}>{match.name}</Col>
      <Col span={5}>{startDate.toDateString()}</Col>
      <Col span={3}>{getFormattedTime(startDate)}</Col>
    </Row>
  );
}

export default DotaTournamentMatch;