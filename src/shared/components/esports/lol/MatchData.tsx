import * as React from 'react';
import { ESportsMatch } from '../../../../types/esports-api/esports-match.model';
import { ESportsOpponent } from '../../../../types/esports-api/esports-opponent.model';

interface Props  {
  match: ESportsMatch,
  getWinnerName: (winnerId: number, opponents: ESportsOpponent[]) => string | undefined;
  getWinnerLogo: (winnerId: number, opponents: ESportsOpponent[]) => string | undefined;
};

function MatchData({ match, getWinnerName, getWinnerLogo }: Props) {
  const now = new Date();
  return (
    <div className="expanded-row">
      {now < new Date(match.beginAt) ? (
        <div className="game-row">Match has not begun</div>
      ) : (
        match.games.map(game => {
          return (game.finished) ? (
            <div key={game.id} className="game-row">
              <div>Game {game.position}</div>
              <div>Winner:</div>
              <div>
                <img className="team-logo-small" src={getWinnerLogo(game.winner.id, match.opponents)} />
                {getWinnerName(game.winner.id, match.opponents)}
              </div>
              <div>Duration: {Math.floor(game.length/60) + '.' + game.length%60}</div>
            </div>
          ) : (
            <div key={game.id} className="game-row">Game has not finished</div>
          );
        })
      )}
      
    </div>
  );
}

export default MatchData;