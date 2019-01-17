import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { paths } from '../helpers/constants';
import LandingPageContainer from './components/landing/LandingPageContainer';
import LoginPageContainer from './components/login/LoginPageContainer';
import HighlightsPageContainer from './components/highlights/HighlightsPageContainer';
import SportsPageContainer from './components/sports/SportsPageContainer';
import ESportsPageContainer from './components/esports/ESportsPageContainer';
import EventsPageContainer from './components/events/EventsPageContainer';

export default class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path={paths.LANDING} component={LandingPageContainer} />
        <Route path={paths.LOGIN} component={LoginPageContainer} />
        <Route path={paths.HIGHLIGHTS} component={HighlightsPageContainer} />
        <Route path={paths.SPORTS + '/:sport'} component={SportsPageContainer} />
        <Route path={paths.ESPORTS + '/:esport'} component={ESportsPageContainer} />
        <Route path={paths.EVENTS} component={EventsPageContainer} />
      </Switch>
    );
  }
}