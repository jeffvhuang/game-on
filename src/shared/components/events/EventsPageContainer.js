import React from 'react';

import SelectDropdown from '../highlights/SelectDropdown';
import { sportsEvents, eSportsEvents } from '../../../helpers/eventData';

export default class EventsPageContainer extends React.Component {
  constructor() {
    super();

    const initialState = this.getInitialState(sportsEvents, eSportsEvents);

    this.state = {
      initialState: initialState, // to hold the original sorting
      ongoing: initialState.ongoing,
      upcoming: initialState.upcoming,
      completed: initialState.completed,
      previousValues: []
    };
  }

  getInitialState = (sportsEvents, eSportsEvents) => {
    const ongoing = [];
    const upcoming = [];
    const completed = [];
    const now = Date.now();

    // Check start - end dates and place into one of the above arrays
    for (const property in sportsEvents) {
      sportsEvents[property].forEach(event => {
        if (new Date(event.startDate).getTime() > now) {
          upcoming.push(event);
        } else if (new Date(event.endDate).getTime() < now) {
          completed.push(event);
        } else {
          ongoing.push(event);
        }
      });
    }

    for (const property in eSportsEvents) {
      eSportsEvents[property].forEach(event => {
        if (new Date(event.startDate).getTime() > now) {
          upcoming.push(event);
        } else if (new Date(event.endDate).getTime() < now) {
          completed.push(event);
        } else {
          ongoing.push(event);
        }
      });
    }

    return { ongoing, upcoming, completed };
  }

  handleChange = values => {
    const length = values.length;
    
    // Set state arrays depending on whetehr value has been selected or removed
    if (length == 0) { // All removed
      this.resetInitialState();
    } else if (length > this.state.previousValues.length) {
      this.handleAddedSelect(length, values);
    } else {
      this.handleRemovedSelect(values);
    }
  }

  resetInitialState = () => {
    this.setState(prevState => ({
      ongoing: prevState.initialState.ongoing,
      upcoming: prevState.initialState.upcoming,
      completed: prevState.initialState.completed,
      previousValues: []
    }));
  }

  handleAddedSelect = (length, values) => {
    const initialState = this.state.initialState;
    const selectedSport = values[length - 1];

    const ongoingForSelected = initialState.ongoing.filter(
      event => event.sport == selectedSport
    );
    const upcomingForSelected = initialState.upcoming.filter(
      event => event.sport == selectedSport
    );
    const completedForSelected = initialState.completed.filter(
      event => event.sport == selectedSport
    );

    // If only one has been selected, the previous data was all the data,
    // so replace instead of add on.
    if (length == 1) {
      this.setState({
        ongoing: ongoingForSelected,
        upcoming: upcomingForSelected,
        completed: completedForSelected,
        previousValues: values
      });
    } else {
      this.setState(prevState => ({
        ongoing: prevState.ongoing.concat(ongoingForSelected),
        upcoming: prevState.upcoming.concat(upcomingForSelected),
        completed: prevState.completed.concat(completedForSelected),
        previousValues: values
      }));
    }
  }

  handleRemovedSelect = values => {
    const previousValues = this.state.previousValues;
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

    this.setState({
      ongoing: filteredOngoing,
      upcoming: filteredUpcoming,
      completed: filteredCompleted,
      previousValues: values
    });
  }

  render() {
    return (
      <div className="mid-container">
        <SelectDropdown handleChange={this.handleChange} showGeneral={false} />
        <div className="section">
          <h2>Ongoing</h2>
          {this.state.ongoing.map(event => {
            return (
              <div key={event.name}>
                {event.name}: {event.startDate} - {event.endDate}
              </div>
            );
          })}
        </div>
        <div className="section">
          <h2>Upcoming</h2>
          {this.state.upcoming.map(event => {
            return (
              <div key={event.name}>
                {event.name}: {event.startDate} - {event.endDate}
              </div>
            );
          })}
        </div>
        <div className="section">
          <h2>Completed</h2>
          {this.state.completed.map(event => {
            return (
              <div key={event.name}>
                {event.name}: {event.startDate} - {event.endDate}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}