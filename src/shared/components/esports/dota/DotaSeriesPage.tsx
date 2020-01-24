import * as React from "react";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { compose } from "redux";
import { Button } from "antd";

import { getDotaSeries } from "../../../redux/dota/dota-actions";
import { DotaState } from "../../../redux/dota/dota-types";
import { ReduxState } from "../../../redux/redux-state";
import DotaSeriesListContainer from "./list-view/DotaSeriesListContainer";
import DotaSeriesCalendarContainer from "./DotaSeriesCalendarContainer";

interface StateProps extends RouteComponentProps<any> {
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

  selectTournament = info => {
    const { history } = this.props;
    if (history) history.push(`/esports/dota/${info.event.id}`);
  };

  render() {
    return (
      <div>
        <div className="page-header">
          <h1>Dota 2</h1>
        </div>
        <div className="more-btn">
          <Button onClick={this.toggleView} className="right">
            Show {this.state.isListView ? "Calendar" : "List"} View
          </Button>
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

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(DotaSeriesPage);
