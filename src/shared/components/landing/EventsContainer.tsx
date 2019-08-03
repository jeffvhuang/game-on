import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { paths } from '../../../helpers/constants';
import { GeneralState } from '../../redux/general/general-types';
import { getEventsForWeek } from '../../redux/general/general-actions';
import { ReduxState } from '../../redux/redux-state';
import { getDayMonthDate } from '../../../helpers/utils';
import { GameOnEvent } from '../../../types/game-on-general/game-on-event.model';
import UpcomingEvents from './UpcomingEvents';
import EventsToday from './EventsToday';
import SportSelectDropdown from '../common/SportSelectDropdown';

interface StateProps {
  general: GeneralState;
}

interface DispatchProps {
  getEventsForWeek;
}

interface State {
  today: Date;
  values: string[];
}

type Props = StateProps & DispatchProps;

class EventsContainer extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      today: new Date(),
      values: []
    };
  }

  componentDidMount() {
    this.props.getEventsForWeek();
  }

  handleChange = values => this.setState({ values });

  getDateString(event: GameOnEvent): string | null {
    if (event.startTime) {
      return getDayMonthDate(event.startTime);
    }
    return '';
  }

  getDayStringFromToday(daysToAdd: number): string {
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
    const { eventsForWeek } = this.props.general;

    return (
      <div className="section">
        <h2 className="page-heading">Matches</h2>
        <SportSelectDropdown handleChange={this.handleChange} />
        <div className="margin-bot">
          <h3>Today</h3>
          <EventsToday events={eventsForWeek.today} values={this.state.values} />
        </div>
        <div className="margin-bot">
          <h3>Tomorrow</h3>
          <UpcomingEvents events={eventsForWeek.tomorrow} />
        </div>
        <div className="margin-bot">
          <h3>{this.getDayStringFromToday(2)}</h3>
          <UpcomingEvents events={eventsForWeek.day3} />
        </div>
        <div className="margin-bot">
          <h3>{this.getDayStringFromToday(3)}</h3>
          <UpcomingEvents events={eventsForWeek.day4} />
        </div>
        <div className="margin-bot">
          <h3>{this.getDayStringFromToday(4)}</h3>
          <UpcomingEvents events={eventsForWeek.day5} />
        </div>
        <div className="margin-bot">
          <h3>{this.getDayStringFromToday(5)}</h3>
          <UpcomingEvents events={eventsForWeek.day6} />
        </div>
        <div className="margin-bot">
          <h3>{this.getDayStringFromToday(6)}</h3>
          <UpcomingEvents events={eventsForWeek.day7} />
        </div>
        {/* <Link to={paths.EVENTS} className="right">More ></Link> */}
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
