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
      // TODO ?create function to check it is a date after today rather than check both time and date
      upcoming: props.basketball.nba.schedule.filter(
        game => game.startTimeUTC.getTime() > now && 
          !isSameDate(today, new Date(game.startTimeUTC))) || [],
      unselectedGamesToday: [],
      unselectedUpcoming: []
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

    // Variables to help sorting
    // Objects to hold arrays for games today into selected and unselected
    let todayArrays;
    let upcomingArrays;
    // Final array returned for the games of the selected teams thus far
    let gamesToday;
    let upcoming;

    // Sort games into selected and unselected for today and upcoming games
    if (values.length == 1) {
      todayArrays = this.sortForTeam(selectedTeam, prevState.schedule.gamesToday);
      upcomingArrays = this.sortForTeam(selectedTeam, prevState.schedule.upcoming);

      // If only one has been selected then the previous data was all the teams,
      // so replace instead of add on.
      gamesToday = todayArrays.selected;
      upcoming = upcomingArrays.selected;
    } else {
      todayArrays = this.sortForTeam(selectedTeam, prevState.unselectedGamesToday);
      upcomingArrays = this.sortForTeam(selectedTeam, prevState.unselectedUpcoming);

      gamesToday = prevState.gamesToday.concat(todayArrays.selected);
      upcoming = prevState.upcoming.concat(upcomingArrays.selected);
    }

    return {
      selected: values,
      gamesToday,
      upcoming,
      unselectedGamesToday: todayArrays.unselected,
      unselectedUpcoming: upcomingArrays.unselected
    };
  };

  // Sort out the games that include the selected team
  sortForTeam = (team, array) => {
    const selected = [];
    const unselected = [];

    array.forEach(game => {
      if (game.hTeam.shortName == team || game.vTeam.shortName == team) {
        selected.push(game);
      } else unselected.push(game);
    });

    return { selected, unselected };
  }
  
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

    const todayArrays = this.removeForTeam(selectedTeam, prevState.gamesToday);
    const upcomingArrays = this.removeForTeam(selectedTeam, prevState.upcoming);
  
    return {
      selected: values,
      gamesToday: todayArrays.selected,
      upcoming: upcomingArrays.selected,
      unselectedGamesToday: todayArrays.unselected,
      unselectedUpcoming: upcomingArrays.unselected
    };
  };

  // Sort array provided to remove if object contains team
  removeForTeam = (team, array) => {
    const selected = [];
    const unselected = [];

    array.forEach(game => {
      // if the team is in the game object, it needs to be moved into unselected
      if (game.hTeam.shortName == team || game.vTeam.shortName == team) {
        unselected.push(game);
      } else selected.push(game);
    });

    return { selected, unselected };
  }

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