import React from 'react';
import { Row, Col } from 'antd';
import { string, array } from 'prop-types';

import { getFormattedTime } from '../../../helpers/utils';

FootballScheduleSection.propTypes = {
  header: string,
  games: array
};

function FootballScheduleSection({ header, games }) {
  return (
    <div className="margin-bot">
      <h2>{header}</h2>
      <Row>
        <Col span={7}><h3>Away Team</h3></Col>
        <Col span={2} />
        <Col span={7}><h3>Home Team</h3></Col>
        <Col span={8} />
      </Row>
      {games.map((game, i) => {
        const startDate = new Date(game.event_date);
        return (
          <Row key={i}>
            <Col span={7}>{game.awayTeam}</Col>
            <Col span={2}>vs</Col>
            <Col span={7}>{game.homeTeam}</Col>
            <Col span={5}>{startDate.toDateString()}</Col>
            <Col span={3}>{getFormattedTime(startDate)}</Col>
          </Row>
        );
      })}
    </div>
  );
}

export default FootballScheduleSection;