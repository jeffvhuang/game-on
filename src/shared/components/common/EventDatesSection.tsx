import React from 'react';
import { Link } from 'react-router-dom';
import { array } from 'prop-types';

import { paths } from '../../../helpers/constants';
import EventDatesSubSection from './EventDatesSubSection';

const propTypes = {
  ongoing: array,
  upcoming: array,
  completed: array
};

class EventDatesSection extends React.PureComponent {
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

EventDatesSection.propTypes = propTypes;

export default EventDatesSection;