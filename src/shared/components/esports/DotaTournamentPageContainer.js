import React from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { paths } from '../../../helpers/constants';
import { getDOTASchedule } from '../../../helpers/utils';
import { getDotaVideos, getDotaTournaments, getDotaTeams } from '../../redux/actions/dota-actions';

import VideoThumbnails from '../common/VideoThumbnails';
import SelectDropdown from '../common/SelectDropdown';
import DotaMatches from './DotaMatches';

const propTypes = {
  match: object,
  dota: object.isRequired,
  actions: object.isRequired
};

class DotaTournamentPageContainer extends React.Component {
  constructor(props) {
    super(props);

    const tournamentId = props.match.params.tournamentNumber;
    const tournaments = props.dota.tournaments;
    let tournament;
    if (tournaments > 0) tournament = tournaments.find(t => t.id == tournamentId);

    this.state = {
      values: [],
      tournamentId: tournamentId,
      tournament: (tournament) ? tournament : { matches: [] }
    };
  }

  componentDidMount() {
    const props = this.props;
    // if (props.dota.teams.length < 1) props.actions.getDotaTeams();
    if (props.dota.tournaments.length < 1)
      props.actions.getDotaTournaments().then(data => {
        const tournament = data.find(t => t.id == this.state.tournamentId);
        if (tournament) this.setState({ tournament });
      });
  }

  handleChange = values => this.setState({ values });

  getMatchesForTournament = (tournaments) => {
    const tournament = tournaments.find(t => t.slug == "starladder-imbatv-minor-2-2019-qualifier-southeast-asia");
    return tournament.matches;
  }

  render() {
    return (
      <div>
        <h1>Dota 2</h1>
        <SelectDropdown handleChange={this.handleChange}
          options={this.props.dota.teams} />
        <div className="section">
          <DotaMatches header="Matches"
            games={this.state.tournament.matches}
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
    getDotaTournaments
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DotaTournamentPageContainer);

