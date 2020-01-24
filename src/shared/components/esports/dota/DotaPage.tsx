import * as React from "react";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { compose } from "redux";
import { Button } from "antd";

import { getDotaSeries } from "../../../redux/dota/dota-actions";
import { DotaState } from "../../../redux/dota/dota-types";
import { ReduxState } from "../../../redux/redux-state";
import EsportsListContainer from "../common/list-view/EsportsListContainer";
import EsportsCalendarContainer from "../common/EsportsCalendarContainer";

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

class DotaPage extends React.Component<Props, State> {
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

  selectCalendarTournament = info => {
    const { history } = this.props;
    if (history) history.push(`/esports/dota/${info.event.id}`);
  };

  selectTournament = (id: number) => {
    return () => {
      if (this.props.history) this.props.history.push(`/esports/dota/${id}`);
    };
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
          <EsportsListContainer
            series={this.props.dota.series}
            selectTournament={this.selectTournament}
          />
        ) : (
          <EsportsCalendarContainer
            series={this.props.dota.series}
            selectTournament={this.selectCalendarTournament}
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
)(DotaPage);
