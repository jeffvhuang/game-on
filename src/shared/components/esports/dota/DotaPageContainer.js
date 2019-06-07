import React from 'react';
import { Tabs } from 'antd';

import DotaMatchesContainer from './DotaMatchesContainer';
import DotaTournamentsContainer from './DotaTournamentsContainer';
import DotaSeriesContainer from './DotaSeriesContainer';

const TabPane = Tabs.TabPane;

class DotaPageContainer extends React.Component {
  render() {
    return (
      <div>
        <div className="page-header">
          <h1>Dota 2</h1>
        </div>
        <Tabs defaultActiveKey="1" size="large">
          <TabPane tab="Series" key="1">
            <DotaSeriesContainer />
          </TabPane>
          <TabPane tab="Tournaments" key="2">
            <DotaTournamentsContainer />
          </TabPane>
          <TabPane tab="Matches" key="3">
            <DotaMatchesContainer />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default DotaPageContainer;
