import React from 'react';

import SelectDropdown from '../highlights/SelectDropdown';
import { sportsList, esportsList } from '../../../helpers/constants';
import { sportsEvents, eSportsEvents } from '../../../helpers/eventData';

export default class EventsPageContainer extends React.Component {
  constructor() {
    super();

    const eventsObject = this.sortEvents(sportsEvents, eSportsEvents);

    this.state = {
      eventsObject: eventsObject, // to hold the original sorting
      ongoing: eventsObject.ongoing,
      upcoming: eventsObject.upcoming,
      completed: eventsObject.completed,
      ongoingHidden: [],
      upcomingHidden: [],
      completedHidden: []
    };
  }

  sortEvents = (sportsEvents, eSportsEvents) => {
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

    return {
      ongoing: ongoing,
      upcoming: upcoming,
      completed: completed
    };
  }

  handleChange = values => {
    const length = values.length;
    if (length > 0) {
      const eventsObject = this.state.eventsObject;

      const ongoingForSelected = eventsObject.ongoing.filter(
        event => event.sport == values[length - 1]
      );
      const upcomingForSelected = eventsObject.upcoming.filter(
        event => event.sport == values[length - 1]
      );
      const completedForSelected = eventsObject.completed.filter(
        event => event.sport == values[length - 1]
      );

      // If only one has been selected, the previous data was all the data,
      // so don't add on, just replace.
      if (length == 1) {
        this.setState(prevState => ({
          ongoing: ongoingForSelected,
          upcoming: upcomingForSelected,
          completed: completedForSelected
        }));
      } else {
        this.setState(prevState => ({
          ongoing: prevState.ongoing.concat(ongoingForSelected),
          upcoming: prevState.upcoming.concat(upcomingForSelected),
          completed: prevState.completed.concat(completedForSelected)
        }));
      }
    } else {
      // Filters removed, so replace with all sports events again
      this.setState(prevState => ({
        ongoing: prevState.eventsObject.ongoing,
        upcoming: prevState.eventsObject.upcoming,
        completed: prevState.eventsObject.completed
      }));
    }
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