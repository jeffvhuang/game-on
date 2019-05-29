import React from 'react';
import { string, array, bool, func } from 'prop-types';

import DotaTournamentDate from './DotaTournamentDate';

DotaTournaments.propTypes = {
  header: string,
  tournaments: array.isRequired,
  values: array.isRequired,
  showTournamentsMatches: bool.isRequired,
  selectTournament: func.isRequired
};

function DotaTournaments({ header, tournaments, values, showTournamentsMatches, selectTournament }) {
  return (
    <div className="margin-bot">
      <h2>{header}</h2>
      {values.length < 1 ? (
        tournaments.map((t, i) => <DotaTournamentDate key={i} tournament={t}
          showTournamentsMatches={showTournamentsMatches} selectTournament={selectTournament} />)
      ) : (
        // For each tournament, check if any of the selected teams (values) are playing
        tournaments.map((t, index) => {
          for (let i = 0; i < t.teams.length; i++) {
            if (values.some(v => v == t.teams[i].id))
              return <DotaTournamentDate key={index} tournament={t}
                showTournamentsMatches={showTournamentsMatches} selectTournament={selectTournament} />;
          }          
        })
      )}
    </div>
  );
}

export default DotaTournaments;