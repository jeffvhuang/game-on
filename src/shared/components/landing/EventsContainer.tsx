import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Collapse } from 'antd';

import { paths } from '../../../helpers/constants';
import { GeneralState } from '../../redux/general/general-types';
import { getEventsForWeek } from '../../redux/general/general-actions';
import { ReduxState } from '../../redux/redux-state';
import { getDayMonthDate } from '../../../helpers/utils';
import { GameOnEvent } from '../../../types/game-on-general/game-on-event.model';
import UpcomingEvents from './UpcomingEvents';
import EventsToday from './EventsToday';
import SportSelectDropdown from '../common/SportSelectDropdown';

const { Panel } = Collapse;
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

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return days[dayNum];
  }

  render() {
    const { eventsForWeek } = this.props.general;

    return (
      <div className="section">
        <h2 className="page-heading">Matches</h2>
        <SportSelectDropdown handleChange={this.handleChange} />
        <Collapse defaultActiveKey={['1']} className="events-accordion">
          <Panel header="Today" key="1">
            <EventsToday events={eventsForWeek.today} values={this.state.values} />
          </Panel>
          <Panel header="Tomorrow" key="2">
            <UpcomingEvents events={eventsForWeek.tomorrow} values={this.state.values} />
          </Panel>
          <Panel header={this.getDayStringFromToday(2)} key="3">
            <UpcomingEvents events={eventsForWeek.day3} values={this.state.values} />
          </Panel>
          <Panel header={this.getDayStringFromToday(3)} key="4">
            <UpcomingEvents events={eventsForWeek.day4} values={this.state.values} />
          </Panel>
          <Panel header={this.getDayStringFromToday(4)} key="5">
            <UpcomingEvents events={eventsForWeek.day5} values={this.state.values} />
          </Panel>
          <Panel header={this.getDayStringFromToday(5)} key="6">
            <UpcomingEvents events={eventsForWeek.day6} values={this.state.values} />
          </Panel>
          <Panel header={this.getDayStringFromToday(6)} key="7">
            <UpcomingEvents events={eventsForWeek.day7} values={this.state.values} />
          </Panel>
        </Collapse>
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
