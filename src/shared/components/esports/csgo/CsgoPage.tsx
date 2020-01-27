import * as React from "react";
import { connect } from "react-redux";
import { Tabs } from "antd";

import { paths } from "../../../../helpers/constants";
import {
  getCsgoTournaments,
  getCsgoTournamentMatches
} from "../../../redux/csgo/csgo-actions";
import CsgoTournamentsContainer from "./CsgoTournamentsContainer";
import CsgoTournamentContainer from "./CsgoTournamentContainer";
import CsgoMatchesContainer from "./CsgoMatchesContainer";
import { CsgoState } from "../../../redux/csgo/csgo-types";
import { ReduxState } from "../../../redux/redux-state";
import PageHeader from "../../common/PageHeader";

const TabPane = Tabs.TabPane;
interface StateProps {
  csgo: CsgoState;
}
interface DispatchProps {
  getCsgoTournaments;
  getCsgoTournamentMatches;
}
type Props = StateProps & DispatchProps;
interface State {
  activeTab: string;
  tournamentId?: number;
  tournamentName: string;
}

class CsgoPage extends React.Component<Props, State> {
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
    const { csgo } = this.props;
    const id = info.event.id;
    if (
      !csgo.tournamentMatches.length ||
      csgo.tournamentMatches[0].tournament.id != id
    )
      this.props.getCsgoTournamentMatches(id);
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
          title="Counter Strike: Global Offensive"
          isLoading={this.props.csgo.isFetching}
        />
        <Tabs
          activeKey={this.state.activeTab}
          size="large"
          onTabClick={this.selectTab}
        >
          <TabPane tab="Tournaments" key="1">
            <CsgoTournamentsContainer
              selectTournament={this.selectTournament}
            />
          </TabPane>
          <TabPane tab="Tournament" key="2">
            {/* <CsgoTournamentContainer selectTournament={this.selectTournament}
              tournamentId={this.state.tournamentId}
              tournamentName={this.state.tournamentName} /> */}
            <CsgoTournamentContainer />
          </TabPane>
          <TabPane tab="Matches" key="3">
            <CsgoMatchesContainer />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  csgo: state.csgo
});

const mapDispatchToProps = {
  getCsgoTournaments,
  getCsgoTournamentMatches
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CsgoPage);
