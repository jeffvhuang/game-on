import * as React from 'react';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';

import { paths } from '../../../../helpers/constants';
import { getDayMonthDateFromReverseFormat } from '../../../../helpers/utils';
import { TennisTournament } from '../../../../types/tennis-api/tennis-tournament.model';

interface Props {
  tournament: TennisTournament
};

function TennisTournamentDate({ tournament }: Props) {
  const startDate = (tournament.currentSeason) ? tournament.currentSeason.startDate : null;
  const endDate = (tournament.currentSeason) ? tournament.currentSeason.endDate : null;
  
  return (
    <Link to={paths.SPORTS + '/tennis/' + tournament.id.split(':')[2]}>
      <Row>
        <Col span={14}>{tournament.name}</Col>
        <Col span={4}>{getDayMonthDateFromReverseFormat(startDate)}</Col>
        <Col span={2}>-</Col>
        <Col span={4}>{getDayMonthDateFromReverseFormat(endDate)}</Col>
      </Row>
    </Link>
  );
}

export default TennisTournamentDate;