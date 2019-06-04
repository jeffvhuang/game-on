import React from 'react';
import { Row, Col } from 'antd';
import { object } from 'prop-types';
import { Link } from 'react-router-dom';

import { paths } from '../../../../helpers/constants';
import { getDayMonthDate } from '../../../../helpers/utils';

TennisTournamentDate.propTypes = {
  tournament: object.isRequired
};

function TennisTournamentDate({ tournament }) {
  return (
    <Link to={paths.SPORTS + '/tennis/' + tournament.id.split(':')[2]}>
      <Row>
        <Col span={14}>{tournament.name}</Col>
        <Col span={4}>{getDayMonthDate(tournament.currentSeason.startDate)}</Col>
        <Col span={2}>-</Col>
        <Col span={4}>{getDayMonthDate(tournament.currentSeason.endDate)}</Col>
      </Row>
    </Link>
  );
}

export default TennisTournamentDate;