import React from 'react';
import { string, array } from 'prop-types';

import DotaTournamentDate from './DotaTournamentDate';

DotaTournaments.propTypes = {
  header: string,
  games: array.isRequired,
  values: array.isRequired
};

function DotaTournaments({ header, games, values }) {
  return (
    <div className="margin-bot">
      <h2>{header}</h2>
      {values.length < 1 ? (
        games.map((g, i) => <DotaTournamentDate key={i} tournament={g} />)
      ) : (
        games.map((g, i) => {
          if (values.some(v => v == g.seriesId || v == g.leagueId)) {
            return <DotaTournamentDate key={i} tournament={g} />;
          }
        })
      )}
    </div>
  );
}

export default DotaTournaments;