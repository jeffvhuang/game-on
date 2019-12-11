import * as React from "react";
import TennisMatchup from "./TennisMatchup";
import { TennisMatch } from "../../../../../types/tennis-api/tennis-match.model";
import { RoundMatches } from "../../../../../types/tennis-api/round-matches.model";

interface Props {
  selectedRound: string;
  getMatchesFn: (rm: RoundMatches[], selectedRound: string) => TennisMatch[];
  roundMatches: RoundMatches[];
}

function TennisRoundLeft({ selectedRound, getMatchesFn, roundMatches }: Props) {
  const matchesToShow = getMatchesFn(roundMatches, selectedRound);
  return (
    <div>
      {matchesToShow.map((m, i) => {
        const topOrBotMatchup = i % 2 == 0 ? "top" : "bot";
        return (
          <TennisMatchup key={i} match={m} topOrBotMatchup={topOrBotMatchup} />
        );
      })}
    </div>
  );
}

export default TennisRoundLeft;
