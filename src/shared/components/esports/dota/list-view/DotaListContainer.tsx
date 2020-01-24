import * as React from "react";

import { sortESportsSeries } from "../../../../../helpers/utils";
import SelectDropdown from "../../../common/SelectDropdown";
import DotaList from "./DotaList";
import { ESportsSeries } from "../../../../../types/esports-api/esports-series.model";
import { EsportsSortedSeries } from "../../../../../types/game-on-general/esports-sorted-series.model";

interface Props {
  series: ESportsSeries[];
  selectTournament: (id: number) => () => void;
}

function DotaListContainer({ series, selectTournament }: Props) {
  const sortedSeries: EsportsSortedSeries = sortESportsSeries(series);

  return (
    <div className="section flex">
      <div className="full-width">
        {/* <SelectDropdown handleChange={this.handleChange}
            options={this.props.dota.teams} /> */}
        <DotaList
          header="Ongoing"
          series={sortedSeries.ongoing}
          values={[]}
          selectTournament={selectTournament}
        />
        <DotaList
          header="Upcoming"
          series={sortedSeries.upcoming}
          values={[]}
          selectTournament={selectTournament}
        />
        <DotaList
          header="Completed"
          series={sortedSeries.completed}
          values={[]}
          selectTournament={selectTournament}
        />
      </div>
    </div>
  );
}

export default DotaListContainer;
