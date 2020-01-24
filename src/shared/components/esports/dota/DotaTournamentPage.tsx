import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import { getDotaSeriesTournaments } from "../../../redux/dota/dota-actions";
import { DotaState } from "../../../redux/dota/dota-types";
import { ReduxState } from "../../../redux/redux-state";
import { ESportsTournament } from "../../../../types/esports-api/esports-tournament.model";
import EsportsTournamentPageTeams from "../common/tournaments/EsportsTournamentPageTeams";
import EsportsTournamentPageMatches from "../common/tournaments/EsportsTournamentPageMatches";

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

  render() {
    return (
      <div className="section content">
        <div className="page-header">
          <h1>
            {this.getTournamentName(this.props.dota.selectedSeriesTournaments)}
          </h1>
        </div>
        <div>
          {this.props.dota.selectedSeriesTournaments.map(tournament => (
            <div key={tournament.id} className="tournament-section">
              <h2>{tournament.name}</h2>
              <EsportsTournamentPageTeams tournament={tournament} />
              <EsportsTournamentPageMatches tournament={tournament} />
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
