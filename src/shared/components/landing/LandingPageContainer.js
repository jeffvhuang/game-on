import React from 'react';
import Posters from './Posters';
import HighlightsContainer from './HighlightsContainer';

export default class LandingPageContainer extends React.Component {
  render() {
    return (
      <div className="mid-container">
        <Posters />
        <HighlightsContainer />
      </div>
    );
  }
}