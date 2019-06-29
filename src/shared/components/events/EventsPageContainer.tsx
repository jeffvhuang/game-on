import * as React from 'react';

import SportSelectDropdown from '../common/SportSelectDropdown';
import EventDatesSection from '../common/EventDatesSection';

interface Props {

}

interface State {
  selected: string[];
}

class EventsPageContainer extends React.Component<{}, State> {
  constructor(props) {
    super(props);

    this.state = {
      selected: []
    };
  }

  handleChange = values => {
    const length = values.length;
    
    // Set state arrays depending on whether value has been selected or removed
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


  render() {
    return (
      <div className="mid-container">
        <SportSelectDropdown handleChange={this.handleChange} showGeneral={false} />
        {/* <EventDatesSection ongoing={this.state.ongoing}
          upcoming={this.state.upcoming}
          completed={this.state.completed} /> */}
      </div>
    );
  }
}

export default EventsPageContainer;