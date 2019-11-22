import * as React from "react";
import { Switch, Route } from "react-router-dom";

import { paths } from "../helpers/constants";
import LandingPage from "./components/landing/LandingPage";
import LoginPage from "./components/login/LoginPage";
import HighlightsPage from "./components/highlights/HighlightsPage";
import SpecificHighlights from "./components/highlights/SpecificHighlightsPage";
import BasketballPage from "./components/sports/basketball/BasketballPage";
import BasketballMatchPage from "./components/sports/basketball/matches/BasketballMatchPage";
import FootballPage from "./components/sports/football/FootballPage";
import TennisPage from "./components/sports/tennis/TennisPage";
import TennisTournamentPage from "./components/sports/tennis/TennisTournamentPage";
import DotaPage from "./components/esports/dota/DotaPage";
import LolPage from "./components/esports/lol/LolPage";
import CsgoPage from "./components/esports/csgo/CsgoPage";
import OverwatchPage from "./components/esports/overwatch/OverwatchPage";
import EventsPage from "./components/events/EventsPage";
import VideoPage from "./components/video/VideoPage";

export default class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path={paths.LANDING} component={LandingPage} />
        <Route path={paths.LOGIN} component={LoginPage} />
        {/* <Route path={paths.HIGHLIGHTS + '/:sport'} component={SpecificHighlightsPage} />
        <Route path={paths.HIGHLIGHTS} component={HighlightsPage} /> */}
        <Route
          path={paths.SPORTS + "/basketball/matches/:matchId"}
          component={BasketballMatchPage}
        />
        <Route path={paths.SPORTS + "/basketball"} component={BasketballPage} />
        <Route
          path={paths.SPORTS + "/football/:league"}
          component={FootballPage}
        />
        <Route
          path={paths.SPORTS + "/tennis/:tournamentNumber"}
          component={TennisTournamentPage}
        />
        <Route path={paths.SPORTS + "/tennis"} component={TennisPage} />
        <Route path={paths.ESPORTS + "/dota"} component={DotaPage} />
        <Route path={paths.ESPORTS + "/lol"} component={LolPage} />
        <Route path={paths.ESPORTS + "/csgo"} component={CsgoPage} />
        <Route path={paths.ESPORTS + "/overwatch"} component={OverwatchPage} />
        <Route path={paths.EVENTS} component={EventsPage} />
        {/* <Route path={paths.VIDEO + '/:vidId'} component={VideoPage} /> */}
      </Switch>
    );
  }
}
