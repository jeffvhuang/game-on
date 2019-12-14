import * as React from "react";
import NextTennisMatchup from "./NextTennisMatchup";
import { TennisMatch } from "../../../../../types/tennis-api/tennis-match.model";
import { RoundMatches } from "../../../../../types/tennis-api/round-matches.model";
import { getTennisRoundName } from "../../../../../helpers/utils";

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
      <div className="right-header-box">
        <div className="right-header-pre-box" />
        <h3>{getRoundName(selectedRound, roundMatches)}</h3>
      </div>
      {matchesToShow.map((m, i) => {
        return <NextTennisMatchup key={i} match={m} />;
      })}
    </div>
  );
}

function getRoundName(
  selectedRound: string,
  roundMatches: RoundMatches[]
): string {
  let roundName = "";
  if (roundMatches.length > 1) {
    if (!selectedRound) roundName = roundMatches[1].round;
    else {
      const index = roundMatches.map(r => r.round).indexOf(selectedRound);
      roundName = roundMatches[index + 1].round;
    }
  }

  return getTennisRoundName(roundName);
}

export default TennisRoundRight;
