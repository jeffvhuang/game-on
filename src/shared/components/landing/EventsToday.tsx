import * as React from 'react';
import { GameOnEvent } from '../../../types/game-on-general/game-on-event.model';
import UpcomingEvent from './UpcomingEvent';
import EventWithScore from './EventWithScore';
import { getFormattedTime } from '../../../helpers/utils';

interface Props {
  events: GameOnEvent[]
};

function EventsToday({ events }: Props) {
  const now = new Date();
  return (
    <>
      {events.map((event, i) => {
        const numOfCompetitors = event.competitors.length;
        const competitor1 = (numOfCompetitors > 0) ? event.competitors[0].name : 'TBD';
        const competitor2 = (numOfCompetitors > 1) ? event.competitors[1].name : 'TBD';

        // Set class for event depending on whether it is completed, live or upcoming
        
        const startTime = (event.startTime) ? new Date(event.startTime) : null;
        const endTime = (event.endTime) ? new Date(event.endTime) : null;

        if (startTime) {
          if (now < startTime) {
            return (
              <UpcomingEvent key={event.id}
                sport={event.sport} 
                leagueOrTournament={event.leagueOrTournament}
                competitor1={competitor1}
                competitor2={competitor2}
                timeString={getFormattedTime(startTime)} />
            )
          } else { // Either live or completed
            let eventClass = 'event-row';
            if (endTime && now >= endTime) {
              eventClass += ' completed-event';
            } else {
              eventClass += ' live-event';
            }

            const score1 = (numOfCompetitors > 0) ? event.competitors[0].score : '';
            const score2 = (numOfCompetitors > 1) ? event.competitors[1].score : '';
            
            return (
              <EventWithScore key={event.id}
                eventClass={eventClass}
                sport={event.sport} 
                leagueOrTournament={event.leagueOrTournament}
                competitor1={competitor1}
                competitor2={competitor2}
                score1={score1}
                score2={score2} />
            )
          }
        }
      })}
    </>
  );
}

export default EventsToday;