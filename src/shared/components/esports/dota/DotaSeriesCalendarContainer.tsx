import * as React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import SelectDropdown from "../../common/SelectDropdown";
import { ESportsTournament } from "../../../../types/esports-api/esports-tournament.model";
import { getEsportsTournamentsForCalendar } from "../../../../helpers/utils";

interface Props {
  tournaments: ESportsTournament[];
  selectTournament: (id: number) => () => void;
}

function DotaSeriesCalendarContainer({ tournaments, selectTournament }) {
  return (
    <div className="section content">
      {/* <SelectDropdown
        handleChange={this.handleChange}
        options={this.props.lol.teams}
      /> */}
      <div className="calendar">
        <FullCalendar
          defaultView="dayGridMonth"
          plugins={[dayGridPlugin]}
          events={getEsportsTournamentsForCalendar(tournaments)}
          eventClick={selectTournament}
        />
      </div>
    </div>
  );
}

export default DotaSeriesCalendarContainer;
