import React from 'react';
import { Row, Col } from 'antd';
import { string, array } from 'prop-types';

import { getFormattedTime } from '../../../helpers/utils';

BasketballScheduleSection.propTypes = {
  header: string,
  games: array
};

function BasketballScheduleSection({ header, games }) {
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
        const startDate = new Date(game.startTimeUTC);
        return (
          <Row key={i}>
            <Col span={7}>{game.vTeam.fullName}</Col>
            <Col span={2}>vs</Col>
            <Col span={7}>{game.hTeam.fullName}</Col>
            <Col span={5}>{startDate.toDateString()}</Col>
            <Col span={3}>{getFormattedTime(startDate)}</Col>
          </Row>
        );
      })}
    </div>
  );
}

export default BasketballScheduleSection;