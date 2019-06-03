import React from 'react';
import { string, array } from 'prop-types';

import DotaMatch from './DotaMatch';

DotaMatches.propTypes = {
  header: string,
  matches: array.isRequired,
  values: array.isRequired
};

function DotaMatches({ header, matches, values }) {
  return (
    <div className="list">
      <h2>{header}</h2>
      {values.length < 1 ? (
        matches.map((m, i) => <DotaMatch key={i} match={m} />)
      ) : (
        matches.map((m, i) => {
          if (values.some(v => v == m.opponents[0].opponent.id || v == m.opponents[1].opponent.id)) {
            return <DotaMatch key={i} match={m} />;
          }
        })
      )}
    </div>
  );
}

export default DotaMatches;