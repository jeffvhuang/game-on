import React from 'react';
import { Tabs } from 'antd';

import DotaMatchesContainer from './DotaMatchesContainer';
import DotaTournamentsContainer from './DotaTournamentsContainer';

const TabPane = Tabs.TabPane;

class DotaPageContainer extends React.Component {
  render() {
    return (
      <div>
        <h1>Dota 2</h1>
        <Tabs defaultActiveKey="1" size="large">
          <TabPane tab="Tournaments" key="1">
            <DotaTournamentsContainer />
          </TabPane>
          <TabPane tab="Matches" key="2">
            <DotaMatchesContainer />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default DotaPageContainer;
