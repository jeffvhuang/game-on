import React from 'react';
import { object, string } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { paths } from '../../../../helpers/constants';
import { getFormattedTime } from '../../../../helpers/utils';
import { getLolTournaments } from '../../../redux/actions/lol-actions';

import SelectDropdown from '../../common/SelectDropdown';
import LolTournamentMatches from './LolTournamentMatches';

const propTypes = {
  lol: object.isRequired,
  actions: object.isRequired,
  tournamentId: string,
  tournamentName: string
};

class LolTournamentContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: []
    };
  }

  componentDidMount() {
    const props = this.props;
    if (!props.lol.tournaments.length) props.actions.getLolTournaments();
  }

  handleChange = values => this.setState({ values });

  getTeams = (tournamentId) => {
    const tournament = this.props.lol.tournaments.find(x => x.id == tournamentId);
    return (tournament != null) ? tournament.teams : [];
  }

  getMatchesForTable = (data, values) => {
    const matches = [];
    // Create objects for every match or filter matches that include one of the selected teams
    if (!values.length) {
      for (let i = 0; i < data.length; i++) {
        const match = data[i];
        matches.push(this.getMatchTableObject(match));
      }
    } else {
      for (let i = 0; i < data.length; i++) {
        const match = data[i];
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
      time: getFormattedTime(startDate)
    };
  }

  render() {
    return (
      <div className="section">
        <h2>{this.props.tournamentName}</h2>
        <div className="select-dd">
          <SelectDropdown handleChange={this.handleChange}
            options={this.getTeams(this.props.tournamentId)} />
        </div>
        <div className="">
          <LolTournamentMatches header="Matches"
            matches={this.getMatchesForTable(
              this.props.lol.tournamentMatches, 
              this.state.values)} />
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
    getLolTournaments
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LolTournamentContainer);

