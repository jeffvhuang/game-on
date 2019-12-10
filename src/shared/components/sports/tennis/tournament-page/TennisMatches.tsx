import * as React from "react";
import { connect } from "react-redux";
import { Button } from "antd";

import TennisRoundLeft from "./TennisRoundLeft";
import TennisRoundRight from "./TennisRoundRight";
import { TennisMatch } from "../../../../../types/tennis-api/tennis-match.model";
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
  selectedRound: string;
  matchesToShow: TennisMatch[];
  nextRoundMatches: TennisMatch[];
}
type Props = StateProps & DispatchProps;
//#endregion

class TennisMatches extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    const { tournamentRounds } = props.tennis;

    if (this.isDifferentSchedule(tournamentRounds, props.tournamentId))
      props.clearTennisTournamentSchedule();

    this.state = {
      selectedRound: "",
      matchesToShow: this.getMatchesToShow(tournamentRounds),
      nextRoundMatches: this.getNextRoundMatches(tournamentRounds)
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
    roundInTourn: string = ""
  ): TennisMatch[] => {
    if (roundMatches.length < 1) return [];
    const roundToShow = roundMatches.find(r => r.round === roundInTourn);
    const matchesToShow = roundToShow
      ? roundToShow.matches
      : roundMatches[0].matches;
    return matchesToShow.sort(this.sortTennisMatches);
  };

  // Get index of round in roundMatches and find next round
  getNextRoundMatches = (
    roundMatches: RoundMatches[],
    roundInTourn: string = ""
  ): TennisMatch[] => {
    if (roundMatches.length < 2) return [];
    const index = roundMatches.map(e => e.round).indexOf(roundInTourn);
    const nextRoundMatches =
      index < roundMatches.length - 1 ? roundMatches[index + 1].matches : [];
    return nextRoundMatches.sort(this.sortTennisMatches);
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
          <TennisRoundLeft
            matchesToShow={this.getMatchesToShow(
              this.props.tennis.tournamentRounds
            )}
          />
          <TennisRoundRight
            matchesToShow={this.getNextRoundMatches(
              this.props.tennis.tournamentRounds
            )}
          />
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
