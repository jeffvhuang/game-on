import * as React from "react";
import { connect } from "react-redux";
import { Button } from "antd";
import { RouteComponentProps } from "react-router";

import {
  getFootballLeaguesTeams,
  getFootballLeaguesSchedule
} from "../../../redux/football/football-actions";

import FootballSelectDropdown from "./FootballSelectDropdown";
import FootballScheduleSection from "./FootballScheduleSection";
import { FootballState } from "../../../redux/football/football-types";
import { ReduxState } from "../../../redux/redux-state";

interface MatchParams {
  league: string;
}
interface StateProps extends RouteComponentProps<MatchParams> {
  epl: FootballState;
  championsLeague: FootballState;
  europaLeague: FootballState;
}

interface DispatchProps {
  getFootballLeaguesTeams;
  getFootballLeaguesSchedule;
}

interface State {
  league: string;
  leagueKey: string;
  values: string[];
  numToShowUpcoming: number;
  numToShowPast: number;
}

type Props = StateProps & DispatchProps;

class FootballPage extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      league: this.getLeagueDisplayName(props.match.params.league),
      leagueKey: this.getFootballLeagueKey(props.match.params.league),
      values: [],
      numToShowUpcoming: 10,
      numToShowPast: 10
    };
  }

  componentDidMount() {
    this.getFootballData();
  }

  componentDidUpdate(prevProps) {
    const { params } = this.props.match;
    if (params.league !== prevProps.match.params.league) {
      const leagueKey = this.getFootballLeagueKey(params.league);
      const league = this.getLeagueDisplayName(params.league);
      this.setState({ league, leagueKey }, () => this.getFootballData());
    }
  }

  getFootballData() {
    const props = this.props;
    const { leagueKey } = this.state;
    if (props[leagueKey].teams.length < 1)
      props.getFootballLeaguesTeams(leagueKey);
    if (props[leagueKey].schedule.length < 1)
      props.getFootballLeaguesSchedule(leagueKey);
  }

  getLeagueDisplayName(league: string): string {
    let name: string;
    switch (league.toLowerCase()) {
      case "epl":
        name = "English Premier League";
        break;
      case "europaleague":
        name = "Europa League";
        break;
      case "championsleague":
        name = "Champions League";
        break;
      default:
        name = "";
        break;
    }
    return name;
  }

  getFootballLeagueKey(league: string): string {
    let key: string;
    switch (league.toLowerCase()) {
      case "epl":
        key = "epl";
        break;
      case "europaleague":
        key = "europaLeague";
        break;
      case "championsleague":
        key = "championsLeague";
        break;
      default:
        key = "";
        break;
    }
    return key;
  }

  handleChange = values => this.setState({ values });

  // Teams will be an object array
  sortTeamsForDropdown = teams => {
    return teams.sort(function(a, b) {
      const textA = a.name.toUpperCase();
      const textB = b.name.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
  };

  showMoreUpcoming = () =>
    this.setState(prevState => {
      return { numToShowUpcoming: prevState.numToShowUpcoming + 10 };
    });

  showMorePast = () =>
    this.setState(prevState => {
      return { numToShowPast: prevState.numToShowPast + 10 };
    });

  render() {
    const { league, leagueKey, values } = this.state;
    return (
      <div className="section content">
        <h2 className="page-heading">{league}</h2>
        <FootballSelectDropdown
          handleChange={this.handleChange}
          teams={this.sortTeamsForDropdown(this.props[leagueKey].teams)}
        />
        <FootballScheduleSection
          games={this.props[leagueKey].today}
          header="Today"
          values={values}
        />
        <FootballScheduleSection
          games={this.props[leagueKey].upcoming}
          header="Upcoming"
          values={values}
          numToShow={this.state.numToShowUpcoming}
        />
        <Button onClick={this.showMoreUpcoming} className="right">
          More >
        </Button>
        <FootballScheduleSection
          games={this.props[leagueKey].completed}
          header="Past"
          values={values}
          numToShow={this.state.numToShowPast}
        />
        <Button onClick={this.showMorePast} className="right">
          More >
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  epl: state.epl,
  championsLeague: state.championsLeague,
  europaLeague: state.europaLeague
});

const mapDispatchToProps = {
  getFootballLeaguesTeams,
  getFootballLeaguesSchedule
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FootballPage);
