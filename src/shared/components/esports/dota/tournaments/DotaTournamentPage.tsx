import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import { getDotaSeriesMatches } from "../../../../redux/dota/dota-actions";
import { DotaState } from "../../../../redux/dota/dota-types";
import { ReduxState } from "../../../../redux/redux-state";

interface MatchParams {
  id: string;
}
interface StateProps extends RouteComponentProps<MatchParams> {
  dota: DotaState;
}
interface DispatchProps {
  getDotaSeriesMatches;
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
      this.props.getDotaSeriesMatches(this.state.id);
  }

  render() {
    return (
      <div>
        <div className="page-header">
          <h1>Dota 2 Tournament: {this.state.id}</h1>
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
