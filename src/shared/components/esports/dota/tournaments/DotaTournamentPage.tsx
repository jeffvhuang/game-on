import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import { getDotaSeriesTournaments } from "../../../../redux/dota/dota-actions";
import { DotaState } from "../../../../redux/dota/dota-types";
import { ReduxState } from "../../../../redux/redux-state";
import { ESportsTournament } from "../../../../../types/esports-api/esports-tournament.model";
import {
  capitalise,
  getDateWithOrdinal,
  getFormattedTime
} from "../../../../../helpers/utils";
import { ESportsMatchBase } from "../../../../../types/esports-api/esports-match-base.model";
import { ESportsTeamBase } from "../../../../../types/esports-api/esports-team-base.model";

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

  getStatus = (match: ESportsMatchBase, teams: ESportsTeamBase[]): string => {
    if (match.status === "not_started") {
      console.log(match.beginAt);
      return (
        this.parseDate(match.beginAt) +
        " - " +
        getFormattedTime(new Date(match.beginAt))
      );
    } else if (match.status === "finished") {
      if (match.draw) return "Draw";
      const winner = teams.find(t => t.id == match.winnerId);
      return winner ? winner.acronym + " Wins" : "Match Finished";
    } else {
      return this.capitaliseParts(match.status);
    }
  };

  parseDate = (date: string): string => {
    const d = new Date(date);
    return getDateWithOrdinal(d);
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
                  <div className="match match-header-row">
                    <div>
                      <h4>Matchup</h4>
                    </div>
                    <div className="match-type">Game Type</div>
                    <div>Status</div>
                  </div>
                </div>
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
                      <div className="match-status">
                        {this.getStatus(match, tournament.teams)}
                      </div>
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
