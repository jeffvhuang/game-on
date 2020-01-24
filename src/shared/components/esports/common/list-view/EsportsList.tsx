import * as React from "react";
import { Collapse } from "antd";

import EsportsListTournamentDate from "./EsportsListTournamentDate";
import { ESportsSeries } from "../../../../../types/esports-api/esports-series.model";

const Panel = Collapse.Panel;

interface Props {
  header: string;
  series: ESportsSeries[];
  values: string[]; // When implementing filtering with select dd
  selectTournament: (id: number) => () => void;
}

function EsportsList({ header, series, values, selectTournament }: Props) {
  return (
    <div className="list">
      <h2>{header}</h2>
      <Collapse bordered={false} defaultActiveKey={["1"]}>
        {series.map((s, i) => (
          <Panel header={s.league.name + " " + s.name} key={(i + 1).toString()}>
            {s.tournaments.map(t => {
              return (
                <EsportsListTournamentDate
                  key={t.id}
                  selectTournament={selectTournament}
                  tournament={t}
                />
              );
            })}
          </Panel>
        ))}
      </Collapse>
    </div>
  );
}

export default EsportsList;
