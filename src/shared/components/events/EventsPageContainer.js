import React from 'react';

import SportSelectDropdown from '../common/SportSelectDropdown';
import { sortEvents } from '../../../helpers/utils';
import { sportsEvents, eSportsEvents } from '../../../helpers/eventData';
import EventDatesSection from '../common/EventDatesSection';

const schedule = sortEvents(sportsEvents, eSportsEvents);

class EventsPageContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      selected: [],
      ongoing: schedule.ongoing,
      upcoming: schedule.upcoming,
      completed: schedule.completed
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
      ongoing: schedule.ongoing,
      upcoming: schedule.upcoming,
      completed: schedule.completed
    });
  }

  handleAddedSelect = (values, prevState) => {
    const length = values.length;
    const selectedSport = values[length - 1];

    const ongoingForSelected = schedule.ongoing.filter(
      event => event.sport == selectedSport
    );
    const upcomingForSelected = schedule.upcoming.filter(
      event => event.sport == selectedSport
    );
    const completedForSelected = schedule.completed.filter(
      event => event.sport == selectedSport
    );

    // If only one has been selected, the previous data was all the data,
    // so replace instead of add on.
    if (length == 1) {
      return {
        selected: values,
        ongoing: ongoingForSelected,
        upcoming: upcomingForSelected,
        completed: completedForSelected
      };
    } else {
      return {
        selected: values,
        ongoing: prevState.ongoing.concat(ongoingForSelected),
        upcoming: prevState.upcoming.concat(upcomingForSelected),
        completed: prevState.completed.concat(completedForSelected)
      };
    }
  }

  handleRemovedSelect = (values, prevState) => {
    const previousValues = prevState.selected;
    let selectedSport;
    // Find the removed sport
    for (let i = 0; i < previousValues.length; i++) {
      if (!values.includes(previousValues[i])) {
        selectedSport = previousValues[i];
        break;
      }
    }

    const filteredOngoing = this.state.ongoing.filter(
      event => event.sport != selectedSport
    );
    const filteredUpcoming = this.state.upcoming.filter(
      event => event.sport != selectedSport
    );
    const filteredCompleted = this.state.completed.filter(
      event => event.sport != selectedSport
    );

    return {
      selected: values,
      ongoing: filteredOngoing,
      upcoming: filteredUpcoming,
      completed: filteredCompleted
    };
  }

  render() {
    return (
      <div className="mid-container">
        <SportSelectDropdown handleChange={this.handleChange} showGeneral={false} />
        <EventDatesSection ongoing={this.state.ongoing}
          upcoming={this.state.upcoming}
          completed={this.state.completed} />
      </div>
    );
  }
}

export default EventsPageContainer;