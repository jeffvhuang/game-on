import * as React from 'react';
import Posters from './Posters';
import HighlightsContainer from './HighlightsContainer';
import EventsContainer from './EventsContainer';

interface State {
}

class LandingPageContainer extends React.Component<{}, State> {
  constructor(props) {
    super(props);

    this.state = {
    };
  }
  
  render() {
    return (
      <div>
        <Posters />
        {/* <HighlightsContainer videos={this.state.videos} /> */}
        <EventsContainer />
      </div>
    );
  }
}

export default  LandingPageContainer;