import React from 'react';
import { object } from 'prop-types';

import HighlightsContainer from '../landing/HighlightsContainer';
import EventSelectDropdown from '../common/EventSelectDropdown';
// import ScheduleContainer from './ScheduleContainer';
import { dotaTeams, dotaData, dotaTournaments } from '../../../helpers/dotaData';
import { getDOTASchedule } from '../../../helpers/utils';

const propTypes = {
  match: object
};

const schedule = getDOTASchedule(dotaTournaments);

class ESportsPageContainer extends React.Component {
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
      ongoing: schedule.ongoing,
      upcoming: schedule.upcoming,
      completed: schedule.completed
    };
  }

  handleChange = values => {   
    // const length = values.length; 
    // // Set state arrays depending on whether value has been selected or removed
    // if (length == 0) { // All removed
    //   this.resetInitialState();
    // } else {
    //   this.setState(prevState => {
    //     if (length > prevState.selected.length) {
    //       return this.handleAddedSelect(values, prevState);
    //     } else {
    //       return this.handleRemovedSelect(values, prevState);
    //     }
    //   });
    // }
  }

  resetInitialState = () => {
    this.setState({ 
      selected: [],
      ongoing: schedule.ongoing,
      upcoming: schedule.upcoming,
      completed: schedule.completed
    });
  }
  
  handleAddedSelect = (values, prevState) => {
    // const selectedTeam = values[values.length - 1];
  
    // const todayForSelected = schedule.gamesToday.filter(
    //   game => game.home == selectedTeam || game.away == selectedTeam
    // );
    // const upcomingForSelected = schedule.upcoming.filter(
    //   game => game.home == selectedTeam || game.away == selectedTeam
    // );
  
    // // If only one has been selected, the previous data was all the data,
    // // so replace instead of add on.
    // if (values.length == 1) {
    //   return {
    //     selected: values,
    //     gamesToday: todayForSelected,
    //     upcoming: upcomingForSelected
    //   };
    // } else {
    //   return {
    //     selected: values,
    //     gamesToday: prevState.gamesToday.concat(todayForSelected),
    //     upcoming: prevState.upcoming.concat(upcomingForSelected)
    //   };
    // }
  };
  
  handleRemovedSelect = (values, prevState) => {
    // const previousValues = prevState.selected;
    // let selectedTeam;
    // // Find the removed sport
    // for (let i = 0; i < previousValues.length; i++) {
    //   if (!values.includes(previousValues[i])) {
    //     selectedTeam = previousValues[i];
    //     break;
    //   }
    // }
  
    // const filteredToday = this.state.gamesToday.filter(
    //   game => game.home != selectedTeam && game.away != selectedTeam
    // );
    // const filteredUpcoming = this.state.upcoming.filter(
    //   game => game.home != selectedTeam && game.away != selectedTeam
    // );
  
    // return {
    //   selected: values,
    //   gamesToday: filteredToday,
    //   upcoming: filteredUpcoming
    // };
  };

  getTournamentNames = () => {
    return dotaTournaments.map(tournament => tournament.name);
  }

  render() {
    return (
      <div>
        <div className="section">
          <div className="mid-flex">
            <video controls width="600" height="400" />
          </div>
        </div>
        <h1>Dota 2</h1>
        <EventSelectDropdown handleChange={this.handleChange} 
          events={this.getTournamentNames()} />
        <HighlightsContainer videos={this.state.videos} />
        {/* <ScheduleContainer gamesToday={this.state.gamesToday}
          upcoming={this.state.upcoming} /> */}
      </div>
    );
  }
}

ESportsPageContainer.propTypes = propTypes;

export default ESportsPageContainer;

