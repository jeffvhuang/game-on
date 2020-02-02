import * as React from "react";

import { getDayMonthDate } from "../../../../../helpers/utils";
import { TennisMatch } from "../../../../../types/tennis-api/tennis-match.model";

interface Props {
  match: TennisMatch;
  topOrBotMatchup: string;
}

function TennisMatchup({ match, topOrBotMatchup }: Props) {
  const p1 = match.competitors[0];
  const p2 = match.competitors[1];
  const topBoxClass = topOrBotMatchup == "bot" ? "line-bot-right" : "";
  const botBoxClass = topOrBotMatchup == "top" ? "line-top-right" : "";

  return (
    <div className="matchup-container">
      <div className="matchup">
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
        </div>
      </div>
      <div className="line-col">
        <div className={topBoxClass} />
        <div className={botBoxClass} />
      </div>
    </div>
  );
}

export default TennisMatchup;
