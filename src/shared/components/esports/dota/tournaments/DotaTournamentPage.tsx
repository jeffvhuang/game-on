import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import { getDotaSeriesMatches } from "../../../../redux/dota/dota-actions";
import { DotaState } from "../../../../redux/dota/dota-types";
import { ReduxState } from "../../../../redux/redux-state";

interface MatchParams {
  matchId: string;
}
interface StateProps extends RouteComponentProps<MatchParams> {
  dota: DotaState;
}
interface DispatchProps {
  getDotaSeriesMatches;
}
type Props = StateProps & DispatchProps;
interface State {
  matchId: string;
}

class DotaTournamentPage extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      matchId: props.match.params.matchId
    };
  }

  componentDidMount() {
    const { dota } = this.props;
    // Get the tournamentMatches if no matches in array or not matcehs from same tournament
    if (
      !dota.tournamentMatches.length ||
      dota.tournamentMatches[0].seriesId.toString() != this.state.matchId
    )
      this.props.getDotaSeriesMatches(this.state.matchId);
  }

  render() {
    return (
      <div>
        <div className="page-header">
          <h1>Dota 2 Series: {this.state.matchId}</h1>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  dota: state.dota
});

const mapDispatchToProps = {
  getDotaSeriesMatches
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DotaTournamentPage);
