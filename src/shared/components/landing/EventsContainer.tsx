import React from 'react';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';

import { paths, sports, esportsTitles } from '../../../helpers/constants';

export default class EventsContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      upcoming: [
        { sport: sports.FOOTBALL, comp: "Champion's League: Man Utd v PSG", date: "12 Feb" },
        { sport: esportsTitles.DOTA, comp: "DreamLeague Season 11", date: "14 March" }
      ],
      completed: [
        { sport: esportsTitles.DOTA, comp: "Chongqing Major", date: "31 Jan" },
        { sport: sports.TENNIS, comp: "Aus Open Men's Final", date: "27 Jan" }
      ]
    };
  }

  render() {
    return (
      <div className="section">
        <h2>Events</h2>
        <div className="margin-bot">
          <h3>Coming Up</h3>
          {this.state.upcoming.map((event, i) => {
            return (
              <Row key={i}>
                <Col span={6}>{event.sport}</Col>
                <Col span={12}>{event.comp}</Col>
                <Col span={6}>{event.date}</Col>
              </Row>
            );
          })}
        </div>
        <div className="margin-bot">
          <h3>Completed</h3>
          {this.state.completed.map((event, i) => {
            return (
              <Row key={i}>
                <Col span={6}>{event.sport}</Col>
                <Col span={12}>{event.comp}</Col>
                <Col span={6}>{event.date}</Col>
              </Row>
            );
          })}
        </div>
        <Link to={paths.EVENTS} className="right">More ></Link>
      </div>
    );
  }
}