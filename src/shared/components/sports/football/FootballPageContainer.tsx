import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { paths } from '../../../../helpers/constants';
import { getEplTeams, getEplSchedule } from '../../../redux/football/epl/epl-actions';
import { getChampionsLeagueTeams, 
  getChampionsLeagueSchedule, 
  getChampionsLeagueVideos } from '../../../redux/football/champions-league/champions-league-actions';
import {
  getEuropaLeagueTeams,
  getEuropaLeagueSchedule
} from '../../../redux/football/europa-league/europa-league-actions';

import VideoThumbnails from '../../common/VideoThumbnails';
import FootballSelectDropdown from './FootballSelectDropdown';
import FootballScheduleSection from './FootballScheduleSection';
import VideoHeader from '../../common/VideoHeader';
import { EplState } from '../../../redux/football/epl/epl-types';
import { ChampionsLeagueState } from '../../../redux/football/champions-league/champions-league-types';
import { EuropaLeagueState } from '../../../redux/football/europa-league/europa-league-types';
import { ReduxState } from '../../../redux/root-reducer';

interface StateProps {
  epl: EplState;
  championsLeague: ChampionsLeagueState;
  europaLeague: EuropaLeagueState;
}

interface DispatchProps {
  getEplSchedule;
  getEplTeams;
  getChampionsLeagueTeams;
  getChampionsLeagueSchedule;
  getEuropaLeagueTeams;
  getEuropaLeagueSchedule;
  getChampionsLeagueVideos;
  getEuropaLeagueVideos;
}

interface State {
  values: string[];
  championsValues: string[];
  europaValues: string[];
}

type Props = StateProps & DispatchProps;

class FootballPageContainer extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      values: [],
      championsValues: [],
      europaValues: []
    };
  }

  componentDidMount() {
    const props = this.props;
    // if (props.epl.videos.length < 1) {
    //   props.actions.getChampionsLeagueVideos();
    //   props.actions.getEuropaLeagueVideos();
    // } 
    if (props.epl.teams.length < 1) props.getEplTeams();
    if (props.epl.schedule.length < 1) props.getEplSchedule();
    if (props.championsLeague.teams.length < 1) props.getChampionsLeagueTeams();
    if (props.championsLeague.schedule.length < 1) props.getChampionsLeagueSchedule();
    if (props.europaLeague.teams.length < 1) props.getEuropaLeagueTeams();
    if (props.europaLeague.schedule.length < 1) props.getEuropaLeagueSchedule();
  }

  handleChange = values => this.setState({ values });
  handleChampionsChange = values => this.setState({ championsValues: values });
  handleEuropaChange = values => this.setState({ europaValues: values });

  // Teams will be an object array
  sortTeamsForDropdown = (teams) => {
    return teams.sort(function (a, b) {
      const textA = a.name.toUpperCase();
      const textB = b.name.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  }

  render() {
    return (
      <div>
        {/* <VideoHeader /> */}
        <h1>Football</h1>
        <FootballSelectDropdown handleChange={this.handleChange}
          teams={this.sortTeamsForDropdown(this.props.epl.teams)} />
        {/* <VideoThumbnails heading="Football"
          thumbnails={this.props.epl.thumbnails}
          showCount={4}
          showMore
          showMoreLink={paths.HIGHLIGHTS + '/football/epl'} /> */}
        <div className="section">
          <h2>English Premier League</h2>
          <FootballScheduleSection games={this.props.epl.gamesToday}
            header="Today's Games"
            values={this.state.values} />
          <FootballScheduleSection games={this.props.epl.upcoming}
            header="Upcoming"
            values={this.state.values} />
          <Link to={paths.EVENTS} className="right">More ></Link>
        </div>
        <FootballSelectDropdown handleChange={this.handleChampionsChange}
          teams={this.sortTeamsForDropdown(this.props.championsLeague.teams)} />
        <div className="section">
          <h2>Champion's League</h2>
          <FootballScheduleSection games={this.props.championsLeague.gamesToday}
            header="Today's Games"
            values={this.state.championsValues} />
          <FootballScheduleSection games={this.props.championsLeague.upcoming}
            header="Upcoming"
            values={this.state.championsValues} />
          <Link to={paths.EVENTS} className="right">More ></Link>
        </div>
        <FootballSelectDropdown handleChange={this.handleEuropaChange}
          teams={this.sortTeamsForDropdown(this.props.europaLeague.teams)} />
        <div className="section">
          <h2>Europa League</h2>
          <FootballScheduleSection games={this.props.europaLeague.gamesToday}
            header="Today's Games"
            values={this.state.europaValues} />
          <FootballScheduleSection games={this.props.europaLeague.upcoming}
            header="Upcoming"
            values={this.state.europaValues} />
          <Link to={paths.EVENTS} className="right">More ></Link>
        </div>
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
  getEplSchedule,
  getEplTeams,
  getChampionsLeagueTeams,
  getChampionsLeagueSchedule,
  getEuropaLeagueTeams,
  getEuropaLeagueSchedule,
  getChampionsLeagueVideos
}

export default connect(mapStateToProps, mapDispatchToProps)(FootballPageContainer);
