import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { paths } from '../../../../helpers/constants';
import { getDotaSeries, getDotaTournamentMatches, getDotaTournaments } from '../../../redux/dota/dota-actions';

import SelectDropdown from '../../common/SelectDropdown';
import DotaSeries from './DotaSeries';
import DotaTournamentMatchesContainer from './DotaTournamentMatchesContainer';
import { DotaState } from '../../../redux/dota/dota-types';
import { ReduxState } from '../../../redux/redux-state';

interface StateProps {
  dota: DotaState;
};
interface DispatchProps {
  getDotaSeries;
  getDotaTournamentMatches;
  getDotaTournaments;
}
type Props = StateProps & DispatchProps;
interface State {
  values: string[];
  showTournamentsMatches: boolean;
  tournamentId?: number;
}

class DotaSeriesContainer extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      values: [],
      showTournamentsMatches: false,
      tournamentId: undefined
    };
  }

  componentDidMount() {
    if (!this.props.dota.series.length) this.props.getDotaSeries();
  }

  getTeams = (tournaments) => {
    const tournament = tournaments.find(t => t.id == this.state.tournamentId);
    return (tournament) ? tournament.teams : [];
  }

  handleChange = values => this.setState({ values });

  selectTournament = (id) => {
    return () => {
      const { dota } = this.props;
      if (!dota.tournaments.length) this.props.getDotaTournaments();
      this.props.getDotaTournamentMatches(id);
      this.setState({
        showTournamentsMatches: true,
        tournamentId: id
      });
    };
  }

  render() {
    const { dota } = this.props;
    const mainClass = (this.state.showTournamentsMatches) ? "reduced-side-width" : "full-width";
    const ddClass = (this.state.showTournamentsMatches) ? "select-dd-left" : "select-dd";
    const showMatches = (this.state.showTournamentsMatches && dota.tournamentMatches.length > 0)
      ? true : false;

    return (
      <div className="section flex">
        <div className={mainClass}>
          {/* <div className={ddClass}>
            <SelectDropdown handleChange={this.handleChange}
              options={this.props.dota.teams} />
          </div> */}
          <DotaSeries header="Ongoing"
            series={dota.ongoingSeries}
            values={this.state.values}
            showTournamentsMatches={this.state.showTournamentsMatches}
            selectTournament={this.selectTournament} />
          <DotaSeries header="Upcoming"
            series={dota.upcomingSeries}
            values={this.state.values}
            showTournamentsMatches={this.state.showTournamentsMatches}
            selectTournament={this.selectTournament} />
          <DotaSeries header="Completed"
            series={dota.completedSeries}
            values={this.state.values}
            showTournamentsMatches={this.state.showTournamentsMatches}
            selectTournament={this.selectTournament} />
          <Link to={paths.EVENTS} className="right">More ></Link>
        </div>
        {showMatches &&
          <DotaTournamentMatchesContainer tournament={dota.tournamentMatches[0].tournament}
            matches={dota.tournamentMatches} teams={this.getTeams(dota.tournaments)} />}
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

export default connect(mapStateToProps, mapDispatchToProps)(DotaSeriesContainer);
