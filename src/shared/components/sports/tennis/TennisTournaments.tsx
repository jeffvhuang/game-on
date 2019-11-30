import * as React from "react";

import TennisTournamentDate from "./TennisTournamentDate";
import { TennisTournament } from "../../../../types/tennis-api/tennis-tournament.model";

interface Props {
  header: string;
  tournaments: TennisTournament[];
  values: string[];
  numToShow?: number;
}

function TennisTournaments({ header, tournaments, values, numToShow }: Props) {
  // Antd Select dropdown uses name value rather than id to be able to search
  const levelValues = values.map(function(value) {
    return value.toLowerCase().replace(/ /g, "_");
  });

  let tournamentsToShow: TennisTournament[];

  if (levelValues.length > 0)
    tournamentsToShow = tournaments.filter(t =>
      levelValues.some(v => v == t.category.level || v == t.type)
    );
  else tournamentsToShow = tournaments.slice();

  if (header === "Upcoming" || header === "Completed")
    tournamentsToShow = tournamentsToShow.slice(0, numToShow);

  return (
    <div className="margin-bot">
      <h2>{header}</h2>
      {tournamentsToShow.map((t, i) => {
        return <TennisTournamentDate key={i} tournament={t} />;
      })}
    </div>
  );
}

export default TennisTournaments;
