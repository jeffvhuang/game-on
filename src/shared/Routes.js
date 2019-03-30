import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { paths } from '../helpers/constants';
import LandingPageContainer from './components/landing/LandingPageContainer';
import LoginPageContainer from './components/login/LoginPageContainer';
import HighlightsPageContainer from './components/highlights/HighlightsPageContainer';
import BasketballPageContainer from './components/sports/BasketballPageContainer';
import FootballPageContainer from './components/sports/FootballPageContainer';
import ESportsPageContainer from './components/esports/ESportsPageContainer';
import DotaPageContainer from './components/esports/DotaPageContainer';
import EventsPageContainer from './components/events/EventsPageContainer';
import VideoPageContainer from './components/video/VideoPageContainer';

export default class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path={paths.LANDING} component={LandingPageContainer} />
        <Route path={paths.LOGIN} component={LoginPageContainer} />
        <Route path={paths.HIGHLIGHTS} component={HighlightsPageContainer} />
        <Route path={paths.SPORTS + '/basketball'} component={BasketballPageContainer} />
        <Route path={paths.SPORTS + '/football'} component={FootballPageContainer} />
        <Route path={paths.SPORTS + '/:sport'} component={FootballPageContainer} />
        <Route path={paths.ESPORTS + '/dota'} component={DotaPageContainer} />
        <Route path={paths.ESPORTS + '/:esport'} component={ESportsPageContainer} />
        <Route path={paths.EVENTS} component={EventsPageContainer} />
        <Route path={paths.VIDEO + '/:vidId'} component={VideoPageContainer} />
      </Switch>
    );
  }
}
