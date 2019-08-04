import * as React from 'react';
import { Row, Col } from 'antd';
import { NbaGameDetails } from '../../../../../types/nba-api/nba-game-details.model';

interface Props {
  gameDetails: NbaGameDetails;
};

function TeamsAndScoresSection({ gameDetails }: Props) {
  return (
    <Row>
      <Col span={8} className="team-display">
        <Row>{gameDetails.hTeam.fullName}</Row>
        <Row><img src={gameDetails.hTeam.logo} /></Row>
      </Col>
      <Col span={8}>
        <Row className="score-display">
          <Col span={8}>{gameDetails.hTeam.score.points}</Col>
          <Col span={8}>-</Col>
          <Col span={8}>{gameDetails.vTeam.score.points}</Col>
        </Row>
        <Row className="period-display">
          <Col span={6}>Q{gameDetails.currentPeriod.charAt(0)}</Col>
          <Col span={18}>{gameDetails.clock}</Col>
        </Row>
      </Col>
      <Col span={8} className="team-display">
        <Row>{gameDetails.vTeam.fullName}</Row>
        <Row><img src={gameDetails.vTeam.logo} /></Row>
      </Col>
    </Row>

//  <div>
//       <div className="team-display">
//         <div>{gameDetails.hTeam.fullName}</div>
//         <div><img src={gameDetails.hTeam.logo} /></div>
//       </div>
//       <div>
//         <div className="score-display">
//           <div>{gameDetails.hTeam.score.points}</div>
//           <div>-</div>
//           <div>{gameDetails.vTeam.score.points}</div>
//         </div>
//         <div className="period-display">
//           <div>Q{gameDetails.currentPeriod.charAt(0)}</div>
//           <div>{gameDetails.clock}</div>
//         </div>
//       </div>
//       <div className="team-display">
//         <div>{gameDetails.vTeam.fullName}</div>
//         <div><img src={gameDetails.vTeam.logo} /></div>
//       </div>
//     </div> 
  );
}

export default TeamsAndScoresSection;