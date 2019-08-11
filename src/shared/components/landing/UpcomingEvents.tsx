import * as React from 'react';
import { GameOnEvent } from '../../../types/game-on-general/game-on-event.model';
import UpcomingEvent from './UpcomingEvent';

interface Props {
  events: GameOnEvent[];
  values: string[]
};

function UpcomingEvents({ events, values }: Props) {
  return (
    <>
      {events.map((event, i) => {
        let isInValues = false;
        for (let i = 0; i < values.length; i++) {
          const value = values[i];
          if (value.includes(event.selector)) {
            isInValues = true;
            break;
          } 
        }

        if (values.length == 0 || isInValues)
          return <UpcomingEvent key={event.id} event={event} />;
      })}
    </>
  );
}

export default UpcomingEvents;