import * as React from "react";
import { Row, Col } from "antd";

import { getDayMonthDate } from "../../../../../helpers/utils";
import { ESportsTournamentBase } from "../../../../../types/esports-api/esports-tournament-base.model";

interface Props {
  tournament: ESportsTournamentBase;
  selectTournament: (id: number) => () => void;
}

function DotaListTournamentDate({ tournament, selectTournament }: Props) {
  return (
    <Row onClick={selectTournament(tournament.id)}>
      <Col span={14}>{tournament.name}</Col>
      <Col span={4}>{getDayMonthDate(tournament.beginAt)}</Col>
      <Col span={2}>-</Col>
      <Col span={4}>{getDayMonthDate(tournament.endAt)}</Col>
    </Row>
  );
}

export default DotaListTournamentDate;
