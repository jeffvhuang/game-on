import React from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { paths } from '../../../helpers/constants';
import { getDOTASchedule } from '../../../helpers/utils';
import { getDotaVideos, getDotaTournaments, getDotaTeams } from '../../redux/actions/dota-actions';

import VideoThumbnails from '../common/VideoThumbnails';
import EventSelectDropdown from '../common/EventSelectDropdown';
import DotaTournaments from './DotaTournaments';

const propTypes = {
  match: object,
  dota: object.isRequired,
  actions: object.isRequired
};

class DotaPageContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: []
    };
  }

  componentDidMount() {
    const props = this.props;
    // if (props.dota.videos.length < 1) props.actions.getDotaVideos();
    if (props.dota.tournaments.length < 1) props.actions.getDotaTournaments();
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
        {/* <EventSelectDropdown handleChange={this.handleChange}
          events={this.getTournamentNames()} /> */}
        {/* <VideoThumbnails heading="Dota 2 Videos"
          thumbnails={this.props.dota.thumbnails}
          showCount={4}
          showMore
          showMoreLink={paths.HIGHLIGHTS + '/dota'} /> */}
        <div className="section">
          <DotaTournaments header="Ongoing"
            games={this.props.dota.ongoing}
            values={this.state.values} />
          <DotaTournaments header="Upcoming"
            games={this.props.dota.upcoming}
            values={this.state.values} />
          <DotaTournaments header="Completed"
            games={this.props.dota.completed}
            values={this.state.values} />
          <Link to={paths.EVENTS} className="right">More ></Link>
        </div>
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
    getDotaTeams
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DotaPageContainer);

