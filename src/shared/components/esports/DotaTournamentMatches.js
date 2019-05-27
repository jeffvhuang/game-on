import React from 'react';
import { string, array } from 'prop-types';

import DotaTournamentMatch from './DotaTournamentMatch';

DotaTournamentMatches.propTypes = {
  header: string,
  matches: array.isRequired,
  values: array.isRequired
};

function DotaTournamentMatches({ header, matches, values }) {
  return (
    <div className="margin-bot">
      <h2>{header}</h2>
      {values.length < 1 ? (
        matches.map((m, i) => <DotaTournamentMatch key={i} match={m} />)
      ) : (
        matches.map((m, i) => {
          if (values.some(v => v == m.opponents[0].opponent.id || v == m.opponents[1].opponent.id)) {
            return <DotaTournamentMatch key={i} match={m} />;
          }
        })
      )}
    </div>
  );
}

export default DotaTournamentMatches;