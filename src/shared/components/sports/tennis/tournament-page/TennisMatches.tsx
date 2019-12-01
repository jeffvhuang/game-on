import * as React from "react";

import TennisMatchup from "./TennisMatchup";
import { TennisMatch } from "../../../../../types/tennis-api/tennis-match.model";

interface Props {
  header: string;
  games: TennisMatch[];
  values: string[];
  rounds: number;
}

interface RoundMatches {
  round: string;
  matches: TennisMatch[];
}

function TennisMatches({ header, games, values, rounds }: Props) {
  // Sort the schedule into rounds
  const roundMatches: RoundMatches[] = [];
  if (games[0] && games[0].tournamentRound.name == "qualification")
    roundMatches.push({ round: "qualification", matches: [] });

  for (let i = rounds; i > 0; i--) {
    const round =
      i == 1
        ? "final"
        : i == 2
        ? "semifinal"
        : i == 3
        ? "quarterfinal"
        : `round_of_${Math.pow(2, i)}`;

    roundMatches.push({ round, matches: [] });
  }

  games.forEach(function(game) {
    const round = roundMatches.find(r => r.round == game.tournamentRound.name);
    if (round) round.matches.push(game);
  });

  console.log(roundMatches);

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
