import * as React from "react";
import { connect } from "react-redux";
import { Button } from "antd";
import { Link } from "react-router-dom";

import { paths } from "../../../../helpers/constants";
import { getNbaSchedule, getNbaTeams } from "../../../redux/nba/nba-actions";

import NbaSelectDropdown from "./NbaSelectDropdown";
import BasketballScheduleSection from "./BasketballScheduleSection";
import { NbaState } from "../../../redux/nba/nba-types";
import { ReduxState } from "../../../redux/redux-state";

interface StateProps {
  nba: NbaState;
}

interface DispatchProps {
  getNbaSchedule;
  getNbaTeams;
  getNbaVideos;
}

interface State {
  values: string[];
  numToShow: number;
}

type Props = StateProps & DispatchProps;

class BasketballPage extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      values: [],
      numToShow: 10
    };
  }

  componentDidMount() {
    const props = this.props;
    if (props.nba.teams.length < 1) props.getNbaTeams();
    if (props.nba.schedule.length < 1) props.getNbaSchedule();
  }

  handleChange = values => this.setState({ values });

  showMore = () =>
    this.setState(prevState => {
      return { numToShow: prevState.numToShow + 10 };
    });

  render() {
    return (
      <div className="section content">
        <h2 className="page-heading">NBA</h2>
        <NbaSelectDropdown
          handleChange={this.handleChange}
          teams={this.props.nba.teams}
        />
        <BasketballScheduleSection
          header="Today"
          games={this.props.nba.gamesToday}
          values={this.state.values}
        />
        <BasketballScheduleSection
          header="Upcoming"
          games={this.props.nba.upcoming}
          values={this.state.values}
          numToShow={this.state.numToShow}
        />
        <Button onClick={this.showMore} className="right">
          More >
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  nba: state.nba
});

const mapDispatchToProps = {
  getNbaSchedule,
  getNbaTeams
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BasketballPage);
