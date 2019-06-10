import React from 'react';
import { object, string } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { paths } from '../../../../helpers/constants';
import { getFormattedTime, getTournamentName, getTournamentNameFromMatch } from '../../../../helpers/utils';
import { getLolMatches } from '../../../redux/actions/lol-actions';

import SelectDropdown from '../../common/SelectDropdown';
import LolTournamentMatches from './LolTournamentMatches';
import TournamentSelectDropdown from '../../common/TournamentSelectDropdown';

const propTypes = {
  lol: object.isRequired,
  actions: object.isRequired,
  tournament: object,
  tournamentName: string
};

class LolPageContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: [],
      tournamentValues: (props.tournament != null) ? [getTournamentName(props.tournament)] : [],
      // matches: (props.tournamentId) ? props.lol.tournamentMatches : props.lol.matches
    };
  }

  componentDidMount() {
    const props = this.props;
    if (props.lol.matches.length < 1) props.actions.getLolMatches();
  }

  handleChange = values => this.setState({ values });
  handleTournamentChange = values => this.setState({ tournamentValues: values });

  getTeams = (tournament) => {
    return (tournament != null) ? tournament.teams : [];
  }

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
      time: getFormattedTime(startDate)
    };
  }

  render() {
    return (
      <div className="section">
        <h2>{this.props.tournamentName}</h2>
        <div className="select-dd">
          <SelectDropdown handleChange={this.handleChange}
            options={this.getTeams(this.props.tournament)} />
        </div>
        <div className="select-dd">
          <TournamentSelectDropdown handleChange={this.handleTournamentChange}
            options={this.props.lol.tournaments} />
        </div>
        <div className="">
          <LolTournamentMatches header="Matches"
            matches={this.getMatchesForTable(
              this.props.lol.matches, 
              this.state.values,
              this.state.tournamentValues)} />
          <Link to={paths.EVENTS} className="right">More ></Link>
        </div>
      </div>
    );
  }
}

LolPageContainer.propTypes = propTypes;

const mapStateToProps = (state) => ({
  lol: state.lol
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    getLolMatches
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LolPageContainer);

