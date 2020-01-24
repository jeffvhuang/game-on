import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { paths } from "../../../../../helpers/constants";
import {
  getDotaSeries,
  getDotaTournamentMatches,
  getDotaTournaments
} from "../../../../redux/dota/dota-actions";

import SelectDropdown from "../../../common/SelectDropdown";
import DotaSeries from "./DotaSeries";
import { DotaState } from "../../../../redux/dota/dota-types";
import { ReduxState } from "../../../../redux/redux-state";

interface StateProps {
  dota: DotaState;
}
interface DispatchProps {
  getDotaSeries;
  getDotaTournamentMatches;
  getDotaTournaments;
}
type Props = StateProps & DispatchProps;
interface State {
  values: string[];
  tournamentId?: number;
}

class DotaSeriesListContainer extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      values: [],
      tournamentId: undefined
    };
  }

  getTeams = tournaments => {
    const tournament = tournaments.find(t => t.id == this.state.tournamentId);
    return tournament ? tournament.teams : [];
  };

  handleChange = values => this.setState({ values });

  selectTournament = id => {
    return () => {
      const { dota } = this.props;
      // if (!dota.tournaments.length) this.props.getDotaTournaments();
      // this.props.getDotaTournamentMatches(id);
      // TODO change this to link to new tournament page
      this.setState({
        tournamentId: id
      });
    };
  };

  render() {
    const { dota } = this.props;

    return (
      <div className="section flex">
        <div className="full-width">
          {/* <SelectDropdown handleChange={this.handleChange}
            options={this.props.dota.teams} /> */}
          <DotaSeries
            header="Ongoing"
            series={dota.ongoingSeries}
            values={this.state.values}
            selectTournament={this.selectTournament}
          />
          <DotaSeries
            header="Upcoming"
            series={dota.upcomingSeries}
            values={this.state.values}
            selectTournament={this.selectTournament}
          />
          <DotaSeries
            header="Completed"
            series={dota.completedSeries}
            values={this.state.values}
            selectTournament={this.selectTournament}
          />
          <Link to={paths.EVENTS} className="right">
            More >
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  dota: state.dota
});

const mapDispatchToProps = {
  getDotaSeries,
  getDotaTournamentMatches,
  getDotaTournaments
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DotaSeriesListContainer);
