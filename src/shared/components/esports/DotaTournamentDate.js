import React from 'react';
import { Row, Col } from 'antd';
import { object } from 'prop-types';
import { Link } from 'react-router-dom';

import { paths } from '../../../helpers/constants';
import { getDayMonthDate } from '../../../helpers/utils';

DotaTournamentDate.propTypes = {
  tournament: object.isRequired
};

function DotaTournamentDate({ tournament }) {
  return (
    <Link to={paths.ESPORTS + '/dota/' + tournament.seriesId}>
      <Row>
        <Col span={14}>{tournament.league.name} {tournament.series.name} {tournament.name}</Col>
        <Col span={4}>{getDayMonthDate(tournament.beginAt)}</Col>
        <Col span={2}>-</Col>
        <Col span={4}>{getDayMonthDate(tournament.endAt)}</Col>
      </Row>
    </Link>
  );
}

export default DotaTournamentDate;