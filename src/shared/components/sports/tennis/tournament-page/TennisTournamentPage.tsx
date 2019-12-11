//#region imports
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";

import {
  getTennisTournamentInfo,
  clearTennisTournamentInfo
} from "../../../../redux/tennis/tennis-actions";

import SelectDropdown from "../../../common/SelectDropdown";
import TennisMatches from "./TennisMatches";
import { TennisState } from "../../../../redux/tennis/tennis-types";
import { ReduxState } from "../../../../redux/redux-state";
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
  getTennisTournamentInfo;
  clearTennisTournamentInfo;
}

interface State {
  tournamentId: string;
  values: string[];
  tournamentName: string;
}

type Props = StateProps & DispatchProps;
//#endregion

class TennisTournamentPage extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    const id = "sr:tournament:" + props.match.params.tournamentNumber;
    const { tournamentInfo } = props.tennis;
    let isSameInfo = true;

    if (this.isDifferentId(tournamentInfo, id)) {
      isSameInfo = false;
      props.clearTennisTournamentInfo();
    }

    this.state = {
      tournamentId: id,
      values: [],
      tournamentName: isSameInfo ? tournamentInfo.tournament.name : ""
    };
  }

  //#region class methods
  componentDidMount() {
    const { tournamentInfo } = this.props.tennis;
    this.getTournamentInfo(tournamentInfo, this.state.tournamentId);
  }

  isDifferentId = (info: TennisTournamentInfo, id: string): boolean => {
    return !info.tournament || info.tournament.id !== id;
  };

  getTournamentInfo = (info: TennisTournamentInfo, id: string) => {
    if (!info.tournament || info.tournament.id !== id)
      this.props.getTennisTournamentInfo(id).then(data => {
        if (data)
          this.setState({
            tournamentName: data.tournament.currentSeason.name
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
          values={this.state.values}
          tournamentId={this.state.tournamentId}
        />
      </div>
    );
  }
}

//#region redux connect
const mapStateToProps = (state: ReduxState) => ({
  tennis: state.tennis
});

const mapDispatchToProps = {
  getTennisTournamentInfo,
  clearTennisTournamentInfo
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TennisTournamentPage);
//#endregion
