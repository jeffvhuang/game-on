import * as React from 'react';
import { GameOnEvent } from '../../../types/game-on-general/game-on-event.model';
import UpcomingEvent from './UpcomingEvent';

interface Props {
  events: GameOnEvent[];
};

function UpcomingEvents({ events }: Props) {
  return (
    <>
      {events.map((event, i) => {
        return  <UpcomingEvent key={event.id} event={event} />
      })}
    </>
  );
}

export default UpcomingEvents;