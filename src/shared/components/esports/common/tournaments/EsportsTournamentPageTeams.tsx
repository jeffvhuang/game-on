import * as React from "react";

import { ESportsTournament } from "../../../../../types/esports-api/esports-tournament.model";

interface Props {
  tournament: ESportsTournament;
}

function EsportsTournamentPageTeams({ tournament }: Props) {
  return (
    <div className="team-section">
      <h3>Teams</h3>
      <div className="teams-list">
        {tournament.teams.map(team => (
          <div key={team.id} className="team-name">
            <h4>{team.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EsportsTournamentPageTeams;
