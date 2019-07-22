import * as React from 'react';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { paths, sports, esportsTitles } from '../../../helpers/constants';
import { GeneralState } from '../../redux/general/general-types';
import { getEvents } from '../../redux/general/general-actions';
import { ReduxState } from '../../redux/redux-state';
import { getDayMonthDate } from '../../../helpers/utils';
import { GameOnEvent } from '../../../types/game-on-general/game-on-event.model';

interface StateProps {
  general: GeneralState;
}

interface DispatchProps {
  getEvents;
}

interface State {
}

type Props = StateProps & DispatchProps;

class EventsContainer extends React.Component<Props, State> {
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

  getDateString(event: GameOnEvent): string | null {
    if (event.startTime) {
      const date = new Date(event.startTime);
      return getDayMonthDate(date);
    }
    return '';
  }

  // getScoreResults(event: GameOnEvent): string {

  // }

  render() {
    return (
      <div className="section">
        <h2>Events</h2>
        <div className="margin-bot">
          <h3>Live</h3>
          {this.props.general.liveEvents.map((event, i) => {
            return (
              <Row key={event.id}>
                <Col span={3}>{event.sport}</Col>
                <Col span={3}>{event.leagueOrTournament}</Col>
                <Col span={7}>{event.competitors[0].name}</Col>
                <Col span={2}>{event.competitors[0].score}</Col>
                <Col span={7}>{event.competitors[1].name}</Col>
                <Col span={2}>{event.competitors[1].score}</Col>
              </Row>
            );
          })}
        </div>
        <div className="margin-bot">
          <h3>Coming Up</h3>
          {this.props.general.upcomingEvents.map((event, i) => {
            return (
              <Row key={event.id}>
                <Col span={3}>{event.sport}</Col>
                <Col span={3}>{event.leagueOrTournament}</Col>
                <Col span={7}>{event.competitors[0].name}</Col>
                <Col span={1}>vs</Col>
                <Col span={7}>{event.competitors[1].name}</Col>
                <Col span={3}>{this.getDateString(event)}</Col>
              </Row>
            );
          })}
        </div>
        <div className="margin-bot">
          <h3>Recently Completed</h3>
          {this.props.general.recentlyCompletedEvents.map((event, i) => {
            return (
              <Row key={event.id}>
                <Col span={3}>{event.sport}</Col>
                <Col span={3}>{event.leagueOrTournament}</Col>
                <Col span={7}>{event.competitors[0].name}</Col>
                <Col span={2}>{event.competitors[0].score}</Col>
                <Col span={7}>{event.competitors[1].name}</Col>
                <Col span={2}>{event.competitors[1].score}</Col>
              </Row>
            );
          })}
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

export default connect(mapStateToProps, mapDispatchToProps)(EventsContainer);
