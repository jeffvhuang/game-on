import React from 'react';
import { Row, Col } from 'antd';
import { object } from 'prop-types';

import { getFormattedTime } from '../../../../helpers/utils';

DotaMatch.propTypes = {
  match: object.isRequired
};

function DotaMatch({ match }) {
  const startDate = new Date(match.beginAt);
  
  return (
    <Row>
      <Col span={5}>{match.league.name}</Col>
      <Col span={7}>
        {match.opponents[0].opponent.name} ({match.opponents[0].opponent.acronym})
      </Col>
      <Col span={1}>vs</Col>
      <Col span={7}>
      {match.opponents[1].opponent.name} ({match.opponents[1].opponent.acronym})
      </Col>
      <Col span={3}>{startDate.toDateString().slice(0, -5)}</Col>
      {/* <Col span={4}>{startDate.getDay()} {startDate.getMonth()} {startDate.getDate()}</Col> */}
      <Col span={1}>{getFormattedTime(startDate)}</Col>
    </Row>
  );
}

export default DotaMatch;