import React from 'react';
import { string, array } from 'prop-types';

import DotaMatch from './DotaMatch';

DotaMatches.propTypes = {
  header: string,
  games: array.isRequired,
  values: array.isRequired
};

function DotaMatches({ header, games, values }) {
  return (
    <div className="margin-bot">
      <h2>{header}</h2>
      {values.length < 1 ? (
        games.map((g, i) => <DotaMatch key={i} game={g} />)
      ) : (
        games.map((g, i) => {
          // if (values.some(v => v == g.seriesId || v == g.leagueId)) {
            return <DotaMatch key={i} game={g} />;
          // }
        })
      )}
    </div>
  );
}

export default DotaMatches;