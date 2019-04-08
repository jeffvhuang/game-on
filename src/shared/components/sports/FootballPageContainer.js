import React from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { paths } from '../../../helpers/constants';
import {  } from '../../../helpers/utils';
import { getEplTeams, getEplSchedule, getEplVideos } from '../../redux/actions/epl-actions';

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
      gamesToday: props.epl.gamesToday,
      upcoming: props.epl.upcoming
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const epl = nextProps.epl;
    // Populate schedule once received in props
    if (prevState.upcoming.length < 1 &&
    (epl.gamesToday.length > 0 || epl.upcoming.length > 0)) {
      return {
        gamesToday: epl.gamesToday,
        upcoming: epl.upcoming
      };
    }
    return null;
  }

  componentDidMount() {
    const props = this.props;
    // if (props.epl.videos.length < 1) props.actions.getNbaVideos();
    if (props.epl.teams.length < 1) props.actions.getEplTeams();
    if (props.epl.schedule.length < 1) props.actions.getEplSchedule();
  }

  handleChange = values => {   
    const length = values.length; 
    // Set state arrays depending on whether value has been selected or removed
    if (length == 0) { // All removed
      this.resetInitialState();
    } else if (length == 1) {
      this.setState({
        gamesToday: this.props.epl.gamesToday.filter(
          g => g.awayTeam == values[0] || g.homeTeam == values[0]),
        upcoming: this.props.epl.upcoming.filter(
          g => g.awayTeam == values[0] || g.homeTeam == values[0])
      });
    } else {
      this.setState(() => {
        return this.handleSelect(values);
      });
    }
  }

  resetInitialState = () => {
    this.setState({
      gamesToday: this.props.epl.gamesToday,
      upcoming: this.props.epl.upcoming 
    });
  }
  
  handleSelect = (values) => {
    const today = [];
    const upcoming = [];

    this.props.epl.gamesToday.forEach(g => {
      if (values.some(x => x == g.homeTeam || x == g.awayTeam)) today.push(g);
    });

    this.props.epl.upcoming.forEach(g => {
      if (values.some(x => x == g.homeTeam || x == g.awayTeam)) upcoming.push(g);
    });

    return {
      gamesToday: today,
      upcoming: upcoming
    };
  };

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
          teams={this.props.epl.teams} />
        <HighlightsContainer videos={this.state.videos} />
        <div className="section">
          <FootballScheduleSection games={this.state.gamesToday} header="Today's Games" />
          <FootballScheduleSection games={this.state.upcoming} header="Upcoming" />
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
  actions: bindActionCreators({ getEplSchedule, getEplTeams, getEplVideos }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(FootballPageContainer);
