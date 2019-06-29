import * as React from 'react';
import { Row, Col } from 'antd';

import { getDayMonthDate } from '../../../../helpers/utils';
import { ESportsTournamentBase } from '../../../../types/esports-api/esports-tournament-base.model';

interface Props {
  tournament: ESportsTournamentBase;
  showTournamentsMatches: boolean;
  selectTournament: (id: number) => () => void;
};

function DotaSeriesTournamentDate({ tournament, showTournamentsMatches, selectTournament }: Props) {
  return (
    showTournamentsMatches ? (
      <Row onClick={selectTournament(tournament.id)}>
        <Col>
          {tournament.name}
        </Col>
      </Row>
    ) : (
      <Row onClick={selectTournament(tournament.id)}>
        <Col span={14}>
          {tournament.name}
        </Col>
        <Col span={4}>{getDayMonthDate(tournament.beginAt)}</Col>
        <Col span={2}>-</Col>
        <Col span={4}>{getDayMonthDate(tournament.endAt)}</Col>
      </Row>
    )
  );
}

export default DotaSeriesTournamentDate;