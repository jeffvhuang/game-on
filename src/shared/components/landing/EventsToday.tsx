import * as React from 'react';
import { GameOnEvent } from '../../../types/game-on-general/game-on-event.model';
import UpcomingEvent from './UpcomingEvent';
import EventWithScore from './EventWithScore';
import EventWithMessage from './EventWithMessage';

interface Props {
  events: GameOnEvent[]
};

function EventsToday({ events }: Props) {
  const now = new Date();
  return (
    <>
      {events.map((event, i) => {
        if (event.status.length) {
          if (event.status == 'Upcoming') {
            return <UpcomingEvent key={event.id} event={event} />;
          } else if (event.status == 'Live' || event.status == 'Completed') {
            return <EventWithScore key={event.id} event={event} />;
          } else if (event.status == 'Canceled' || event.status == 'Postponed') {
            return <EventWithMessage key={event.id} event={event} />;;
          }
        } else {
          // Use date to get status if no status is set
          // Set class for event depending on whether it is completed, live or upcoming
          const startTime = (event.startTime) ? new Date(event.startTime) : null;
          const endTime = (event.endTime) ? new Date(event.endTime) : null;

          if (startTime) {
            if (now < startTime) {
              return <UpcomingEvent key={event.id} event={event} />;
            } else { // Either live or completed
              return <EventWithScore key={event.id} event={event} />;
            }
          }
        }
      })}
    </>
  );
}

export default EventsToday;