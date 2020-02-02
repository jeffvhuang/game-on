import * as React from "react";
import { connect } from "react-redux";
import { Tabs } from "antd";

import { paths } from "../../../../helpers/constants";
import {
  getOverwatchTournaments,
  getOverwatchTournamentMatches
} from "../../../redux/overwatch/overwatch-actions";
import OverwatchTournamentsContainer from "./OverwatchTournamentsContainer";
import OverwatchTournamentContainer from "./OverwatchTournamentContainer";
import OverwatchMatchesContainer from "./OverwatchMatchesContainer";
import { OverwatchState } from "../../../redux/overwatch/overwatch-types";
import { ReduxState } from "../../../redux/redux-state";
import PageHeader from "../../common/PageHeader";

const TabPane = Tabs.TabPane;
interface StateProps {
  overwatch: OverwatchState;
}
interface DispatchProps {
  getOverwatchTournaments;
  getOverwatchTournamentMatches;
}
type Props = StateProps & DispatchProps;
interface State {
  activeTab: string;
  tournamentId?: number;
  tournamentName: string;
}

class OverwatchPage extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: "1",
      tournamentId: undefined,
      tournamentName: ""
    };
  }

  selectTab = key => {
    this.setState({ activeTab: key });
  };

  selectTournament = info => {
    const { overwatch } = this.props;
    const id = info.event.id;
    if (
      !overwatch.tournamentMatches.length ||
      overwatch.tournamentMatches[0].tournament.id != id
    )
      this.props.getOverwatchTournamentMatches(id);
    this.setState({
      activeTab: "2",
      tournamentName: info.event.title,
      tournamentId: id
    });
  };

  render() {
    return (
      <div className="section content">
        <PageHeader
          title="Overwatch"
          isLoading={this.props.overwatch.isFetching}
        />
        <Tabs
          activeKey={this.state.activeTab}
          size="large"
          onTabClick={this.selectTab}
        >
          <TabPane tab="Tournaments" key="1">
            <OverwatchTournamentsContainer
              selectTournament={this.selectTournament}
            />
          </TabPane>
          <TabPane tab="Tournament" key="2">
            <OverwatchTournamentContainer />
          </TabPane>
          <TabPane tab="Matches" key="3">
            <OverwatchMatchesContainer />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  overwatch: state.overwatch
});

const mapDispatchToProps = {
  getOverwatchTournaments,
  getOverwatchTournamentMatches
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OverwatchPage);
