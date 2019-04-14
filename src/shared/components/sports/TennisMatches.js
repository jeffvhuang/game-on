import React from 'react';
import { string, array } from 'prop-types';

import TennisMatchup from './TennisMatchup';

TennisMatches.propTypes = {
  header: string,
  games: array.isRequired,
  values: array.isRequired
};

function TennisMatches({ header, games, values }) {
  return (
    <div className="margin-bot">
      <h2>{header}</h2>
      {values.length < 1 ? (
        games.map((g, i) => <TennisMatchup key={i} tournament={g} />)
      ) : (
        games.map((g, i) => {
          if (values.some(v => v == g.competitors[0].id || v == g.competitors[1].id)) {
            return <TennisMatchup key={i} tournament={g} />;
          }
        })
      )}
    </div>
  );
}

export default TennisMatches;