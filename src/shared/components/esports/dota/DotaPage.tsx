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
import PageHeader from "../../common/PageHeader";
import {
  parseISOStringToDate,
  getEsportsTournamentsForCalendarFromSeries
} from "../../../../helpers/utils";

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

  getTournamentEvents = (fetchInfo, successCallback, failureCallback) => {
    const { dota, getDotaSeries } = this.props;
    if (dota.series.length < 1) {
      const today = new Date();
      getDotaSeries(today.getFullYear(), today.getMonth()).then(data => {
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

      for (let i = 0; i < dota.series.length; i++) {
        if (dota.series[i].beginAt) {
          const latestISO = dota.series[i].beginAt;
          const latestDate = parseISOStringToDate(latestISO);
          latestMS = latestDate.getTime();
          break;
        }
      }

      for (let i = dota.series.length - 1; i > -1; i--) {
        if (dota.series[i].beginAt) {
          const earliestISO = dota.series[i].beginAt;
          const earliestDate = parseISOStringToDate(earliestISO);
          earliestMS = earliestDate.getTime();
          break;
        }
      }

      if (!latestMS || !earliestMS) {
        getDotaSeries(currentYear, currentMonth).then(data => {
          successCallback(getEsportsTournamentsForCalendarFromSeries(data));
        });
      } else {
        // After obtaining month, use to create date from 1st
        const firstCurrentMonth = new Date(currentYear, currentMonth, 1);
        const firstCurrentMS = firstCurrentMonth.getTime();
        const endCurrentMonth = new Date(currentYear, currentMonth, 28);
        const endCurrentMS = endCurrentMonth.getTime();
        const millisecInADay = 86400000;
        const maxMSIn2Months = millisecInADay * 31 * 2;

        // If within 2 months of earliest/latest date, make request
        if (firstCurrentMS - earliestMS <= maxMSIn2Months) {
          getDotaSeries(currentYear, currentMonth).then(data => {
            successCallback(getEsportsTournamentsForCalendarFromSeries(data));
          });
          console.log("make request earlier");
        } else if (latestMS - endCurrentMS <= maxMSIn2Months) {
          getDotaSeries(currentYear, currentMonth).then(data => {
            successCallback(getEsportsTournamentsForCalendarFromSeries(data));
          });
          console.log("make request later");
        }
      }
    }
  };

  render() {
    return (
      <div>
        <PageHeader title="Dota 2" isLoading={this.props.dota.isFetching} />
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
            selectTournament={this.selectCalendarTournament}
            getEvents={this.getTournamentEvents}
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
