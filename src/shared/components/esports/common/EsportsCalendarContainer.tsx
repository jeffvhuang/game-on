import * as React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import SelectDropdown from "../../common/SelectDropdown";
import { ESportsSeries } from "../../../../types/esports-api/esports-series.model";
import { getEsportsTournamentsForCalendarFromSeries } from "../../../../helpers/utils";

interface Props {
  selectTournament: (info: any) => void;
  getEvents: (fetchInfo, successCallback, failureCallback) => void;
}

function EsportsCalendarContainer({ selectTournament, getEvents }: Props) {
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
          events={getEvents}
          eventClick={selectTournament}
        />
      </div>
    </div>
  );
}

export default EsportsCalendarContainer;
