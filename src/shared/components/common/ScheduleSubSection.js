import React from 'react';
import { Row, Col } from 'antd';
import { string, array } from 'prop-types';

ScheduleSubSection.propTypes = {
  header: string,
  games: array
};

function ScheduleSubSection({ header, games }) {
  return (
    <div className="margin-bot">
      <h2>{header}</h2>
      {games.map((game, i) => {
        return (
          <Row key={i}>
            <Col span={18}>{game.home} vs {game.away}</Col>
            <Col span={6}>{new Date(game.date).toDateString()}</Col>
          </Row>
        );
      })}
    </div>
  );
}

export default ScheduleSubSection;