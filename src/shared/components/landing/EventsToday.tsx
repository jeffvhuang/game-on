import * as React from "react";
import { GameOnEvent } from "../../../types/game-on-general/game-on-event.model";
import UpcomingEvent from "./UpcomingEvent";
import EventWithScore from "./EventWithScore";
import EventWithMessage from "./EventWithMessage";

interface Props {
  events: GameOnEvent[];
  values: string[];
}

function EventsToday({ events, values }: Props) {
  const now = new Date();
  return (
    <>
      {events.map((event, i) => {
        // Check if the event is part of the selected values
        let isInValues = false;
        for (let i = 0; i < values.length; i++) {
          const value = values[i];
          if (value.includes(event.selector)) {
            isInValues = true;
            break;
          }
        }

        // Only need show event if it is in values
        if (values.length == 0 || isInValues) {
          // Use status to determine appropriate details to show if available
          if (event.status.length) {
            if (event.status == "Upcoming") {
              return <UpcomingEvent key={event.id} event={event} />;
            } else if (event.status == "Live" || event.status == "Completed") {
              return <EventWithScore key={event.id} event={event} />;
            } else if (
              event.status == "Canceled" ||
              event.status == "Postponed"
            ) {
              return <EventWithMessage key={event.id} event={event} />;
            }
            // No status is available so use date
          } else {
            // Use date to get status if no status is set
            // Set class for event depending on whether it is completed, live or upcoming
            const startTime = event.startTime
              ? new Date(event.startTime)
              : null;
            const endTime = event.endTime ? new Date(event.endTime) : null;

            if (startTime) {
              if (now < startTime) {
                return <UpcomingEvent key={event.id} event={event} />;
              } else {
                // Either live or completed
                return <EventWithScore key={event.id} event={event} />;
              }
            }
          }
        }
      })}
    </>
  );
}

export default EventsToday;
