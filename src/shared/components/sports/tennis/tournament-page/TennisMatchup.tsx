import * as React from "react";
import { Row, Col } from "antd";

import { getDayMonthDate } from "../../../../../helpers/utils";
import { TennisMatch } from "../../../../../types/tennis-api/tennis-match.model";

interface Props {
  match: TennisMatch;
}

function TennisMatchup({ match }: Props) {
  const p1 = match.competitors[0];
  const p2 = match.competitors[1];

  return (
    <div className="matchup">
      <div className="left-col">
        <div className="box">
          <div className="top-player player">
            <p className="country">{p1.countryCode}</p>
            <p className="player-name">
              {p1.name}
              <span className="seed">{p1.seed && `[${p1.seed}]`}</span>
            </p>
          </div>
          <div className="bottom-player player">
            <p className="country">{p2.countryCode}</p>
            <p className="player-name">
              {p2.name}
              <span className="seed">{p2.seed && `[${p2.seed}]`}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="right-col">
        <div className="date-box">
          <p className="date">{getDayMonthDate(match.scheduled)}</p>
        </div>
        <div className="line" />
      </div>
    </div>

    //   <Col span={3} className="capitalise">
    //     {match.tournamentRound.name.replace(/_/g, " ")}
    //   </Col>
    //   <Col span={1}>{p1.countryCode}</Col>
    //   <Col span={6}>
    //     {p1.name} {p1.seed && "[" + p1.seed + "]"}
    //   </Col>
    //   <Col span={1}>vs</Col>
    //   <Col span={1}>{p2.countryCode}</Col>
    //   <Col span={6}>
    //     {p2.name} {p2.seed && "[" + p2.seed + "]"}
    //   </Col>
    //   <Col span={3}>{getDayMonthDate(match.scheduled)}</Col>
    //   <Col span={3} className="capitalise">
    //     {match.status.replace(/_/g, " ")}
    //   </Col>
    // </Row>
  );
}

export default TennisMatchup;
