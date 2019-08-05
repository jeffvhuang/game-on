import * as React from 'react';
import { Row, Col } from 'antd';
import { NbaGameDetails } from '../../../../../types/nba-api/nba-game-details.model';

interface Props {
  gameDetails: NbaGameDetails;
};

function TeamsAndScoresSection({ gameDetails }: Props) {
  return (
    <Row className="team-and-scores">
      <Col span={8} className="team-display">
        <Row className="team-name-row">
          <h2>{gameDetails.hTeam.fullName}</h2>
        </Row>
        <Row className="image-row">
          <img src={gameDetails.hTeam.logo} />
        </Row>
      </Col>
      <Col span={8} className="score-display">
        {/* <Row className="team-name-row">&nbsp;</Row> */}
        <Row className="points-row">
          <div className="scores-container">
            <Col span={8}>
              <h2>{gameDetails.hTeam.score.points}</h2>
            </Col>
            <Col span={8}><h2>-</h2></Col>
            <Col span={8}>
              <h2>{gameDetails.vTeam.score.points}</h2>
            </Col>
          </div>
        </Row>
        {/* {gameDetails} */}
        <Row className="period-display">
          <Col span={6} offset={2}>
            <h2>Q{gameDetails.currentPeriod.charAt(0)}</h2>
          </Col>
          <Col span={12}>
            <h2>{gameDetails.clock}</h2>
          </Col>
        </Row>
      </Col>
      <Col span={8} className="team-display">
        <Row className="team-name-row">
          <h2>{gameDetails.vTeam.fullName}</h2>
        </Row>
        <Row className="image-row">
          <img src={gameDetails.vTeam.logo} />
        </Row>
      </Col>
    </Row>
  );
}

export default TeamsAndScoresSection;