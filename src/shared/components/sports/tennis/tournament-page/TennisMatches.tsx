import * as React from "react";
import { connect } from "react-redux";
import { Button } from "antd";

import TennisMatchup from "./TennisMatchup";
import { TennisMatch } from "../../../../../types/tennis-api/tennis-match.model";
import NextTennisMatchup from "./NextTennisMatchup";
import {
  getTennisTournamentSchedule,
  clearTennisTournamentSchedule
} from "../../../../redux/tennis/tennis-actions";
import { TennisState } from "../../../../redux/tennis/tennis-types";
import { RoundMatches } from "../../../../../types/tennis-api/round-matches.model";
import { ReduxState } from "../../../../redux/redux-state";

//#region interfaces
interface StateProps {
  tournamentId: string;
  values: string[];
  tennis: TennisState;
}

interface DispatchProps {
  getTennisTournamentSchedule;
  clearTennisTournamentSchedule;
}

interface State {
  selectedRoundNum: number;
  matchesToShow: TennisMatch[];
  nextRoundMatches: TennisMatch[];
}
type Props = StateProps & DispatchProps;
//#endregion

class TennisMatches extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    const { tournamentRounds } = props.tennis;

    if (this.isDifferentSchedule(tournamentRounds, props.tournamentId)) {
      props.clearTennisTournamentSchedule();
    }

    // const matchesToShow = this.getMatchesToShow(tournamentRounds, props.rounds, 1);
    // const nextRoundMatches = this.getNextRoundMatches(
    //   roundMatches,
    //   props.rounds,
    //   1
    // );

    this.state = {
      selectedRoundNum: 1,
      matchesToShow: [],
      nextRoundMatches: []
    };
  }

  componentDidMount() {
    const { tennis, tournamentId } = this.props;
    this.getTournamentSchedule(tennis.tournamentRounds, tournamentId);
  }

  getTournamentSchedule = (rm: RoundMatches[], id: string) => {
    if (rm.length < 1 || this.isDifferentSchedule(rm, id))
      this.props.getTennisTournamentSchedule(id);
  };

  isDifferentSchedule = (rm: RoundMatches[], id: string): boolean => {
    return rm.length > 0 && rm[0].matches[0].tournament.id !== id;
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
    console.log(this.props.tennis.tournamentRounds);
    // console.log(this.state.matchesToShow);
    // console.log(this.state.nextRoundMatches);
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
//#region redux connect
const mapStateToProps = (state: ReduxState) => ({
  tennis: state.tennis
});

const mapDispatchToProps = {
  getTennisTournamentSchedule,
  clearTennisTournamentSchedule
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TennisMatches);
//#endregion
