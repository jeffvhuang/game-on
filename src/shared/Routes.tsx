import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { paths } from '../helpers/constants';
import LandingPageContainer from './components/landing/LandingPageContainer';
import LoginPageContainer from './components/login/LoginPageContainer';
import HighlightsPageContainer from './components/highlights/HighlightsPageContainer';
import SpecificHighlightsContainer from './components/highlights/SpecificHighlightsContainer';
import BasketballPageContainer from './components/sports/basketball/BasketballPageContainer';
import FootballPageContainer from './components/sports/football/FootballPageContainer';
import TennisPageContainer from './components/sports/tennis/TennisPageContainer';
import TennisTournamentPageContainer from './components/sports/tennis/TennisTournamentPageContainer';
import DotaPageContainer from './components/esports/dota/DotaPageContainer';
import LolPageContainer from './components/esports/lol/LolPageContainer';
import EventsPageContainer from './components/events/EventsPageContainer';
import VideoPageContainer from './components/video/VideoPageContainer';

export default class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path={paths.LANDING} component={LandingPageContainer} />
        <Route path={paths.LOGIN} component={LoginPageContainer} />
        <Route path={paths.HIGHLIGHTS + '/:sport'} component={SpecificHighlightsContainer} />
        <Route path={paths.HIGHLIGHTS} component={HighlightsPageContainer} />
        <Route path={paths.SPORTS + '/basketball'} component={BasketballPageContainer} />
        <Route path={paths.SPORTS + '/football'} component={FootballPageContainer} />
        <Route path={paths.SPORTS + '/tennis/:tournamentNumber'} component={TennisTournamentPageContainer} />
        <Route path={paths.SPORTS + '/tennis'} component={TennisPageContainer} />
        <Route path={paths.ESPORTS + '/dota'} component={DotaPageContainer} />
        <Route path={paths.ESPORTS + '/lol'} component={LolPageContainer} />
        <Route path={paths.EVENTS} component={EventsPageContainer} />
        <Route path={paths.VIDEO + '/:vidId'} component={VideoPageContainer} />
      </Switch>
    );
  }
}
