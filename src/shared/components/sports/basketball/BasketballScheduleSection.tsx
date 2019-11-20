import * as React from "react";
import { Row, Col } from "antd";

import NbaMatchSchedule from "./NbaMatchSchedule";

interface Props {
  header: string;
  games: any[];
  values: string[];
  numToShow?: number;
}

function BasketballScheduleSection({
  header,
  games,
  values,
  numToShow
}: Props) {
  let gamesToShow: any[];

  if (values.length > 0)
    gamesToShow = games.filter(g =>
      values.some(
        selected =>
          selected === g.hTeam.shortName || selected === g.vTeam.shortName
      )
    );
  else gamesToShow = games.slice();

  if (header === "Upcoming") gamesToShow = gamesToShow.slice(0, numToShow);

  return (
    <div className="margin-bot">
      <h2>{header}</h2>
      <Row>
        <Col span={8}>
          <h3>Away</h3>
        </Col>
        <Col span={8}>
          <h3>Home</h3>
        </Col>
        <Col span={8} />
      </Row>
      {gamesToShow.map((g, i) => (
        <NbaMatchSchedule key={i} game={g} />
      ))}
    </div>
  );
}

export default BasketballScheduleSection;
