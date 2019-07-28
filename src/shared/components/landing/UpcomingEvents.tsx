import * as React from 'react';
import { GameOnEvent } from '../../../types/game-on-general/game-on-event.model';
import { getFormattedTime } from '../../../helpers/utils';
import UpcomingEvent from './UpcomingEvent';

interface Props {
  events: GameOnEvent[];
};

function UpcomingEvents({ events }: Props) {
  return (
    <>
      {events.map((event, i) => {
        const numOfCompetitors = event.competitors.length;
        const competitor1 = (numOfCompetitors > 0) ? event.competitors[0].name : 'TBD';
        const competitor2 = (numOfCompetitors > 1) ? event.competitors[1].name : 'TBD';
        
        const startDate = (event.startTime) ? new Date(event.startTime) : null;

        return (
          <UpcomingEvent key={event.id}
            sport={event.sport} 
            leagueOrTournament={event.leagueOrTournament}
            competitor1={competitor1}
            competitor2={competitor2}
            timeString={getFormattedTime(startDate)} />
        );
      })}
    </>
  );
}

export default UpcomingEvents;