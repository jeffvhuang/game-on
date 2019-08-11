import * as React from 'react';

import TennisTournamentDate from './TennisTournamentDate';
import { TennisTournament } from '../../../../types/tennis-api/tennis-tournament.model';

interface Props {
  header: string;
  tournaments: TennisTournament[];
  values: string[];
};

function TennisTournaments({ header, tournaments, values }: Props) {
  // Antd Select dropdown uses name value rather than id to be able to search
  const levelValues = values.map(function (value) {
    return value.toLowerCase().replace(' ', '_');
  });
  
  return (
    <div className="margin-bot">
      <h2>{header}</h2>
      {values.length < 1 ? (
        tournaments.map((t, i) => <TennisTournamentDate key={i} tournament={t} />)
      ) : (
        tournaments.map((t, i) => {
          if (levelValues.some(v => v == t.category.level || v == t.type)) {
            return <TennisTournamentDate key={i} tournament={t} />;
          }
        })
      )}
    </div>
  );
}

export default TennisTournaments;