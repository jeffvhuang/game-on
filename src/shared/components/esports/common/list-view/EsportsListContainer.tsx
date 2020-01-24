import * as React from "react";

import { sortESportsSeries } from "../../../../../helpers/utils";
import SelectDropdown from "../../../common/SelectDropdown";
import EsportsList from "./EsportsList";
import { ESportsSeries } from "../../../../../types/esports-api/esports-series.model";
import { EsportsSortedSeries } from "../../../../../types/game-on-general/esports-sorted-series.model";

interface Props {
  series: ESportsSeries[];
  selectTournament: (id: number) => () => void;
}

function EsportsListContainer({ series, selectTournament }: Props) {
  const sortedSeries: EsportsSortedSeries = sortESportsSeries(series);

  return (
    <div className="section flex">
      <div className="full-width">
        {/* <SelectDropdown handleChange={this.handleChange}
            options={this.props.dota.teams} /> */}
        <EsportsList
          header="Ongoing"
          series={sortedSeries.ongoing}
          values={[]}
          selectTournament={selectTournament}
        />
        <EsportsList
          header="Upcoming"
          series={sortedSeries.upcoming}
          values={[]}
          selectTournament={selectTournament}
        />
        <EsportsList
          header="Completed"
          series={sortedSeries.completed}
          values={[]}
          selectTournament={selectTournament}
        />
      </div>
    </div>
  );
}

export default EsportsListContainer;
