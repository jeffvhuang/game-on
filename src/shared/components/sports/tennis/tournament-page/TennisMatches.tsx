import * as React from "react";
import { Button } from "antd";

import TennisMatchup from "./TennisMatchup";
import { TennisMatch } from "../../../../../types/tennis-api/tennis-match.model";
import NextTennisMatchup from "./NextTennisMatchup";

interface Props {
  games: TennisMatch[];
  values: string[];
  rounds: number;
}

interface RoundMatches {
  round: string;
  matches: TennisMatch[];
}

interface State {
  selectedRoundNum: number;
  roundMatches: RoundMatches[];
  matchesToShow: TennisMatch[];
  nextRoundMatches: TennisMatch[];
}

class TennisMatches extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    const { games, rounds, values } = props;

    let roundMatches = this.initRoundMatches(games, rounds);
    this.sortMatchesIntoRounds(games, roundMatches);
    const matchesToShow = this.getMatchesToShow(roundMatches, props.rounds, 1);
    const nextRoundMatches = this.getNextRoundMatches(
      roundMatches,
      props.rounds,
      1
    );

    this.state = {
      selectedRoundNum: 1,
      roundMatches,
      matchesToShow,
      nextRoundMatches
    };
  }

  // Sort the schedule into rounds
  initRoundMatches = function(
    games: TennisMatch[],
    rounds: number
  ): RoundMatches[] {
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

    return roundMatches;
  };

  sortMatchesIntoRounds = function(
    games: TennisMatch[],
    roundMatches: RoundMatches[]
  ): void {
    games.forEach(function(game) {
      if (game.status !== "cancelled") {
        const round = roundMatches.find(
          r => r.round == game.tournamentRound.name
        );
        if (round) round.matches.push(game);
      }
    });
  };

  getMatchesToShow = (
    roundMatches: RoundMatches[],
    maxRounds: number,
    roundInTourn: number
  ): TennisMatch[] => {
    const selectedRound = this.getSelectedRound(maxRounds, roundInTourn);
    const roundToShow = roundMatches.find(r => r.round === selectedRound);
    const matchesToShow = roundToShow ? roundToShow.matches : [];
    return matchesToShow.sort(this.sortTennisMatches);
  };

  // Get index of round in roundMatches and find next round
  getNextRoundMatches = (
    roundMatches: RoundMatches[],
    maxRounds: number,
    roundInTourn: number
  ): TennisMatch[] => {
    const selectedRound = this.getSelectedRound(maxRounds, roundInTourn);
    const index = roundMatches.map(e => e.round).indexOf(selectedRound);
    const nextRoundMatches =
      index < maxRounds - 1 ? roundMatches[index + 1].matches : [];
    return nextRoundMatches.sort(this.sortTennisMatches);
  };

  getSelectedRound = function(maxRounds: number, roundInTourn: number): string {
    return roundInTourn == maxRounds
      ? "final"
      : roundInTourn == maxRounds - 1
      ? "semifinal"
      : roundInTourn == maxRounds - 2
      ? "quarterfinal"
      : `round_of_${Math.pow(2, maxRounds - roundInTourn + 1)}`;
  };

  sortTennisMatches = function(a, b) {
    if (
      a.competitors.length &&
      b.competitors.length &&
      a.competitors[0].bracketNumber &&
      b.competitors[0].bracketNumber
    )
      return a.competitors[0].bracketNumber - b.competitors[0].bracketNumber;
    return 0;
  };

  showRound = () => {};

  render() {
    console.log(this.state.matchesToShow);
    console.log(this.state.nextRoundMatches);
    return (
      <div className="margin-bot">
        <h2>Matches</h2>
        <div>
          <Button onClick={this.showRound} className="left">
            Left
          </Button>
          <Button onClick={this.showRound} className="right">
            Right
          </Button>
        </div>
        <div className="tournament-wrapper">
          <div>
            {this.state.matchesToShow.map((m, i) => {
              const topOrBotMatchup = i % 2 == 0 ? "top" : "bot";
              return (
                <TennisMatchup
                  key={i}
                  match={m}
                  topOrBotMatchup={topOrBotMatchup}
                />
              );
            })}
          </div>
          <div>
            {this.state.nextRoundMatches.map((m, i) => {
              return <NextTennisMatchup key={i} match={m} />;
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default TennisMatches;
