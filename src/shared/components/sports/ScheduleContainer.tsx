import * as React from 'react';
import { Link } from 'react-router-dom';

import { paths } from '../../../helpers/constants';
import ScheduleSubSection from '../common/ScheduleSubSection';

interface Props {
  gamesToday: object[],
  upcoming: object[]
};

class ScheduleContainer extends React.PureComponent<Props, object> {
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

export default ScheduleContainer;