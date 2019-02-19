import React from 'react';
import { object } from 'prop-types';

import HighlightsContainer from '../landing/HighlightsContainer';
import TeamSelectDropdown from './TeamSelectDropdown';
import ScheduleContainer from './ScheduleContainer';
import { nbaTeams } from '../../../helpers/nbaData';
import { sortInitialSchedule } from '../../../helpers/utils';

const propTypes = {
  match: object
};

const schedule = sortInitialSchedule();

class SportsPageContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      videos: [
        "https://dummyimage.com/200x160/000/fff.jpg&text=Video",
        "https://dummyimage.com/200x160/000/fff.jpg&text=Video2",
        "https://dummyimage.com/200x160/000/fff.jpg&text=Video3",
        "https://dummyimage.com/200x160/000/fff.jpg&text=Video4"
      ],
      selected: [],
      gamesToday: schedule.gamesToday,
      upcoming: schedule.upcoming
    };
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
    this.setState({ 
      selected: [],
      gamesToday: schedule.gamesToday,
      upcoming: schedule.upcoming
    });
  }
  
  handleAddedSelect = (values, prevState) => {
    const selectedTeam = values[values.length - 1];
  
    const todayForSelected = schedule.gamesToday.filter(
      game => game.home == selectedTeam || game.away == selectedTeam
    );
    const upcomingForSelected = schedule.upcoming.filter(
      game => game.home == selectedTeam || game.away == selectedTeam
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
      game => game.home != selectedTeam && game.away != selectedTeam
    );
    const filteredUpcoming = this.state.upcoming.filter(
      game => game.home != selectedTeam && game.away != selectedTeam
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
        <h1>Sports Page: {this.props.match.params.sport}</h1>
        <TeamSelectDropdown handleChange={this.handleChange} teams={nbaTeams} />
        <HighlightsContainer videos={this.state.videos} />
        <ScheduleContainer gamesToday={this.state.gamesToday}
          upcoming={this.state.upcoming} />
      </div>
    );
  }
}

SportsPageContainer.propTypes = propTypes;

export default SportsPageContainer;
