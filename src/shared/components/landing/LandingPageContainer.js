import React from 'react';
import Posters from './Posters';
import HighlightsContainer from './HighlightsContainer';
import EventsContainer from './EventsContainer';

export default class LandingPageContainer extends React.Component {
  render() {
    return (
      <div className="mid-container">
        <Posters />
        <HighlightsContainer />
        <EventsContainer />
      </div>
    );
  }
}