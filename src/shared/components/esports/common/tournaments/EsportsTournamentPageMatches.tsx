import * as React from "react";

import { ESportsTournament } from "../../../../../types/esports-api/esports-tournament.model";
import {
  capitalise,
  getFormattedTime,
  getDateWithOrdinal
} from "../../../../../helpers/utils";
import { ESportsMatchBase } from "../../../../../types/esports-api/esports-match-base.model";
import { ESportsTeamBase } from "../../../../../types/esports-api/esports-team-base.model";

interface Props {
  tournament: ESportsTournament;
}

function EsportsTournamentPageMatches({ tournament }: Props) {
  return (
    <div>
      <h3>Matches</h3>
      <div className="match-list">
        <div className="match match-header-row">
          <div>
            <h4>Matchup</h4>
          </div>
          <div className="match-type">Game Type</div>
          <div>Status</div>
        </div>
      </div>
      <div className="match-list">
        {tournament.matches.map(match => (
          <div key={match.id} className="match">
            <div>
              <h4>{match.name}</h4>
            </div>
            <div className="match-type">
              {capitaliseParts(match.matchType)}{" "}
              {match.numberOfGames.toString()}
            </div>
            <div className="match-status">
              {getStatus(match, tournament.teams)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function capitaliseParts(bestOf: string): string {
  const parts = bestOf.split("_");
  const capitalisedParts = parts.map(p => capitalise(p));
  return capitalisedParts.join(" ");
}

function getStatus(match: ESportsMatchBase, teams: ESportsTeamBase[]): string {
  if (match.status === "not_started") {
    return (
      parseDate(match.beginAt) +
      " - " +
      getFormattedTime(new Date(match.beginAt))
    );
  } else if (match.status === "finished") {
    if (match.draw) return "Draw";
    const winner = teams.find(t => t.id == match.winnerId);
    return winner ? winner.acronym + " Wins" : "Match Finished";
  } else {
    return capitaliseParts(match.status);
  }
}

function parseDate(date: string): string {
  const d = new Date(date);
  return getDateWithOrdinal(d);
}

export default EsportsTournamentPageMatches;
