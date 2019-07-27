import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { paths } from '../../../helpers/constants';
import { GeneralState } from '../../redux/general/general-types';
import { getEventsForWeek } from '../../redux/general/general-actions';
import { ReduxState } from '../../redux/redux-state';
import { getDayMonthDate } from '../../../helpers/utils';
import { GameOnEvent } from '../../../types/game-on-general/game-on-event.model';
import EventsSection from './EventsSection';
import UpcomingEventsSection from './UpcomingEventsSection';

interface StateProps {
  general: GeneralState;
}

interface DispatchProps {
  getEventsForWeek;
}

interface State {
  today: Date;
}

type Props = StateProps & DispatchProps;

class EventsContainer extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      today: new Date()
    };
  }

  componentDidMount() {
    const { general } = this.props;
    if (!general.eventsForWeek.hasOwnProperty('today')) {
      this.props.getEventsForWeek();
    }
  }

  getDateString(event: GameOnEvent): string | null {
    if (event.startTime) {
      return getDayMonthDate(event.startTime);
    }
    return '';
  }

  getDayFromToday(daysToAdd: number): string {
    const day = new Date();
    day.setDate(day.getDate() + daysToAdd);
    var dayNum = day.getDay(); // Sun = 0 > Sat = 6

    switch (dayNum) {
      case 0:
        return 'Sunday';
      case 1:
        return 'Monday';
      case 2:
        return 'Tuesday';
      case 3:
        return 'Wednesday';
      case 4:
        return 'Thursday';
      case 5:
        return 'Friday';
      case 6:
        return 'Saturday';
      default:
        return '';
    }
  }

  render() {  
    return (
      <div className="section">
        <h2>Events</h2>
        <div className="margin-bot">
          <h3>Today</h3>
          {/* <EventsSection events={this.props.general.liveEvents} /> */}
        </div>
        <div className="margin-bot">
          <h3>Tomorrow</h3>
          {/* <UpcomingEventsSection events={this.props.general.upcomingEvents}
            getDateString={this.getDateString} /> */}
        </div>
        <div className="margin-bot">
          <h3>{this.getDayFromToday(2)}</h3>
          {/* <EventsSection events={this.props.general.recentlyCompletedEvents} /> */}
        </div>
        <Link to={paths.EVENTS} className="right">More ></Link>
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  general: state.general
});

const mapDispatchToProps = {
  getEventsForWeek
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsContainer);
