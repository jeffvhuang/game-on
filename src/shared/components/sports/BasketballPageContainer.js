import React from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { paths } from '../../../helpers/constants';
import { isSameDate, sortNBASchedule } from '../../../helpers/utils';
import { getNbaSchedule, getNbaTeams } from '../../redux/actions/basketball-actions';

import HighlightsContainer from '../landing/HighlightsContainer';
import TeamSelectDropdown from '../common/TeamSelectDropdown';
import BasketballScheduleSection from './BasketballScheduleSection';

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

    // Move the games with the team just removed from dropdown and return it to unselected/unshown array
    const todayArrays = this.removeForTeam(values, selectedTeam, prevState.gamesToday);
    const upcomingArrays = this.removeForTeam(values, selectedTeam, prevState.upcoming);
  
    return {
      selected: values,
      gamesToday: todayArrays.remains,
      upcoming: upcomingArrays.remains,
      unselectedGamesToday: prevState.unselectedGamesToday.concat(todayArrays.removed),
      unselectedUpcoming: prevState.unselectedUpcoming.concat(upcomingArrays.removed)
    };
  };

  /**
   * Remove object that contains the given team from the array 
   * (except if the other team is in the values array)
   * @param  {[array]} values from dropdown
   * @param  {[string]} team the recently removed team
   * @param  {[array]} games array of objects to be sorted
   * @return {[object]} two properties for those still in values and those that arent
   */
  removeForTeam = (values, team, games) => {
    const removed = [];
    const remains = [];

    games.forEach(game => {
      // if the team is in the game object and the other team is not in the selected values, 
      // it needs to be removed
      if (game.hTeam.shortName == team && !values.includes(game.vTeam.shortName)) {
        removed.push(game);
      } else if (game.vTeam.shortName == team && !values.includes(game.hTeam.shortName)) {
        removed.push(game);
      } else remains.push(game);
    });

    return { removed, remains };
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
        <div className="section">
          <BasketballScheduleSection header="Today's Games" games={this.state.gamesToday} />
          <BasketballScheduleSection header="Upcoming" games={this.state.upcoming} />
          <Link to={paths.EVENTS} className="right">More ></Link>
        </div>
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