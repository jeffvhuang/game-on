import React from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { isSameDate, sortNBASchedule } from '../../../helpers/utils';
import { getNbaSchedule, getNbaTeams } from '../../redux/actions/basketball-actions';

import HighlightsContainer from '../landing/HighlightsContainer';
import TeamSelectDropdown from '../common/TeamSelectDropdown';
import ScheduleContainer from './ScheduleContainer';

const propTypes = {
  basketball: object.isRequired,
  actions: object.isRequired
};

class BasketballPageContainer extends React.Component {
  constructor(props) {
    super(props);

    if (props.basketball.nba.teams.length < 1) props.actions.getNbaTeams();
    if (props.basketball.nba.schedule.length < 1) props.actions.getNbaSchedule();

    const today = new Date();
    const now = Date.now;

    this.state = {
      videos: [
        "https://dummyimage.com/200x160/000/fff.jpg&text=Video",
        "https://dummyimage.com/200x160/000/fff.jpg&text=Video2",
        "https://dummyimage.com/200x160/000/fff.jpg&text=Video3",
        "https://dummyimage.com/200x160/000/fff.jpg&text=Video4"
      ],
      schedule: {},
      selected: [],
      gamesToday: props.basketball.nba.schedule.filter(
        game => isSameDate(today, new Date(game.startTimeUTC))) || [],
      upcoming: props.basketball.nba.schedule.filter(
        game => game.startTimeUTC.getTime() > now  && 
        !isSameDate(today, new Date(game.startTimeUTC))) || []
        // TODO ?create function to check it is a date after today rather than check both time and date
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // Populate schedule once received in props
    if (!prevState.schedule.hasOwnProperty('gamesToday') && 
    nextProps.basketball.nba.schedule.length > 0) {
      const schedule = sortNBASchedule(nextProps.basketball.nba.schedule);
      return {
        schedule: schedule,
        gamesToday: schedule.gamesToday,
        upcoming: schedule.upcoming
      };
    }
    return null;
  }

  handleChange = values => {   
    const length = values.length; 
    // Set state arrays depending on whether value has been selected or removed
    if (length == 0) { // All removed
      this.resetInitialState();
    } else {
      this.setState(prevState => {
        if (length > prevState.selected.length) {
          return this.handleAddedSelect(values, prevState);
        } else {
          return this.handleRemovedSelect(values, prevState);
        }
      });
    }
  }

  resetInitialState = () => {
    this.setState(prevState => ({ 
      selected: [],
      gamesToday: prevState.schedule.gamesToday,
      upcoming: prevState.schedule.upcoming
    }));
  }
  
  handleAddedSelect = (values, prevState) => {
    const selectedTeam = values[values.length - 1];
  
    const todayForSelected = prevState.schedule.gamesToday.filter(
      game => game.hTeam.shortName == selectedTeam || game.vTeam.shortName == selectedTeam
    );
    const upcomingForSelected = prevState.schedule.upcoming.filter(
      game => game.hTeam.shortName == selectedTeam || game.vTeam.shortName == selectedTeam
    );
  
    // If only one has been selected, the previous data was all the data,
    // so replace instead of add on.
    if (values.length == 1) {
      return {
        selected: values,
        gamesToday: todayForSelected,
        upcoming: upcomingForSelected
      };
    } else {
      return {
        selected: values,
        gamesToday: prevState.gamesToday.concat(todayForSelected),
        upcoming: prevState.upcoming.concat(upcomingForSelected)
      };
    }
  };
  
  handleRemovedSelect = (values, prevState) => {
    const previousValues = prevState.selected;
    let selectedTeam;
    // Find the removed sport
    for (let i = 0; i < previousValues.length; i++) {
      if (!values.includes(previousValues[i])) {
        selectedTeam = previousValues[i];
        break;
      }
    }
  
    const filteredToday = this.state.gamesToday.filter(
      game => game.hTeam.shortName != selectedTeam && game.vTeam.shortName != selectedTeam
    );
    const filteredUpcoming = this.state.upcoming.filter(
      game => game.hTeam.shortName != selectedTeam && game.vTeam.shortName != selectedTeam
    );
  
    return {
      selected: values,
      gamesToday: filteredToday,
      upcoming: filteredUpcoming
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
        <h1>Basketball</h1>
        <TeamSelectDropdown handleChange={this.handleChange} 
          teams={this.props.basketball.nba.teams} />
        <HighlightsContainer videos={this.state.videos} />
        <ScheduleContainer gamesToday={this.state.gamesToday}
          upcoming={this.state.upcoming} />
      </div>
    );
  }
}

BasketballPageContainer.propTypes = propTypes;

const mapStateToProps = (state) => ({
  basketball: state.basketball
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ getNbaSchedule, getNbaTeams }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(BasketballPageContainer);