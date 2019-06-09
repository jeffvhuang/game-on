import React from 'react';
import { string, array } from 'prop-types';

import DotaTournamentMatch from '../dota/DotaTournamentMatch';

LolTournamentMatches.propTypes = {
  header: string,
  matches: array.isRequired,
  values: array.isRequired
};

function LolTournamentMatches({ header, matches, values }) {
  return (
    <div className="list">
      <h2>{header}</h2>
      {values.length < 1 ? (
        matches.map((m, i) => <DotaTournamentMatch key={i} match={m} />)
      ) : (
        matches.map((m, i) => {
          if (values.some(v => v == m.opponents[0].opponent.name || v == m.opponents[1].opponent.name)) {
            return <DotaTournamentMatch key={i} match={m} />;
          }
        })
      )}
    </div>
  );
}

export default LolTournamentMatches;