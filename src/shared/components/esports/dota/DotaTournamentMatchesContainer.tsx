import * as React from "react";
import { object, array } from "prop-types";
import { Link } from "react-router-dom";

import { paths } from "../../../../helpers/constants";
import { getTournamentName } from "../../../../helpers/utils";

import SelectDropdown from "../../common/SelectDropdown";
import DotaTournamentMatches from "./DotaTournamentMatches";
import { ESportsMatch } from "../../../../types/esports-api/esports-match.model";
import { ESportsTournamentBase } from "../../../../types/esports-api/esports-tournament-base.model";
import { ESportsTeamBase } from "../../../../types/esports-api/esports-team-base.model";

interface StateProps {
  tournament?: ESportsTournamentBase;
  teams: ESportsTeamBase[];
  matches: ESportsMatch[];
}
interface State {
  values: string[];
  tournamentName: string;
}

class DotaTournamentMatchesContainer extends React.Component<
  StateProps,
  State
> {
  constructor(props) {
    super(props);

    this.state = {
      values: [],
      tournamentName: getTournamentName(props.tournament)
    };
  }

  handleChange = values => this.setState({ values });

  render() {
    return (
      <div className="page-main-section">
        <h2>{this.state.tournamentName}</h2>
        <SelectDropdown
          handleChange={this.handleChange}
          options={this.props.teams}
        />
        <div className="section-left">
          <DotaTournamentMatches
            header="Matches"
            matches={this.props.matches}
            values={this.state.values}
          />
          <Link to={paths.EVENTS} className="right">
            More >
          </Link>
        </div>
      </div>
    );
  }
}

export default DotaTournamentMatchesContainer;
