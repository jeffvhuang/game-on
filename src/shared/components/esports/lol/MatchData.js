import React from 'react';
import { object } from 'prop-types';

MatchData.propTypes = {
  match: object
};

function MatchData({ match }) {
  const now = new Date();
  return (
    <div className="expanded-row">
      {now < new Date(match.beginAt) ? (
        <div>Match has not begun</div>
      ) : (
        <div>
        {match.games.map(game => {
          return (game.finished) ? (
            <div key={game.id}>
              <div>Winner: {game.winner.id}</div>
              <div>Duration: {Math.floor(game.length/60) + '.' + game.length%60}</div>
            </div>
          ) : (
            <div key={game.id}>Game has not finished</div>
          );
        })}
        </div>
      )}
      
    </div>
  );
}

export default MatchData;