import React from 'react';

import SelectDropdown from '../highlights/SelectDropdown';
import { sportsList, esportsList } from '../../../helpers/constants';
import { sportsEvents, eSportsEvents } from '../../../helpers/eventData';

export default class EventsPageContainer extends React.Component {
  state = {
    show: this.getCompleteList(),
    events: {
      sports: Object.assign({}, sportsEvents),
      eSports: Object.assign({}, eSportsEvents),
    }
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
        <SelectDropdown handleChange={this.handleChange} />
        <div>Calender</div>
        <div>Upcoming</div>
      </div>
    );
  }
}