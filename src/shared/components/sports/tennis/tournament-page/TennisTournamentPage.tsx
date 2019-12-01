//#region imports
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { RouteComponentProps } from "react-router";

import { paths } from "../../../../../helpers/constants";
import {
  getTennisTournamentSchedule,
  getTennisTournamentInfo,
  clearTennisTournamentSchedule,
  clearTennisTournamentInfo
} from "../../../../redux/tennis/tennis-actions";

import SelectDropdown from "../../../common/SelectDropdown";
import TennisMatches from "./TennisMatches";
import { TennisState } from "../../../../redux/tennis/tennis-types";
import { ReduxState } from "../../../../redux/redux-state";
import { TennisMatch } from "../../../../../types/tennis-api/tennis-match.model";
import { TennisTournamentInfo } from "../../../../../types/tennis-api/tennis-tournament-info.model";
//#endregion
//#region interfaces
interface MatchParams {
  tournamentNumber: string;
}
interface StateProps extends RouteComponentProps<MatchParams> {
  tennis: TennisState;
}

interface DispatchProps {
  getTennisTournamentSchedule;
  getTennisTournamentInfo;
  clearTennisTournamentSchedule;
  clearTennisTournamentInfo;
}

interface State {
  tournamentId: string;
  values: string[];
  tournamentName: string;
  rounds: number;
}

type Props = StateProps & DispatchProps;
//#endregion

class TennisTournamentPage extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    const id = "sr:tournament:" + props.match.params.tournamentNumber;
    const { tournamentInfo, tournamentSchedule } = props.tennis;
    let isSameInfo = true;

    if (this.isDifferentId(tournamentInfo, id)) {
      isSameInfo = false;
      props.clearTennisTournamentInfo();
    }

    if (this.isDifferentSchedule(tournamentSchedule, id)) {
      props.clearTennisTournamentSchedule();
    }

    this.state = {
      tournamentId: id,
      values: [],
      tournamentName: isSameInfo ? tournamentInfo.tournament.name : "",
      rounds: tournamentInfo.info.numberOfScheduledMatches
    };
  }

  //#region class methods
  componentDidMount() {
    const id = this.state.tournamentId;
    const { tournamentInfo, tournamentSchedule } = this.props.tennis;

    this.getTournamentSchedule(tournamentSchedule, id);
    this.getTournamentInfo(tournamentInfo, id);
  }

  isDifferentSchedule = (schedule: TennisMatch[], id: string): boolean => {
    return schedule.length > 0 && schedule[0].tournament.id !== id;
  };

  isDifferentId = (info: TennisTournamentInfo, id: string): boolean => {
    return !info.tournament || info.tournament.id !== id;
  };

  getTournamentSchedule = (schedule: TennisMatch[], id: string) => {
    if (schedule.length < 1 || this.isDifferentSchedule(schedule, id))
      this.props.getTennisTournamentSchedule(id);
  };

  getTournamentInfo = (info: TennisTournamentInfo, id: string) => {
    if (!info.tournament || info.tournament.id !== id)
      this.props.getTennisTournamentInfo(id).then(data => {
        if (data)
          this.setState({
            tournamentName: data.tournament.currentSeason.name,
            rounds: data.info.numberOfScheduledMatches
          });
      });
  };

  handleChange = values => this.setState({ values });
  //#endregion

  render() {
    return (
      <div className="section content">
        <h2 className="page-heading">{this.state.tournamentName}</h2>
        <SelectDropdown
          handleChange={this.handleChange}
          options={this.props.tennis.tournamentInfo.competitors || []}
        />
        <TennisMatches
          games={this.props.tennis.tournamentSchedule}
          header="Matches"
          values={this.state.values}
          rounds={this.state.rounds}
        />
        <Link to={paths.EVENTS} className="right">
          More >
        </Link>
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
  getTennisTournamentInfo,
  clearTennisTournamentSchedule,
  clearTennisTournamentInfo
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TennisTournamentPage);
//#endregion
