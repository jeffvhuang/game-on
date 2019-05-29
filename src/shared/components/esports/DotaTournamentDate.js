import React from 'react';
import { Row, Col } from 'antd';
import { object, bool, func } from 'prop-types';
import { Link } from 'react-router-dom';

import { paths } from '../../../helpers/constants';
import { getDayMonthDate } from '../../../helpers/utils';

DotaTournamentDate.propTypes = {
  tournament: object.isRequired,
  showTournamentsMatches: bool.isRequired,
  selectTournament: func.isRequired
};

function DotaTournamentDate({ tournament, showTournamentsMatches, selectTournament }) {
  return (
    // <Link to={paths.ESPORTS + '/dota/' + tournament.id}>
    <div onClick={selectTournament(tournament.id)}>
      {showTournamentsMatches ? (
        <Row>
          <Col span={14}>
            {(tournament.league) && tournament.league.name} {(tournament.series) && tournament.series.name} {tournament.name}
          </Col>
        </Row>
      ) : (
        <Row>
          <Col span={14}>
            {(tournament.league) && tournament.league.name} {(tournament.series) && tournament.series.name} {tournament.name}
          </Col>
          <Col span={4}>{getDayMonthDate(tournament.beginAt)}</Col>
          <Col span={2}>-</Col>
          <Col span={4}>{getDayMonthDate(tournament.endAt)}</Col>
        </Row>
      )}
    </div>
  );
}

export default DotaTournamentDate;