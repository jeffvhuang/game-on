import * as React from 'react';
import { Collapse } from 'antd';

import DotaSeriesTournamentDate from './DotaSeriesTournamentDate';
import { ESportsSeries } from '../../../../types/esports-api/espots-series.model';

const Panel = Collapse.Panel;

interface Props {
  header: string,
  series: ESportsSeries[],
  values: string[],
  showTournamentsMatches: boolean,
  selectTournament: (id: number) => () => void;
};

function DotaSeries({ header, series, values, showTournamentsMatches, selectTournament }: Props) {
  return (
    <div className="list">
      <h2>{header}</h2>
      <Collapse bordered={false} defaultActiveKey={['1']}>
        {series.map((s, i) => (
          <Panel header={s.league.name + ' ' + s.name} key={(i + 1).toString()}>
            {s.tournaments.map(t => {
              return <DotaSeriesTournamentDate key={t.id} selectTournament={selectTournament}
                tournament={t} showTournamentsMatches={showTournamentsMatches}  />;
            })}
          </Panel>
        ))}
      </Collapse>
    </div>
  );
}

export default DotaSeries;