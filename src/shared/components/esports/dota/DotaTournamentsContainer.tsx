import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { paths } from "../../../../helpers/constants";
import {
  getDotaTournaments,
  getDotaTournamentMatches
} from "../../../redux/dota/dota-actions";

import SelectDropdown from "../../common/SelectDropdown";
import DotaTournaments from "./DotaTournaments";
import DotaTournamentMatchesContainer from "./DotaTournamentMatchesContainer";
import { ReduxState } from "../../../redux/redux-state";
import { DotaState } from "../../../redux/dota/dota-types";
import { ESportsTournament } from "../../../../types/esports-api/esports-tournament.model";

interface StateProps {
  dota: DotaState;
}
interface DispatchProps {
  getDotaTournaments;
  getDotaTournamentMatches;
}
type Props = StateProps & DispatchProps;
interface State {
  values: string[];
  showTournamentsMatches: boolean;
  tournament?: ESportsTournament;
}

class DotaTournamentsContainer extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      values: [],
      showTournamentsMatches: false,
      tournament: {} as ESportsTournament
    };
  }

  componentDidMount() {
    const { dota } = this.props;
    if (dota.tournaments.length < 1) this.props.getDotaTournaments();
  }

  handleChange = values => this.setState({ values });

  selectTournament = id => {
    return () => {
      this.props.getDotaTournamentMatches(id);
      const tournament = this.props.dota.tournaments.find(t => t.id == id);
      this.setState({
        showTournamentsMatches: true,
        tournament
      });
    };
  };

  render() {
    const { dota } = this.props;
    const mainClass = this.state.showTournamentsMatches
      ? "reduced-side-width"
      : "full-width";
    const ddClass = this.state.showTournamentsMatches ? "select-dd-left" : "";
    const teams = this.state.tournament ? this.state.tournament.teams : [];

    return (
      <div className="section flex">
        <div className={mainClass}>
          <div className={ddClass}>
            <SelectDropdown
              handleChange={this.handleChange}
              options={this.props.dota.teams}
            />
          </div>
          <DotaTournaments
            header="Ongoing"
            tournaments={dota.ongoing}
            values={this.state.values}
            showTournamentsMatches={this.state.showTournamentsMatches}
            selectTournament={this.selectTournament}
          />
          <DotaTournaments
            header="Upcoming"
            tournaments={dota.upcoming}
            values={this.state.values}
            showTournamentsMatches={this.state.showTournamentsMatches}
            selectTournament={this.selectTournament}
          />
          <DotaTournaments
            header="Completed"
            tournaments={dota.completed}
            values={this.state.values}
            showTournamentsMatches={this.state.showTournamentsMatches}
            selectTournament={this.selectTournament}
          />
          <Link to={paths.EVENTS} className="right">
            More >
          </Link>
        </div>
        {this.state.showTournamentsMatches && (
          <DotaTournamentMatchesContainer
            tournament={this.state.tournament}
            matches={dota.tournamentMatches}
            teams={teams}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  dota: state.dota
});

const mapDispatchToProps = {
  getDotaTournaments,
  getDotaTournamentMatches
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DotaTournamentsContainer);
