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
import PageHeader from "../../common/PageHeader";
import { ESportsSeries } from "../../../../types/esports-api/esports-series.model";

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

  getTournamentEvents = (fetchInfo, successCallback, failureCallback) => {
    console.log(fetchInfo);
    const { lol } = this.props;
    // Check first and last dates and compare to current month on calendar
    // const calendar = document.getElementById('calendar');
    // const date = (calendar) ? calendar.fullCalendar('getDate');
    // const currentMonth =
  };

  render() {
    return (
      <div>
        <PageHeader
          title="League of Legends"
          isLoading={this.props.lol.isFetching}
        />
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
            selectTournament={this.selectCalendarTournament}
            getEvents={this.getTournamentEvents}
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
