import React from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { paths } from '../../../../helpers/constants';
import { getFormattedTime, getTournamentNameFromMatch } from '../../../../helpers/utils';
import { getLolMatches, getLolTournaments } from '../../../redux/actions/lol-actions';

import SelectDropdown from '../../common/SelectDropdown';
import LolTournamentMatches from './LolTournamentMatches';
import TournamentSelectDropdown from '../../common/TournamentSelectDropdown';
import MatchData from './MatchData';

const propTypes = {
  lol: object.isRequired,
  actions: object.isRequired
};

class LolMatchesContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: [],
      tournamentValues: [],
    };
  }

  componentDidMount() {
    const props = this.props;
    if (!props.lol.matches.length) props.actions.getLolMatches();
    if (!props.lol.tournaments.length) props.actions.getLolTournaments();
  }

  handleChange = values => this.setState({ values });
  handleTournamentChange = tournamentValues => this.setState({ tournamentValues });

  getMatchesForTable = (data, values, tournamentValues) => {
    const matches = [];
    // Create objects for every match or filter matches that include one of the selected teams
    if (!values.length && !tournamentValues.length) {
      for (let i = 0; i < data.length; i++) {
        const match = data[i];
        matches.push(this.getMatchTableObject(match));
      }
    } else {
      for (let i = 0; i < data.length; i++) {
        const match = data[i];
        const tournamentNameFromMatch = getTournamentNameFromMatch(match);
        if (values.some(v => v == match.opponents[0].opponent.name 
          || v == match.opponents[1].opponent.name)
          || tournamentValues.some(t => t == tournamentNameFromMatch))
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
          <TournamentSelectDropdown handleChange={this.handleTournamentChange}
            options={this.props.lol.tournaments} />
        </div>
        <div className="select-dd">
          <SelectDropdown handleChange={this.handleChange}
            options={this.props.lol.matchesTeams} />
        </div>
        <div>
          <LolTournamentMatches header="Matches"
            matches={this.getMatchesForTable(
              this.props.lol.matches, 
              this.state.values,
              this.state.tournamentValues)}
            getRow={this.getExpandedRow} />
          <Link to={paths.EVENTS} className="right">More ></Link>
        </div>
      </div>
    );
  }
}

LolMatchesContainer.propTypes = propTypes;

const mapStateToProps = (state) => ({
  lol: state.lol
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    getLolMatches,
    getLolTournaments
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LolMatchesContainer);

