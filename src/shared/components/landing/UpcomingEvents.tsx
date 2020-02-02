import * as React from "react";
import { GameOnEvent } from "../../../types/game-on-general/game-on-event.model";
import UpcomingEvent from "./UpcomingEvent";
import UpcomingTournamentEvent from "./UpcomingTournamentEvent";

interface Props {
  events: GameOnEvent[];
  values: string[];
  daysAheadOfToday: number;
}

function UpcomingEvents({ events, values, daysAheadOfToday }: Props) {
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

        if (values.length == 0 || isInValues) {
          if (event.sport.toLowerCase() === "tennis")
            return (
              <UpcomingTournamentEvent
                key={event.id}
                event={event}
                daysAheadOfToday={daysAheadOfToday}
              />
            );
          else return <UpcomingEvent key={event.id} event={event} />;
        }
      })}
    </>
  );
}

export default UpcomingEvents;
