import React from 'react';
import { object, func } from 'prop-types';

MatchData.propTypes = {
  match: object.isRequired,
  getWinnerName: func.isRequired,
  getWinnerLogo: func.isRequired
};

function MatchData({ match, getWinnerName, getWinnerLogo }) {
  const now = new Date();
  return (
    <div className="expanded-row">
      {now < new Date(match.beginAt) ? (
        <div className="game-row">Match has not begun</div>
      ) : (
        match.games.map(game => {
          return (game.finished) ? (
            <div key={game.id} className="game-row">
              <div><img className="team-logo-small" src={getWinnerLogo(game.winner.id, match.opponents)} /></div>
              <div>Winner: {getWinnerName(game.winner.id, match.opponents)}</div>
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