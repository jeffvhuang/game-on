import React from 'react';
import { Link } from 'react-router-dom';
import { array } from 'prop-types';

import { paths } from '../../../helpers/constants';
import ScheduleSubSection from '../common/ScheduleSubSection';

const propTypes = {
  gamesToday: array,
  upcoming: array
};

class ScheduleContainer extends React.PureComponent {
  render() {
    return (
      <div className="section">
        <ScheduleSubSection header="Today's Games" games={this.props.gamesToday} />
        <ScheduleSubSection header="Upcoming" games={this.props.upcoming} />
        <Link to={paths.EVENTS} className="right">More ></Link>
      </div>
    );
  }
}

ScheduleContainer.propTypes = propTypes;
export default ScheduleContainer;