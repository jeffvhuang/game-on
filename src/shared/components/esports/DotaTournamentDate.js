import React from 'react';
import { Row, Col } from 'antd';
import { object, bool, func } from 'prop-types';

import { getDayMonthDate } from '../../../helpers/utils';

DotaTournamentDate.propTypes = {
  tournament: object.isRequired,
  showTournamentsMatches: bool.isRequired,
  selectTournament: func.isRequired
};

function DotaTournamentDate({ tournament, showTournamentsMatches, selectTournament }) {
  return (
    showTournamentsMatches ? (
      <Row onClick={selectTournament(tournament.id)}>
        <Col>
          {(tournament.league) && tournament.league.name} {(tournament.series) && tournament.series.name} {tournament.name}
        </Col>
      </Row>
    ) : (
      <Row onClick={selectTournament(tournament.id)}>
        <Col span={14}>
          {(tournament.league) && tournament.league.name} {(tournament.series) && tournament.series.name} {tournament.name}
        </Col>
        <Col span={4}>{getDayMonthDate(tournament.beginAt)}</Col>
        <Col span={2}>-</Col>
        <Col span={4}>{getDayMonthDate(tournament.endAt)}</Col>
      </Row>
    )
  );
}

export default DotaTournamentDate;