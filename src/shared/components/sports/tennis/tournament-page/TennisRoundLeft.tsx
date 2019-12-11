import * as React from "react";
import TennisMatchup from "./TennisMatchup";
import { TennisMatch } from "../../../../../types/tennis-api/tennis-match.model";
import { RoundMatches } from "../../../../../types/tennis-api/round-matches.model";
import { getTennisRoundName } from "../../../../../helpers/utils";

interface Props {
  selectedRound: string;
  getMatchesFn: (rm: RoundMatches[], selectedRound: string) => TennisMatch[];
  roundMatches: RoundMatches[];
}

function TennisRoundLeft({ selectedRound, getMatchesFn, roundMatches }: Props) {
  const matchesToShow = getMatchesFn(roundMatches, selectedRound);
  return (
    <div>
      <h3>{getRoundName(selectedRound, roundMatches)}</h3>
      {matchesToShow.map((m, i) => {
        const topOrBotMatchup = i % 2 == 0 ? "top" : "bot";
        return (
          <TennisMatchup key={i} match={m} topOrBotMatchup={topOrBotMatchup} />
        );
      })}
    </div>
  );
}

function getRoundName(
  selectedRound: string,
  roundMatches: RoundMatches[]
): string {
  const roundName =
    !selectedRound && roundMatches.length
      ? roundMatches[0].round
      : selectedRound;
  return getTennisRoundName(roundName);
}

export default TennisRoundLeft;
