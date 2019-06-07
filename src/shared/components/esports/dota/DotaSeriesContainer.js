import React from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { paths } from '../../../../helpers/constants';
import { getDotaSeries, getDotaTournamentMatches, getDotaTournaments } from '../../../redux/actions/dota-actions';

import SelectDropdown from '../../common/SelectDropdown';
import DotaSeries from './DotaSeries';
import DotaTournamentMatchesContainer from './DotaTournamentMatchesContainer';

const propTypes = {
  match: object,
  dota: object.isRequired,
  actions: object.isRequired
};

class DotaSeriesContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: [],
      showTournamentsMatches: false,
    };
  }

  componentDidMount() {
    const { dota, actions } = this.props;
    if (dota.series.length < 1) actions.getDotaSeries();
  }

  getTeams = (tournaments) => {
    const tournament = tournaments.find(t => t.id == this.state.tournamentId);
    return (tournament) ? tournament.teams : [];
  }

  handleChange = values => this.setState({ values });

  selectTournament = (id) => {
    return () => {
      const { dota, actions } = this.props;
      if (!dota.tournaments.length) actions.getDotaTournaments();
      actions.getDotaTournamentMatches(id);
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

DotaSeriesContainer.propTypes = propTypes;

const mapStateToProps = (state) => ({
  dota: state.dota
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    getDotaSeries,
    getDotaTournamentMatches,
    getDotaTournaments
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DotaSeriesContainer);
