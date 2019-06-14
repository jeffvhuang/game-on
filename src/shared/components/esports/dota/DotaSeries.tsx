import React from 'react';
import { string, array, bool, func } from 'prop-types';
import { Collapse } from 'antd';

import DotaTournamentDate from './DotaTournamentDate';

const Panel = Collapse.Panel;

DotaSeries.propTypes = {
  header: string,
  series: array.isRequired,
  values: array.isRequired,
  showTournamentsMatches: bool.isRequired,
  selectTournament: func.isRequired
};

function DotaSeries({ header, series, values, showTournamentsMatches, selectTournament }) {
  return (
    <div className="list">
      <h2>{header}</h2>
      <Collapse bordered={false} defaultActiveKey={['1']}>
        {series.map((s, i) => (
          <Panel header={s.league.name + ' ' + s.name} key={i + 1}>
            {s.tournaments.map(t => {
              return <DotaTournamentDate key={t.id} selectTournament={selectTournament}
                tournament={t} showTournamentsMatches={showTournamentsMatches}  />;
            })}
          </Panel>
        ))}
      </Collapse>
    </div>
  );
}

export default DotaSeries;