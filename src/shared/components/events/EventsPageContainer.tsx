import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { paths } from '../../../helpers/constants';
import { GeneralState } from '../../redux/general/general-types';
import { getEvents } from '../../redux/general/general-actions';
import { ReduxState } from '../../redux/redux-state';
import { getDayMonthDate } from '../../../helpers/utils';
import { GameOnEvent } from '../../../types/game-on-general/game-on-event.model';
import EventsSection from '../landing/EventsSection';
import UpcomingEventsSection from '../landing/UpcomingEventsSection';
import SportSelectDropdown from '../common/SportSelectDropdown';

interface StateProps {
  general: GeneralState;
}

interface DispatchProps {
  getEvents;
}

interface State {
}

type Props = StateProps & DispatchProps;

class EventsPageContainer extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = { };
  }

  componentDidMount() {
    const { general } = this.props;
    if (!general.liveEvents.length && !general.recentlyCompletedEvents.length && !general.upcomingEvents.length) {
      this.props.getEvents();
    }
  }

  handleChange() {
    
  }

  getDateString(event: GameOnEvent): string | null {
    if (event.startTime) {
      return getDayMonthDate(event.startTime);
    }
    return '';
  }

  render() {
    return (
      <div className="section">
        <h2>Events</h2>
        <SportSelectDropdown handleChange={this.handleChange} showGeneral={false} />
        <div className="margin-bot">
          <h3>Live</h3>
          <EventsSection events={this.props.general.liveEvents} />
        </div>
        <div className="margin-bot">
          <h3>Coming Up</h3>
          <UpcomingEventsSection events={this.props.general.upcomingEvents}
            getDateString={this.getDateString} />
        </div>
        <div className="margin-bot">
          <h3>Recently Completed</h3>
          <EventsSection events={this.props.general.recentlyCompletedEvents} />
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
  getEvents
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsPageContainer);
