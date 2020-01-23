import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import { getDotaSeriesTournaments } from "../../../../redux/dota/dota-actions";
import { DotaState } from "../../../../redux/dota/dota-types";
import { ReduxState } from "../../../../redux/redux-state";
import { ESportsTournament } from "../../../../../types/esports-api/esports-tournament.model";
import { capitalise } from "../../../../../helpers/utils";

interface MatchParams {
  id: string;
}
interface StateProps extends RouteComponentProps<MatchParams> {
  dota: DotaState;
}
interface DispatchProps {
  getDotaSeriesTournaments;
}
type Props = StateProps & DispatchProps;
interface State {
  id: string;
}

class DotaTournamentPage extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      id: props.match.params.id
    };
  }

  componentDidMount() {
    const { dota } = this.props;
    // Get the tournaments for selected series if none in array or doesnt match from same tournament
    if (
      !dota.selectedSeriesTournaments.length ||
      dota.selectedSeriesTournaments[0].seriesId.toString() != this.state.id
    )
      this.props.getDotaSeriesTournaments(this.state.id);
  }

  getTournamentName = (tournaments: ESportsTournament[]) => {
    return tournaments.length ? tournaments[0].league.name : "";
  };

  capitaliseParts = (bestOf: string): string => {
    const parts = bestOf.split("_");
    const capitalisedParts = parts.map(p => capitalise(p));
    return capitalisedParts.join(" ");
  };

  render() {
    const { dota } = this.props;
    return (
      <div className="section content">
        <div className="page-header">
          <h1>{this.getTournamentName(dota.selectedSeriesTournaments)}</h1>
        </div>
        <div>
          {dota.selectedSeriesTournaments.map(tournament => (
            <div key={tournament.id} className="tournament-section">
              <h2>{tournament.name}</h2>
              <div className="team-section">
                <h3>Teams</h3>
                <div className="teams-list">
                  {tournament.teams.map(team => (
                    <div key={team.id} className="team-name">
                      <h4>{team.name}</h4>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3>Matches</h3>
                <div className="match-list">
                  {tournament.matches.map(match => (
                    <div key={match.id} className="match">
                      <div>
                        <h4>{match.name}</h4>
                      </div>
                      <div className="match-type">
                        {this.capitaliseParts(match.matchType)}{" "}
                        {match.numberOfGames.toString()}
                      </div>
                      <div>{this.capitaliseParts(match.status)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  dota: state.dota
});

const mapDispatchToProps = {
  getDotaSeriesTournaments
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DotaTournamentPage);
