import * as React from 'react';

import DotaTournamentDate from './DotaTournamentDate';
import { ESportsTournament } from '../../../../types/esports-api/esports-tournament.model';

interface Props {
  header: string,
  tournaments: ESportsTournament[],
  values: string[],
  showTournamentsMatches: boolean,
  selectTournament: (id: number) => () => void;
};

function DotaTournaments({ header, tournaments, values, showTournamentsMatches, selectTournament }: Props) {
  return (
    <div className="list">
      <h2>{header}</h2>
      {values.length < 1 ? (
        tournaments.map((t, i) => <DotaTournamentDate key={i} tournament={t}
          showTournamentsMatches={showTournamentsMatches} selectTournament={selectTournament} />)
      ) : (
        // For each tournament, check if any of the selected teams (values) are playing
        tournaments.map((t, index) => {
          for (let i = 0; i < t.teams.length; i++) {
            if (values.some(v => v == t.teams[i].name))
              return <DotaTournamentDate key={index} tournament={t}
                showTournamentsMatches={showTournamentsMatches} selectTournament={selectTournament} />;
          }          
        })
      )}
    </div>
  );
}

export default DotaTournaments;