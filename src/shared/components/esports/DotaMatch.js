import React from 'react';
import { Row, Col } from 'antd';
import { object } from 'prop-types';

import { getFormattedTime } from '../../../helpers/utils';

DotaMatch.propTypes = {
  game: object.isRequired
};

function DotaMatch({ game }) {
  const startDate = new Date(game.beginAt);
  
  return (
    <Row>
      <Col span={7}>{game.matchType}</Col>
      <Col span={2}>{game.numberOfGames}</Col>
      <Col span={7}>{game.name}</Col>
      <Col span={5}>{startDate.toDateString()}</Col>
      <Col span={3}>{getFormattedTime(startDate)}</Col>
    </Row>
  );
}

export default DotaMatch;