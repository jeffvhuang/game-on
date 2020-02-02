import * as React from "react";
import { ESportsMatch } from "../../../../types/esports-api/esports-match.model";
import { ESportsOpponent } from "../../../../types/esports-api/esports-opponent.model";
import { futureDate } from "../../../../helpers/utils";

interface Props {
  match: ESportsMatch;
  getWinnerName: (
    winnerId: number | null,
    opponents: ESportsOpponent[]
  ) => string | undefined;
  getWinnerLogo: (
    winnerId: number | null,
    opponents: ESportsOpponent[]
  ) => string | undefined;
}

function MatchData({ match, getWinnerName, getWinnerLogo }: Props) {
  const now = new Date();
  const beginDate = match.beginAt ? new Date(match.beginAt) : futureDate;

  return (
    <div className="expanded-row">
      {now < beginDate ? (
        <div className="game-row">Match has not begun</div>
      ) : (
        match.games.map((game, i) => {
          const winnerId = game.winner ? game.winner.id : null;
          const duration = game.length
            ? Math.floor(game.length / 60) + "." + (game.length % 60)
            : null;

          return game.finished ? (
            <div key={i} className="game-row">
              <div>Game {game.position}</div>
              <div>Winner:</div>
              <div>
                <img
                  className="team-logo-small"
                  src={getWinnerLogo(winnerId, match.opponents)}
                />
                {getWinnerName(winnerId, match.opponents)}
              </div>
              <div>Duration: {duration}</div>
            </div>
          ) : (
            <div key={i} className="game-row">
              Game has not finished
            </div>
          );
        })
      )}
    </div>
  );
}

export default MatchData;
