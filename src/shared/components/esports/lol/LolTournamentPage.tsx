import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import { getLolSeriesTournaments } from "../../../redux/lol/lol-actions";
import { LolState } from "../../../redux/lol/lol-types";
import { ReduxState } from "../../../redux/redux-state";
import { ESportsTournament } from "../../../../types/esports-api/esports-tournament.model";
import EsportsTournamentPageTeams from "../common/tournaments/EsportsTournamentPageTeams";
import EsportsTournamentPageMatches from "../common/tournaments/EsportsTournamentPageMatches";
import PageHeader from "../../common/PageHeader";

interface MatchParams {
  id: string;
}
interface StateProps extends RouteComponentProps<MatchParams> {
  lol: LolState;
}
interface DispatchProps {
  getLolSeriesTournaments;
}
type Props = StateProps & DispatchProps;
interface State {
  id: string;
}

class LolTournamentPage extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      id: props.match.params.id
    };
  }

  componentDidMount() {
    const { lol } = this.props;
    // Get the tournaments for selected series if none in array or doesnt match from same tournament
    if (
      !lol.selectedSeriesTournaments.length ||
      lol.selectedSeriesTournaments[0].seriesId.toString() != this.state.id
    )
      this.props.getLolSeriesTournaments(this.state.id);
  }

  getTournamentName = (tournaments: ESportsTournament[]) => {
    return tournaments.length ? tournaments[0].league.name : "";
  };

  render() {
    return (
      <div className="section content">
        <PageHeader title={this.getTournamentName(this.props.lol.selectedSeriesTournaments)} isLoading={this.props.lol.isFetching} />
        <div>
          {this.props.lol.selectedSeriesTournaments.map(tournament => (
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
  lol: state.lol
});

const mapDispatchToProps = {
  getLolSeriesTournaments
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LolTournamentPage);
