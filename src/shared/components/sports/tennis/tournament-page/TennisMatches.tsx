import * as React from "react";
import { connect } from "react-redux";
import { Button, Icon } from "antd";

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
      selectedRound: ""
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
    if (!roundInTourn)
      return roundMatches[1].matches.sort(this.sortTennisMatches);
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

  showRound = (isNext: boolean) => {
    return () => {
      const { tournamentRounds } = this.props.tennis;
      const currentRound = this.state.selectedRound
        ? this.state.selectedRound
        : tournamentRounds[0].round;
      const index = tournamentRounds.map(r => r.round).indexOf(currentRound);
      const nextIndex = isNext ? index + 1 : index - 1;
      const nextRound = tournamentRounds[nextIndex].round;
      this.setState({ selectedRound: nextRound });
    };
  };

  isBtnDisabled = (isRightButton: boolean): boolean => {
    const { tournamentRounds } = this.props.tennis;
    // Disable both buttons when no rounds to show
    if (tournamentRounds.length < 1) return true;

    if (isRightButton) {
      // Disabled Right button if showing second to last
      // (since last round will be shown in right column)
      const secondLastIndex = tournamentRounds.length - 2;
      return (
        this.state.selectedRound == tournamentRounds[secondLastIndex].round
      );
    } else {
      // Disabled left if first round selected
      if (!this.state.selectedRound) return true;
      return this.state.selectedRound == tournamentRounds[0].round;
    }
  };

  render() {
    return (
      <div className="margin-bot">
        <h2>Matches</h2>
        <div>
          <Button
            onClick={this.showRound(false)}
            className="left"
            disabled={this.isBtnDisabled(false)}
          >
            <Icon type="left" />
          </Button>
          <Button
            onClick={this.showRound(true)}
            className="right"
            disabled={this.isBtnDisabled(true)}
          >
            <Icon type="right" />
          </Button>
        </div>
        <div className="tournament-wrapper">
          <TennisRoundLeft
            selectedRound={this.state.selectedRound}
            getMatchesFn={this.getMatchesToShow}
            roundMatches={this.props.tennis.tournamentRounds}
          />
          <TennisRoundRight
            selectedRound={this.state.selectedRound}
            getMatchesFn={this.getNextRoundMatches}
            roundMatches={this.props.tennis.tournamentRounds}
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
