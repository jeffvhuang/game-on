import * as React from "react";

import DotaMatch from "./DotaMatch";
import { ESportsMatch } from "../../../../../types/esports-api/esports-match.model";

interface Props {
  header: string;
  matches: ESportsMatch[];
  values: string[];
}

function DotaMatches({ header, matches, values }: Props) {
  return (
    <div className="list">
      <h2>{header}</h2>
      {values.length < 1
        ? matches.map((m, i) => <DotaMatch key={i} match={m} />)
        : matches.map((m, i) => {
            if (
              values.some(
                v =>
                  v == m.opponents[0].opponent.name ||
                  v == m.opponents[1].opponent.name
              )
            ) {
              return <DotaMatch key={i} match={m} />;
            }
          })}
    </div>
  );
}

export default DotaMatches;