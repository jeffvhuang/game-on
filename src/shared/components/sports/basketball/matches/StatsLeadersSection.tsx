import * as React from 'react';
import { Row, Col } from 'antd';
import { NbaGameDetails } from '../../../../../types/nba-api/nba-game-details.model';

interface Props {
  gameDetails: NbaGameDetails;
};

function StatsLeadersSection({ gameDetails }: Props) {
  return (
    <div>
      <h3>Stats Leaders</h3>
      <Row>
        <Col span={12} className="stats-leader-col">
          {gameDetails.hTeam.leaders.map((leader, i) => {
            return (
              <Row className="row" key={i}>
                <Col span={8}>{leader.name}</Col>
                <Col span={8}>{leader.stat}</Col>
                <Col span={8}>{leader.value}</Col>
              </Row>
            )
          })}
        </Col>
        <Col span={12} className="stats-leader-col">
          {gameDetails.vTeam.leaders.map((leader, i) => {
            return (
              <Row className="row" key={i}>
                <Col span={8}>{leader.name}</Col>
                <Col span={8}>{leader.stat}</Col>
                <Col span={8}>{leader.value}</Col>
              </Row>
            )
          })}
        </Col>
      </Row>
    </div>
  );
}

export default StatsLeadersSection;