import React from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Tabs } from 'antd';

import { paths } from '../../../../helpers/constants';
import { getLolTournaments, getLolTournamentMatches } from '../../../redux/actions/lol-actions';
import SelectDropdown from '../../common/SelectDropdown';
import LolTournamentsContainer from './LolTournamentsContainer';
import LolMatchesContainer from './LolMatchesContainer';

const TabPane = Tabs.TabPane;
const propTypes = {
  lol: object.isRequired,
  actions: object.isRequired
};

class LolPageContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: "1",
      tournamentId: '',
      tournamentName: ''
    };
  }

  selectTab = (key) => { this.setState({ activeTab: key }); }

  selectTournament = (info) => {
    const id = info.event.id;
    this.props.actions.getLolTournamentMatches(id);
    this.setState({
      tournamentId: id,
      activeTab: "2",
      tournamentName: info.event.title
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
          <TabPane tab="Matches" key="2">
            <LolMatchesContainer tournamentId={this.state.tournamentId}
              tournamentName={this.state.tournamentName} />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

LolPageContainer.propTypes = propTypes;

const mapStateToProps = (state) => ({
  lol: state.lol
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    getLolTournaments,
    getLolTournamentMatches
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LolPageContainer);
