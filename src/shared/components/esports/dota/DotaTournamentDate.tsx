import * as React from 'react';
import { Row, Col } from 'antd';

import { getDayMonthDate } from '../../../../helpers/utils';
import { ESportsTournament } from '../../../../types/esports-api/esports-tournament.model';

interface Props {
  tournament: ESportsTournament;
  showTournamentsMatches: boolean;
  selectTournament: (id: number) => () => void;
};

function DotaTournamentDate({ tournament, showTournamentsMatches, selectTournament }: Props) {
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