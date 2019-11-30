import * as React from "react";
import { Row, Col } from "antd";

import NbaMatchSchedule from "./NbaMatchSchedule";
import { NbaSchedule } from "../../../../types/nba-api/nba-schedule.model";
import NbaMatchScore from "./NbaMatchScore";

interface Props {
  header: string;
  games: NbaSchedule[];
  values: string[];
  numToShow?: number;
}

function BasketballScheduleSection({
  header,
  games,
  values,
  numToShow
}: Props) {
  let gamesToShow: NbaSchedule[];

  if (values.length > 0)
    gamesToShow = games.filter(g =>
      values.some(
        selected =>
          selected === g.hTeam.shortName || selected === g.vTeam.shortName
      )
    );
  else gamesToShow = games.slice();

  if (header === "Upcoming" || header === "Past")
    gamesToShow = gamesToShow.slice(0, numToShow);

  return (
    <div className="margin-bot">
      <h2>{header}</h2>
      {gamesToShow.length ? (
        <Row>
          <Col span={8}>
            <h3>Away</h3>
          </Col>
          <Col span={8}>
            <h3>Home</h3>
          </Col>
          <Col span={8} />
        </Row>
      ) : (
        <Row>
          <Col span={8}>No games to display</Col>
        </Row>
      )}
      {gamesToShow.length > 0 &&
        gamesToShow.map((g, i) => {
          if (g.statusGame === "Scheduled")
            return <NbaMatchSchedule key={i} game={g} />;
          else return <NbaMatchScore key={i} game={g} />;
        })}
    </div>
  );
}

export default BasketballScheduleSection;
