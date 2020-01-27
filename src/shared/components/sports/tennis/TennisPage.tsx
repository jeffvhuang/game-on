import * as React from "react";
import { connect } from "react-redux";

import { getTennisTournaments } from "../../../redux/tennis/tennis-actions";
import SelectDropdown from "../../common/SelectDropdown";
import TennisTournaments from "./TennisTournaments";
import { TennisState } from "../../../redux/tennis/tennis-types";
import { ReduxState } from "../../../redux/redux-state";
import { Button } from "antd";
import PageHeader from "../../common/PageHeader";

interface StateProps {
  tennis: TennisState;
}

interface DispatchProps {
  getTennisTournaments;
}

interface State {
  values: string[];
  numToShowUpcoming: number;
  numToShowCompleted: number;
}

type Props = StateProps & DispatchProps;

const tournamentTypes = [
  { name: "Grand Slam", id: "grand_slam" },
  { name: "ATP 1000", id: "atp_1000" },
  { name: "ATP 500", id: "atp_500" },
  { name: "ATP 250", id: "atp_250" },
  { name: "ATP World Tour Finals", id: "atp_world_tour_finals" },
  { name: "WTA Premier", id: "wta_premier" },
  { name: "WTA International", id: "wta_international" },
  { name: "Mixed", id: "mixed" }
];

class TennisPage extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      values: [],
      numToShowUpcoming: 10,
      numToShowCompleted: 10
    };
  }

  componentDidMount() {
    const props = this.props;
    if (props.tennis.tournaments.length < 1) props.getTennisTournaments();
  }

  handleChange = values => this.setState({ values });

  showMoreUpcoming = () =>
    this.setState(prevState => {
      return { numToShowUpcoming: prevState.numToShowUpcoming + 10 };
    });

  showMoreCompleted = () =>
    this.setState(prevState => {
      return { numToShowCompleted: prevState.numToShowCompleted + 10 };
    });

  render() {
    return (
      <div className="section content">
        <PageHeader title="Tennis" isLoading={this.props.tennis.isFetching} />
        <SelectDropdown
          handleChange={this.handleChange}
          options={tournamentTypes}
        />
        <TennisTournaments
          tournaments={this.props.tennis.ongoing}
          header="Ongoing"
          values={this.state.values}
        />
        <TennisTournaments
          tournaments={this.props.tennis.upcoming}
          header="Upcoming"
          values={this.state.values}
          numToShow={this.state.numToShowUpcoming}
        />
        <div className="more-btn">
          <Button onClick={this.showMoreUpcoming} className="right">
            More >
          </Button>
        </div>
        <TennisTournaments
          tournaments={this.props.tennis.completed}
          header="Completed"
          values={this.state.values}
          numToShow={this.state.numToShowCompleted}
        />
        <Button onClick={this.showMoreCompleted} className="right">
          More >
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  tennis: state.tennis
});

const mapDispatchToProps = {
  getTennisTournaments
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TennisPage);
