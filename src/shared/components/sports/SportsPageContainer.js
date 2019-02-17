import React from 'react';
import { object } from 'prop-types';

import HighlightsContainer from '../landing/HighlightsContainer';
import TeamSelectDropdown from './TeamSelectDropdown';
import ScheduleContainer from './ScheduleContainer';
import { nbaData } from '../../../helpers/nbaData';

const propTypes = {
  match: object
};

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
      selected: this.getAllTeamNames()
    };
  }

  getAllTeamNames = () => {
    return Object.keys(nbaData).map(key => nbaData[key].name);
  }

  handleChange = values => {
    const length = values.length;
    
    // Set state arrays depending on whether value has been selected or removed
    if (length == 0) { // All removed
      this.resetInitialState();
    } else if (length > this.state.previousValues.length) {
      this.handleAddedSelect(length, values);
    } else {
      this.handleRemovedSelect(values);
    }
  }

  resetInitialState = () => {
    this.setState({ selected: this.getAllTeamNames() });
  }

  handleAddedSelect = (length, values) => {

  }

  handleRemovedSelect = (values) => {

  }

  render() {
    return (
      <div>
        <div className="section">
          <div className="mid-flex">
            <video controls width="600" height="400" />
          </div>
        </div>
        <h1>Sports Page: {this.props.match.params.sport}</h1>
        <TeamSelectDropdown handleChange={this.handleChange} teams={this.state.selected} />
        <HighlightsContainer videos={this.state.videos} />
        <ScheduleContainer selected={this.state.selected} />
      </div>
    );
  }
}

SportsPageContainer.propTypes = propTypes;

export default SportsPageContainer;
