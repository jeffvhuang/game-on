import * as React from "react";
import { connect } from "react-redux";

import { getDotaSeries } from "../../../redux/dota/dota-actions";
import { DotaState } from "../../../redux/dota/dota-types";
import { ReduxState } from "../../../redux/redux-state";
import DotaSeriesListContainer from "./list-view/DotaSeriesListContainer";
import DotaSeriesCalendarContainer from "./DotaSeriesCalendarContainer";

interface StateProps {
  dota: DotaState;
}
interface DispatchProps {
  getDotaSeries;
}
type Props = StateProps & DispatchProps;
interface State {
  isListView: boolean;
}

class DotaSeriesPage extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      isListView: false
    };
  }

  componentDidMount() {
    if (!this.props.dota.series.length) this.props.getDotaSeries();
  }

  toggleView = () =>
    this.setState(prevState => ({
      isListView: !prevState.isListView
    }));

  selectTournament = () => {};

  render() {
    return (
      <div>
        <div className="page-header">
          <h1>Dota 2</h1>
        </div>
        {this.state.isListView ? (
          <DotaSeriesListContainer />
        ) : (
          <DotaSeriesCalendarContainer
            series={this.props.dota.series}
            selectTournament={this.selectTournament}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  dota: state.dota
});

const mapDispatchToProps = {
  getDotaSeries
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DotaSeriesPage);
