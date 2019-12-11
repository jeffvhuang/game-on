import * as React from "react";
import NextTennisMatchup from "./NextTennisMatchup";
import { TennisMatch } from "../../../../../types/tennis-api/tennis-match.model";
import { RoundMatches } from "../../../../../types/tennis-api/round-matches.model";

interface Props {
  selectedRound: string;
  getMatchesFn: (rm: RoundMatches[], selectedRound: string) => TennisMatch[];
  roundMatches: RoundMatches[];
}

function TennisRoundRight({
  selectedRound,
  getMatchesFn,
  roundMatches
}: Props) {
  const matchesToShow = getMatchesFn(roundMatches, selectedRound);
  return (
    <div>
      {matchesToShow.map((m, i) => {
        return <NextTennisMatchup key={i} match={m} />;
      })}
    </div>
  );
}

export default TennisRoundRight;
