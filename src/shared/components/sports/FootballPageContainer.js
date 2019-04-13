import React from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { paths } from '../../../helpers/constants';
import { getEplTeams,
  getEplSchedule, 
  getChampionsLeagueVideos, 
  getEuropaLeagueVideos } from '../../redux/actions/epl-actions';

import VideoThumbnails from '../common/VideoThumbnails';
import EplSelectDropdown from './EplSelectDropdown';
import FootballScheduleSection from './FootballScheduleSection';

const propTypes = {
  epl: object.isRequired,
  actions: object.isRequired
};

class FootballPageContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: []
    };
  }

  componentDidMount() {
    const props = this.props;
    if (props.epl.videos.length < 1) {
      props.actions.getChampionsLeagueVideos();
      props.actions.getEuropaLeagueVideos();
    } 
    if (props.epl.teams.length < 1) props.actions.getEplTeams();
    if (props.epl.schedule.length < 1) props.actions.getEplSchedule();
  }

  handleChange = values => {
    this.setState({ values });
  }

  resetInitialState = () => {
    this.setState({
      gamesToday: this.props.epl.gamesToday,
      upcoming: this.props.epl.upcoming 
    });
  }

  // Teams will be an object array
  sortTeamsForDropdown = (teams) => {
    return teams.sort(function(a, b) {
      const textA = a.name.toUpperCase();
      const textB = b.name.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  }

  render() {
    return (
      <div>
        <div className="section">
          <div className="mid-flex">
            <video controls width="600" height="400" />
          </div>
        </div>
        <h1>Football: English Premier League</h1>
        <EplSelectDropdown handleChange={this.handleChange}
          teams={this.sortTeamsForDropdown(this.props.epl.teams)} />
        <VideoThumbnails heading="Football"
          thumbnails={this.props.epl.thumbnails}
          showCount={4}
          showMore
          showMoreLink={paths.HIGHLIGHTS + '/football/epl'} />
        <div className="section">
          <FootballScheduleSection games={this.props.epl.gamesToday}
            header="Today's Games"
            values={this.state.values} />
          <FootballScheduleSection games={this.props.epl.upcoming}
            header="Upcoming"
            values={this.state.values} />
          <Link to={paths.EVENTS} className="right">More ></Link>
        </div>
      </div>
    );
  }
}

FootballPageContainer.propTypes = propTypes;

const mapStateToProps = (state) => ({
  epl: state.epl
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ 
    getEplSchedule,
    getEplTeams,
    getChampionsLeagueVideos, 
    getEuropaLeagueVideos }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(FootballPageContainer);
