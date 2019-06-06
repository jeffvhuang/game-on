import React from 'react';
import { string, array, bool, func } from 'prop-types';

import DotaTournamentDate from './DotaTournamentDate';

DotaSeries.propTypes = {
  header: string,
  series: array.isRequired,
  values: array.isRequired,
  showTournaments: bool.isRequired,
  selectSeries: func.isRequired
};

function DotaSeries({ header, series, values, showTournaments, selectSeries }) {
  return (
    <div className="list">
      <h2>{header}</h2>
      {series.map((s, i) => <DotaTournamentDate key={i} tournament={s}
          showTournamentsMatches={showTournaments} selectTournament={selectSeries} />)}
    </div>
  );
}

export default DotaSeries;