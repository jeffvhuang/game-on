import * as React from "react";

import TennisMatchup from "./TennisMatchup";
import { TennisMatch } from "../../../../../types/tennis-api/tennis-match.model";

interface Props {
  header: string;
  games: TennisMatch[];
  values: string[];
  rounds: number;
}

function TennisMatches({ header, games, values, rounds }: Props) {
  return (
    <div className="margin-bot">
      <h2>{header}</h2>
      {values.length < 1
        ? games.map((g, i) => <TennisMatchup key={i} match={g} />)
        : games.map((g, i) => {
            if (
              values.some(
                v => v == g.competitors[0].name || v == g.competitors[1].name
              )
            ) {
              return <TennisMatchup key={i} match={g} />;
            }
          })}
    </div>
  );
}

export default TennisMatches;
