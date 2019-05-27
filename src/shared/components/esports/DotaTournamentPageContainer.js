import React from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { paths } from '../../../helpers/constants';
import { getDotaTournaments,
  getDotaTournamentMatches,
  clearDotaTournamentMatches } from '../../redux/actions/dota-actions';

import SelectDropdown from '../common/SelectDropdown';
import DotaTournamentMatches from './DotaTournamentMatches';

const propTypes = {
  match: object,
  dota: object.isRequired,
  actions: object.isRequired
};

class DotaTournamentPageContainer extends React.Component {
  constructor(props) {
    super(props);
    const { match, dota, actions } = props;
    const tournamentId = match.params.tournamentNumber;

    // If different tournament selected, clear tournamentMatches in global state
    // to replace in componentDidMount
    if (dota.tournamentMatches.length > 0 && dota.tournamentMatches[0].tournamentId != tournamentId)
      actions.clearDotaTournamentMatches();
    
    // Find tournament from list to populate with teams for dropdown
    let tournament;
    let tournamentName;
    if (dota.tournaments.length > 0) {
      tournament = dota.tournaments.find(t => t.id == tournamentId);
      tournamentName = this.getTournamentName(tournament);
    } 

    this.state = {
      values: [],
      tournamentId: tournamentId,
      tournamentName: tournamentName,
      teams: (tournament) ? tournament.teams : []
    };
  }

  componentDidMount() {
    const { dota, actions } = this.props;

    // If no tournaments in global state, GET request and then populate dropdown
    if (dota.tournaments.length < 1) {
      actions.getDotaTournaments().then(data => {
        const tournament = data.find(t => t.id == this.state.tournamentId);
        this.setState({
          teams: tournament.teams,
          tournamentName: this.getTournamentName(tournament)
        });
      });
    }

    // GET tournament's matches
    if (dota.tournamentMatches.length < 1 ||
      (dota.tournamentMatches.length > 0 && dota.tournamentMatches[0].tournamentId != this.state.tournamentId) ) 
      actions.getDotaTournamentMatches(this.state.tournamentId);
  }

  getTournamentName = tournament => {
    let tournamentName = '';
    if (tournament) {
      if (tournament.league) tournamentName += tournament.league.name + ' ';
      if (tournament.series) tournamentName += tournament.series.name + ' ';
      tournamentName += tournament.name;
    }
    
    return tournamentName;
  }

  handleChange = values => this.setState({ values });

  render() {
    return (
      <div>
        <h1>Dota 2: {this.state.tournamentName}</h1>
        <SelectDropdown handleChange={this.handleChange}
          options={this.state.teams} />
        <div className="section">
          <DotaTournamentMatches header="Matches"
            matches={this.props.dota.tournamentMatches}
            values={this.state.values} />
          <Link to={paths.EVENTS} className="right">More ></Link>
        </div>
      </div>
    );
  }
}

DotaTournamentPageContainer.propTypes = propTypes;

const mapStateToProps = (state) => ({
  dota: state.dota
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    getDotaTournaments,
    getDotaTournamentMatches,
    clearDotaTournamentMatches
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DotaTournamentPageContainer);

