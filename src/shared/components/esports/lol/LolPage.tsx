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
import {
  parseISOStringToDate,
  getEsportsTournamentsForCalendarFromSeries
} from "../../../../helpers/utils";

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

  toggleView = () => {
    this.props.getLolSeries();
    this.setState(prevState => ({
      isListView: !prevState.isListView
    }));
  };

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
    const { lol, getLolSeries } = this.props;
    if (lol.series.length < 1) {
      const today = new Date();
      getLolSeries(today.getFullYear(), today.getMonth()).then(data => {
        successCallback(getEsportsTournamentsForCalendarFromSeries(data));
      });
    } else {
      // Only make requests fur further event data if necessary (nearing date of most recent or earliest event)
      // Get current month
      const middleMS =
        (fetchInfo.start.getTime() + fetchInfo.end.getTime()) / 2;
      const middleDate = new Date(middleMS);
      const currentMonth = middleDate.getMonth();
      const currentYear = middleDate.getFullYear();

      // Check first and last dates and compare to current month on calendar
      let latestMS;
      let earliestMS;

      for (let i = 0; i < lol.series.length; i++) {
        if (lol.series[i].beginAt) {
          const latestISO = lol.series[i].beginAt;
          const latestDate = parseISOStringToDate(latestISO);
          latestMS = latestDate.getTime();
          break;
        }
      }

      for (let i = lol.series.length - 1; i > -1; i--) {
        if (lol.series[i].beginAt) {
          const earliestISO = lol.series[i].beginAt;
          const earliestDate = parseISOStringToDate(earliestISO);
          earliestMS = earliestDate.getTime();
          break;
        }
      }

      if (!latestMS || !earliestMS) {
        getLolSeries(currentYear, currentMonth).then(data => {
          successCallback(getEsportsTournamentsForCalendarFromSeries(data));
        });
      } else {
        // After obtaining month, use to create date from 1st
        const firstCurrentMonth = new Date(currentYear, currentMonth, 1);
        const firstCurrentMS = firstCurrentMonth.getTime();
        const endCurrentMonth = new Date(currentYear, currentMonth, 28);
        const endCurrentMS = endCurrentMonth.getTime();
        const millisecInADay = 86400000;
        const maxMSIn1Month = millisecInADay * 31;

        // If within a month of earliest/latest date, make request
        const isCloseToEarliest = firstCurrentMS - earliestMS <= maxMSIn1Month;
        const isCloseToLatest = latestMS - endCurrentMS <= maxMSIn1Month;
        if (isCloseToEarliest || isCloseToLatest) {
          getLolSeries(currentYear, currentMonth).then(data => {
            successCallback(getEsportsTournamentsForCalendarFromSeries(data));
          });
        }
      }
    }
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
