import * as React from 'react';
import { Row, Col } from 'antd';

import FootballMatchSchedule from './FootballMatchSchedule';

interface Props {
  header: string,
  games: any[],
  values: string[]
};

function FootballScheduleSection({ header, games, values }: Props) {
  return (
    <div className="margin-bot">
      <h2>{header}</h2>
      <Row>
        <Col span={7}><h3>Away Team</h3></Col>
        <Col span={2} />
        <Col span={7}><h3>Home Team</h3></Col>
        <Col span={8} />
      </Row>
      {values.length < 1 ? (
        games.map((g, i) => <FootballMatchSchedule key={i} game={g} />)
      ) : (
        games.map((g, i) => {
          if (values.some(x => x == g.homeTeam.teamName || x == g.awayTeam.teamName)) {
            return <FootballMatchSchedule key={i} game={g} />;
          }
        })
      )}
    </div>
  );
}

export default FootballScheduleSection;