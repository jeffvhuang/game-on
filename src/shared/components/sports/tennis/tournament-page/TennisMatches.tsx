import * as React from "react";

import TennisMatchup from "./TennisMatchup";
import { TennisMatch } from "../../../../../types/tennis-api/tennis-match.model";
import NextTennisMatchup from "./NextTennisMatchup";

interface Props {
  header: string;
  games: TennisMatch[];
  values: string[];
  rounds: number;
  selectedRound: string;
}

interface RoundMatches {
  round: string;
  matches: TennisMatch[];
}

function TennisMatches({
  header,
  games,
  values,
  rounds,
  selectedRound
}: Props) {
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

  const roundToShow = roundMatches.find(r => r.round === selectedRound);
  const matchesToShow = roundToShow ? roundToShow.matches : [];
  matchesToShow.sort(sortTennisMatches);

  console.log(matchesToShow);

  // Get index of round in roundMatches and find next round
  const index = roundMatches.map(e => e.round).indexOf(selectedRound);
  const nextRoundMatches =
    index < rounds - 1 ? roundMatches[index + 1].matches : [];
  nextRoundMatches.sort(sortTennisMatches);

  console.log(nextRoundMatches);

  return (
    <div className="margin-bot">
      <h2>{header}</h2>
      <div className="tournament-wrapper">
        <div>
          {matchesToShow.map((m, i) => {
            return <TennisMatchup key={i} match={m} />;
          })}
        </div>
        <div>
          {nextRoundMatches.map((m, i) => {
            return <NextTennisMatchup key={i} match={m} />;
          })}
        </div>
      </div>

      {/* {values.length < 1
        ? games.map((g, i) => <TennisMatchup key={i} match={g} />)
        : games.map((g, i) => {
            if (
              values.some(
                v => v == g.competitors[0].name || v == g.competitors[1].name
              )
            ) {
              return <TennisMatchup key={i} match={g} />;
            }
          })} */}
    </div>
  );
}

function sortTennisMatches(a, b) {
  if (
    a.competitors.length &&
    b.competitors.length &&
    a.competitors[0].bracketNumber &&
    b.competitors[0].bracketNumber
  )
    return a.competitors[0].bracketNumber - b.competitors[0].bracketNumber;
  return 0;
}

export default TennisMatches;
