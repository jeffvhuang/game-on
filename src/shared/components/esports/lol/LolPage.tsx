import * as React from "react";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { compose } from "redux";
import { Button } from "antd";

import { getLolSeries } from "../../../redux/lol/lol-actions";
import { LolState } from "../../../redux/lol/lol-types";
import { ReduxState } from "../../../redux/redux-state";
import EsportsListContainer from "../common/list-view/EsportsListContainer";
import EsportsCalendarContainer from "../common/EsportsCalendarContainer";

interface StateProps extends RouteComponentProps<any> {
  lol: LolState;
}
interface DispatchProps {
  getLolSeries;
}
type Props = StateProps & DispatchProps;
interface State {
  isListView: boolean;
}

class LolPage extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      isListView: false
    };
  }

  componentDidMount() {
    if (!this.props.lol.series.length) this.props.getLolSeries();
  }

  toggleView = () =>
    this.setState(prevState => ({
      isListView: !prevState.isListView
    }));

  selectCalendarTournament = info => {
    const { history } = this.props;
    if (history) history.push(`/esports/lol/${info.event.id}`);
  };

  selectTournament = (id: number) => {
    return () => {
      if (this.props.history) this.props.history.push(`/esports/lol/${id}`);
    };
  };

  render() {
    return (
      <div>
        <div className="page-header">
          <h1>League of Legends</h1>
        </div>
        <div className="more-btn">
          <Button onClick={this.toggleView} className="right">
            Show {this.state.isListView ? "Calendar" : "List"} View
          </Button>
        </div>
        {this.state.isListView ? (
          <EsportsListContainer
            series={this.props.lol.series}
            selectTournament={this.selectTournament}
          />
        ) : (
          <EsportsCalendarContainer
            series={this.props.lol.series}
            selectTournament={this.selectCalendarTournament}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  lol: state.lol
});

const mapDispatchToProps = {
  getLolSeries
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(LolPage);
