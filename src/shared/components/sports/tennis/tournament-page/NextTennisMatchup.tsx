import * as React from "react";

import { getDayMonthDate } from "../../../../../helpers/utils";
import { TennisMatch } from "../../../../../types/tennis-api/tennis-match.model";

interface Props {
  match: TennisMatch;
}

function NextTennisMatchup({ match }: Props) {
  const p1 = match.competitors[0];
  const p2 = match.competitors[1];

  return (
    <div className="next-matchup">
      <div className="pre-box">
        <div className="pre-box-top" />
      </div>
      <div>
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
      <div className="date-col">
        <div className="date-box">
          <p className="date">{getDayMonthDate(match.scheduled)}</p>
        </div>
        <div className="line" />
      </div>
    </div>
  );
}

export default NextTennisMatchup;
