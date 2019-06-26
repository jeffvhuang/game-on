import * as React from 'react';
import { connect } from 'react-redux';
import { Tabs } from 'antd';

import { paths } from '../../../../helpers/constants';
import { getLolTournaments, getLolTournamentMatches } from '../../../redux/lol/lol-actions';
import LolTournamentsContainer from './LolTournamentsContainer';
import LolTournamentContainer from './LolTournamentContainer';
import LolMatchesContainer from './LolMatchesContainer';
import { LolState } from '../../../redux/lol/lol-types';
import { ReduxState } from '../../../redux/root-reducer';

const TabPane = Tabs.TabPane;
interface StateProps {
  lol: LolState
};

interface DispatchProps {
  getLolTournaments; getLolTournamentMatches;
};

type Props = StateProps & DispatchProps;

interface State {
  activeTab: string;
  tournamentId?: number;
  tournamentName: string;
}

class LolPageContainer extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: "1",
      tournamentId: undefined,
      tournamentName: ''
    };
  }

  selectTab = (key) => { this.setState({ activeTab: key }); }

  selectTournament = (info) => {
    const { lol } = this.props;
    const id = info.event.id;
    if (!lol.tournamentMatches.length || lol.tournamentMatches[0].tournament.id != id) 
      this.props.getLolTournamentMatches(id);
    this.setState({
      activeTab: "2",
      tournamentName: info.event.title,
      tournamentId: id
    });
  }

  render() {
    return (
      <div>
        <div className="page-header">
          <h1>League of Legends</h1>
        </div>
        <Tabs activeKey={this.state.activeTab} size="large" onTabClick={this.selectTab}>
          <TabPane tab="Tournaments" key="1">
            <LolTournamentsContainer selectTournament={this.selectTournament} />
          </TabPane>
          <TabPane tab="Tournament" key="2">
            <LolTournamentContainer selectTournament={this.selectTournament}
              tournamentId={this.state.tournamentId}
              tournamentName={this.state.tournamentName} />
          </TabPane>
          <TabPane tab="Matches" key="3">
            <LolMatchesContainer />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  lol: state.lol
});

const mapDispatchToProps = {
  getLolTournaments,
  getLolTournamentMatches
};

export default connect(mapStateToProps, mapDispatchToProps)(LolPageContainer);
