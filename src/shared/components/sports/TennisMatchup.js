import React from 'react';
import { Row, Col } from 'antd';
import { object } from 'prop-types';

TennisMatchup.propTypes = {
  game: object.isRequired
};

function TennisMatchup({ game }) {
  const startDate = new Date(game.scheduled);
  return (
    <Row>
      <Col span={3}>{game.tournament_round.name}</Col>
      <Col span={7}>{game.competitors[0].name} [{game.competitors[0].seed}]</Col>
      <Col span={2}>vs</Col>
      <Col span={7}>{game.competitors[1].name} [{game.competitors[1].seed}]</Col>
      <Col span={5}>{startDate.toDateString()}</Col>
    </Row>
  );
}

export default TennisMatchup;