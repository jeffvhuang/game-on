import React from 'react';
import { object, array } from 'prop-types';
import { Link } from 'react-router-dom';

import { paths } from '../../../../helpers/constants';
import { getTournamentName } from '../../../../helpers/utils';

import SelectDropdown from '../../common/SelectDropdown';
import DotaTournamentMatches from './DotaTournamentMatches';

const propTypes = {
  tournament: object.isRequired,
  teams: array,
  matches: array.isRequired
};

class DotaTournamentMatchesContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: [],
      tournamentName: getTournamentName(props.tournament)
    };
  }

  handleChange = values => this.setState({ values });

  render() {
    return (
      <div className="page-main-section">
        <h2>{this.state.tournamentName}</h2>
        <div className="select-dd">
          <SelectDropdown handleChange={this.handleChange}
            options={this.props.teams} />
        </div>
        <div className="section-left">
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
