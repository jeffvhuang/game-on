import React from 'react';

import SelectDropdown from '../highlights/SelectDropdown';
import { sportsList, esportsList } from '../../../helpers/constants';
import { sportsEvents, eSportsEvents } from '../../../helpers/eventData';

export default class EventsPageContainer extends React.Component {
  constructor() {
    super();

    const eventsObject = this.sortEvents(sportsEvents, eSportsEvents);

    this.state = {
      ongoing: eventsObject.ongoing,
      upcoming: eventsObject.upcoming,
      completed: eventsObject.completed,
      show: this.getCompleteList(),
      events: {
        sports: Object.assign({}, sportsEvents),
        eSports: Object.assign({}, eSportsEvents),
      }
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

  getCompleteList = () => {
    return sportsList.concat(esportsList);
  }

  handleChange = value => {
    if (value.length > 0) {
      this.setState({ show: value });
    } else {
      this.setState({ show: this.getCompleteList() });
    }
  }

  render() {
    return (
      <div className="mid-container">
        <SelectDropdown handleChange={this.handleChange} showGeneral={false} />
        <h2>Ongoing</h2>
        {this.state.ongoing.map(event => {
          return (
            <div key={event.name}>
              {event.name}: {event.startDate} - {event.endDate}
            </div>
          );
        })}
        <h2>Upcoming</h2>
        {this.state.upcoming.map(event => {
          return (
            <div key={event.name}>
              {event.name}: {event.startDate} - {event.endDate}
            </div>
          );
        })}
        <h2>Completed</h2>
        {this.state.completed.map(event => {
          return (
            <div key={event.name}>
              {event.name}: {event.startDate} - {event.endDate}
            </div>
          );
        })}
      </div>
    );
  }
}