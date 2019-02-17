import React from 'react';
import { object } from 'prop-types';

import HighlightsContainer from '../landing/HighlightsContainer';
import TeamSelectDropdown from './TeamSelectDropdown';
import { nbaData } from '../../../helpers/nbaData';

const propTypes = {
  match: object
};

export default class SportsPageContainer extends React.Component {
  constructor() {
    super();

    const initialEvents = this.sortInitialEvents();

    this.state = {
      videos: [
        "https://dummyimage.com/200x160/000/fff.jpg&text=Video",
        "https://dummyimage.com/200x160/000/fff.jpg&text=Video2",
        "https://dummyimage.com/200x160/000/fff.jpg&text=Video3",
        "https://dummyimage.com/200x160/000/fff.jpg&text=Video4"
      ],
      selected: this.getAllTeamNames(),
      initialEvents: initialEvents,
      gamesToday: initialEvents.gamesToday,
      upcoming: initialEvents.upcoming,
      previousValues: []
    };
  }

  getAllTeamNames = () => {
    return Object.keys(nbaData).map(key => nbaData[key].name);
  }

  sortInitialEvents = () => {
    const gamesToday = [];
    const upcoming = [];
    const currentDate = new Date();
    const now = Date.now();

    // Sort each team for games not yet completed
    for (const property in nbaData) {
      nbaData[property].games.forEach(game => {
        const gamesDate = new Date(game.date);

        if (this.isSameDate(currentDate, gamesDate)) {
          gamesToday.push(game);
        } else if (gamesDate.getTime() > now) {
          upcoming.push(game);
        }
      });
    }

    return { gamesToday, upcoming };
  }

  isSameDate = (dateTestedAgainst, dateToTest) => {
    const year = dateTestedAgainst.getFullYear();
    const month = dateTestedAgainst.getMonth();
    const monthDate = dateTestedAgainst.getDate();

    return (dateToTest.getFullYear() == year) &&
      (dateToTest.getMonth() == month) &&
      (dateToTest.getDate() == monthDate);
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

  handleAddedSelect = () => {

  }

  handleRemovedSelect = () => {

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
        <div>
          <div className="section">
            <h2>Ongoing</h2>
            {this.state.gamesToday.map((game, i) => {
              return (
                <div key={i}>
                  {game.date}: {game.home} vs {game.away}
                </div>
              );
            })}
          </div>
          <div className="section">
            <h2>Upcoming</h2>
            {this.state.upcoming.map((game, i) => {
              return (
                <div key={i}>
                  {game.date}: {game.home} vs {game.away}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

SportsPageContainer.propTypes = propTypes;
