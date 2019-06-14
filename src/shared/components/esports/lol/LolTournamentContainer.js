import React from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { paths } from '../../../../helpers/constants';
import { getFormattedTime, getTournamentNameFromMatch } from '../../../../helpers/utils';
import { getLolTournaments, getLolTournamentMatches } from '../../../redux/actions/lol-actions';

import ManualSelectDropdown from '../../common/ManualSelectDropdown';
import LolTournamentMatches from './LolTournamentMatches';
import SingleTournamentSelectDropdown from '../../common/SingleTournamentSelectDropdown';
import MatchData from './MatchData';

const propTypes = {
  lol: object.isRequired,
  actions: object.isRequired
};

class LolTournamentContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: [],
      tournamentId: null
    };
  }

  componentDidMount() {
    const { lol, actions } = this.props;
    if (!lol.tournaments.length) actions.getLolTournaments();
  }

  handleChange = values => this.setState({ values });
  handleTournamentChange = tournamentId => {
    const { lol, actions } = this.props;
    if (!lol.tournamentMatches.length || lol.tournamentMatches[0].tournament.id != tournamentId)
      actions.getLolTournamentMatches(tournamentId);
    this.setState({ tournamentId, values: [] });
  }

  getTournamentId = (id, tournamentMatches) => {
    if (tournamentMatches.length) return tournamentMatches[0].tournament.id;
    return id;
  }

  getTournamentName = (tournamentMatches) => {
    return (tournamentMatches.length) ? getTournamentNameFromMatch(tournamentMatches[0]) : '';
  }

  getTeams = (tournamentMatches) => {
    if (tournamentMatches.length) {
      const id = tournamentMatches[0].tournament.id;
      const tournament = this.props.lol.tournaments.find(x => x.id == id);
      return (tournament != null) ? tournament.teams : [];
    }
    return [];
  }

  getMatchesForTable = (tournamentMatches, values) => {
    const matches = [];
    // Create objects for every match or filter matches that include one of the selected teams
    if (!values.length) {
      for (let i = 0; i < tournamentMatches.length; i++) {
        const match = tournamentMatches[i];
        matches.push(this.getMatchTableObject(match));
      }
    } else {
      for (let i = 0; i < tournamentMatches.length; i++) {
        const match = tournamentMatches[i];
        if (values.some(v => v == match.opponents[0].opponent.name
          || v == match.opponents[1].opponent.name))
          matches.push(this.getMatchTableObject(match));
      }
    }
    return matches;
  }

  getMatchTableObject = match => {
    const startDate = new Date(match.beginAt);
    return {
      key: match.id,
      name: match.name,
      team1: match.opponents[0].opponent.name,
      team2: match.opponents[1].opponent.name,
      date: startDate.toDateString().slice(0, -5),
      time: getFormattedTime(startDate),
      games: match.games,
      beginAt: match.beginAt,
      endAt: match.endAt,
      opponents: match.opponents
    };
  }

  getExpandedRow = () => {
    return match => <MatchData match={match} 
      getWinnerName={this.getWinnerName}
      getWinnerLogo={this.getWinnerLogo} />;
  }

  getWinnerName = (winnerId, opponents) => {
    const winner = opponents.find(x => x.opponent.id == winnerId);
    return winner.opponent.name;
  }

  getWinnerLogo = (winnerId, opponents) => {
    const winner = opponents.find(x => x.opponent.id == winnerId);
    return winner.opponent.imageUrl;
  }

  render() {
    return (
      <div className="section">
        <div className="select-dd">
          <SingleTournamentSelectDropdown handleChange={this.handleTournamentChange}
            options={this.props.lol.tournaments}
            value={this.getTournamentId(this.state.tournamentId, this.props.lol.tournamentMatches)} />
        </div>
        <h2>{this.getTournamentName(this.props.lol.tournamentMatches)}</h2>
        <div className="select-dd">
          <ManualSelectDropdown handleChange={this.handleChange}
            options={this.getTeams(this.props.lol.tournamentMatches)}
            values={this.state.values} />
        </div>
        <div>
          <LolTournamentMatches matches={this.getMatchesForTable(
            this.props.lol.tournamentMatches,
            this.state.values)}
            getRow={this.getExpandedRow} />
          <Link to={paths.EVENTS} className="right">More ></Link>
        </div>
      </div>
    );
  }
}

LolTournamentContainer.propTypes = propTypes;

const mapStateToProps = (state) => ({
  lol: state.lol
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    getLolTournaments,
    getLolTournamentMatches
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LolTournamentContainer);

