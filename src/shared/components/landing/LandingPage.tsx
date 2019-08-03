import * as React from 'react';
import Posters from './Posters';
import HighlightsSection from './HighlightsSection';
import EventsContainer from './EventsContainer';

interface State {
}

class LandingPage extends React.Component<{}, State> {
  constructor(props) {
    super(props);

    this.state = {
    };
  }
  
  render() {
    return (
      <div>
        <Posters />
        {/* <HighlightsSection videos={this.state.videos} /> */}
        <EventsContainer />
      </div>
    );
  }
}

export default  LandingPage;