import React from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { paths } from '../../../helpers/constants';
import { getDOTASchedule } from '../../../helpers/utils';
import { getDotaVideos, getDotaTournaments, getDotaTeams } from '../../redux/actions/dota-actions';

import VideoThumbnails from '../common/VideoThumbnails';
import EventSelectDropdown from '../common/EventSelectDropdown';
import EventDatesSection from '../common/EventDatesSection';

const propTypes = {
  match: object,
  dota: object.isRequired,
  actions: object.isRequired
};

class DotaPageContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      schedule: {},
      selected: [],
      ongoing: [],
      upcoming: [],
      completed: []
    };
  }

  componentDidMount() {
    const props = this.props;
    if (props.dota.videos.length < 1) props.actions.getDotaVideos();
    // if (props.dota.teams.length < 1) props.actions.getDotaTeams();
    // if (props.dota.proMatches.length < 1) props.actions.getDotaProMatches();
  }

  handleChange = values => {

  }

  getMatchesForTournament = (tournaments) => {
    const tournament = tournaments.find(t => t.slug == "starladder-imbatv-minor-2-2019-qualifier-southeast-asia");
    return tournament.matches;
  }

  render() {
    return (
      <div>
        <h1>Dota 2</h1>
        {/* <EventSelectDropdown handleChange={this.handleChange}
          events={this.getTournamentNames()} /> */}
        <VideoThumbnails heading="Dota 2 Videos"
          thumbnails={this.props.dota.thumbnails}
          showCount={4}
          showMore
          showMoreLink={paths.HIGHLIGHTS + '/dota'} />
        <EventDatesSection ongoing={this.state.ongoing}
          upcoming={this.state.upcoming}
          completed={this.state.completed} />
      </div>
    );
  }
}

DotaPageContainer.propTypes = propTypes;

const mapStateToProps = (state) => ({
  dota: state.dota
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ 
    getDotaVideos, 
    getDotaTournaments, 
    getDotaTeams }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DotaPageContainer);

