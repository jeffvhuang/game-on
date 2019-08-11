import * as React from 'react';

const esportsImage = require('../../../../public/assets/esports-stadium.jpg');
const sportsImage = require('../../../../public/assets/football-stadium.jpg');

function Posters() {
  return (
    <div className="posters-container">
      <div className="poster">
        <img src={sportsImage} />
      </div>
      <div className="poster">
        <img src={esportsImage} />
      </div>
    </div>
  );
};

export default Posters;