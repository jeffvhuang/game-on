import * as React from 'react';
import Posters from './Posters';
import HighlightsContainer from './HighlightsContainer';
import EventsContainer from './EventsContainer';

interface State {
  videos: any[];
}

class LandingPageContainer extends React.Component<{}, State> {
  constructor(props) {
    super(props);

    this.state = {
      videos: [
        "https://dummyimage.com/200x160/000/fff.jpg&text=Video",
        "https://dummyimage.com/200x160/000/fff.jpg&text=Video2",
        "https://dummyimage.com/200x160/000/fff.jpg&text=Video3",
        "https://dummyimage.com/200x160/000/fff.jpg&text=Video4"
      ]
    };
  }
  
  render() {
    return (
      <div>
        <Posters />
        <HighlightsContainer videos={this.state.videos} />
        <EventsContainer />
      </div>
    );
  }
}

export default  LandingPageContainer;