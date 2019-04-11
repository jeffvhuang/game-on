import React from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { paths } from '../../../helpers/constants';
import {  } from '../../../helpers/utils';
import { getEplTeams, getEplSchedule, getChampionsLeagueVideos } from '../../redux/actions/epl-actions';

import HighlightsContainer from '../landing/HighlightsContainer';
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
      videos: [
        "https://dummyimage.com/200x160/000/fff.jpg&text=Video",
        "https://dummyimage.com/200x160/000/fff.jpg&text=Video2",
        "https://dummyimage.com/200x160/000/fff.jpg&text=Video3",
        "https://dummyimage.com/200x160/000/fff.jpg&text=Video4"
      ],
      values: []
    };
  }

  componentDidMount() {
    const props = this.props;
    if (props.epl.videos.length < 1) props.actions.getChampionsLeagueVideos();
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
        <HighlightsContainer videos={this.state.videos} />
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
  actions: bindActionCreators({ getEplSchedule, getEplTeams, getChampionsLeagueVideos }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(FootballPageContainer);
