import React from 'react';
import { object, array } from 'prop-types';
import { Link } from 'react-router-dom';

import { paths } from '../../../helpers/constants';

import SelectDropdown from '../common/SelectDropdown';
import DotaTournamentMatches from './DotaTournamentMatches';

const propTypes = {
  tournament: object.isRequired,
  matches: array.isRequired
};

class DotaTournamentMatchesContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: [],
      tournamentName: this.getTournamentName(props.tournament)
    };
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
        <h2>{this.state.tournamentName}</h2>
        <SelectDropdown handleChange={this.handleChange}
          options={this.props.tournament.teams} />
        <div className="section">
          <DotaTournamentMatches header="Matches"
            matches={this.props.matches}
            values={this.state.values} />
          <Link to={paths.EVENTS} className="right">More ></Link>
        </div>
      </div>
    );
  }
}

DotaTournamentMatchesContainer.propTypes = propTypes;
export default DotaTournamentMatchesContainer;
