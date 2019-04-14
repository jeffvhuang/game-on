import React from 'react';
import { string, array } from 'prop-types';

import TennisTournamentDate from './TennisTournamentDate';

TennisTournaments.propTypes = {
  header: string,
  games: array.isRequired,
  values: array.isRequired
};

function TennisTournaments({ header, games, values }) {
  return (
    <div className="margin-bot">
      <h2>{header}</h2>
      {values.length < 1 ? (
        games.map((g, i) => <TennisTournamentDate key={i} tournament={g} />)
      ) : (
        games.map((g, i) => {
          if (values.some(x => x == g.homeTeam || x == g.awayTeam)) {
            return <TennisTournamentDate key={i} tournament={g} />;
          }
        })
      )}
    </div>
  );
}

export default TennisTournaments;