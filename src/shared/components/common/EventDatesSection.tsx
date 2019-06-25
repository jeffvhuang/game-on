import * as React from 'react';
import { Link } from 'react-router-dom';

import { paths } from '../../../helpers/constants';
import EventDatesSubSection from './EventDatesSubSection';

interface Props {
  ongoing: any[],
  upcoming: any[],
  completed: any[]
};

class EventDatesSection extends React.PureComponent<Props> {
  render() {
    return (
      <div className="section">
        <EventDatesSubSection header="Ongoing" events={this.props.ongoing} />
        <EventDatesSubSection header="Upcoming" events={this.props.upcoming} />
        <EventDatesSubSection header="Completed" events={this.props.completed} />
        <Link to={paths.EVENTS} className="right">More ></Link>
      </div>
    );
  }
}

export default EventDatesSection;