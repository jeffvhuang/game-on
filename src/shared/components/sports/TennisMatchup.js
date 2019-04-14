import React from 'react';
import { Row, Col } from 'antd';
import { object } from 'prop-types';

import { getDayMonthDate } from '../../../helpers/utils';

TennisMatchup.propTypes = {
  game: object.isRequired
};

function TennisMatchup({ game }) {
  return (
    <Row>
      <Col span={4} className="capitalise">{game.tournament_round.name.replace(/_/g, ' ')}</Col>
      <Col span={6}>
        {game.competitors[0].name} {(game.competitors[0].seed) && '[' + game.competitors[0].seed + ']'}
      </Col>
      <Col span={2}>vs</Col>
      <Col span={6}>
        {game.competitors[1].name} {(game.competitors[1].seed) && '[' + game.competitors[1].seed + ']'}
      </Col>
      <Col span={3}>{getDayMonthDate(game.scheduled)}</Col>
      <Col span={3} className="capitalise">{game.status.replace(/_/g, ' ')}</Col>
    </Row>
  );
}

export default TennisMatchup;