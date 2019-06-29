import * as React from 'react';

import TennisMatchup from './TennisMatchup';
import { TennisTournamentSchedule } from '../../../../types/tennis-api/tennis-tournament-schedule.model';

interface Props {
  header: string,
  // games: TennisTournamentSchedule[],
  games: any[],
  values: string[]
};

function TennisMatches({ header, games, values }: Props) {
  return (
    <div className="margin-bot">
      <h2>{header}</h2>
      {values.length < 1 ? (
        games.map((g, i) => <TennisMatchup key={i} match={g} />)
      ) : (
        games.map((g, i) => {
          if (values.some(v => v == g.competitors[0].id || v == g.competitors[1].id)) {
            return <TennisMatchup key={i} match={g} />;
          }
        })
      )}
    </div>
  );
}

export default TennisMatches;