import React from 'react';
import { Link } from 'react-router-dom';
import { array } from 'prop-types';

import { paths } from '../../../helpers/constants';
import ScheduleSubSection from '../common/ScheduleSubSection';
import { nbaData } from '../../../helpers/nbaData';

const propTypes = {
  selected: array
};

class ScheduleContainer extends React.PureComponent {
  constructor(props) {
    super(props);

    const initialEvents = this.sortInitialEvents();

    this.state = {
      initialEvents: initialEvents,
      gamesToday: initialEvents.gamesToday,
      upcoming: initialEvents.upcoming,
      previousValues: []
    };
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

  render() {
    return (
      <div className="section">
        <ScheduleSubSection header="Today's Games" games={this.state.gamesToday} />
        <ScheduleSubSection header="Upcoming" games={this.state.upcoming} />
        <Link to={paths.EVENTS} className="right">More ></Link>
      </div>
    );
  }
}

ScheduleContainer.propTypes = propTypes;
export default ScheduleContainer;