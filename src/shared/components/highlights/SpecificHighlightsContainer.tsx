import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { allSportsList } from '../../../helpers/constants';
import { getNbaVideos } from '../../redux/nba/nba-actions';
import { getChampionsLeagueVideos } from '../../redux/football/champions-league/champions-league-actions';
// import { getTennisVideos } from '../../redux/actions/tennis-actions';
import { getDotaVideos } from '../../redux/dota/dota-actions';

import VideoThumbnails from '../common/VideoThumbnails';
import WrongUrl from '../errors/WrongUrl';
import { NbaState } from '../../redux/nba/nba-types';
import { EplState } from '../../redux/football/epl/epl-types';
import { TennisState } from '../../redux/tennis/tennis-types';
import { DotaState } from '../../redux/dota/dota-types';
import { RouteComponentProps } from 'react-router';
import { ReduxState } from '../../redux/root-reducer';

interface MatchParams { sport: string; }
interface StateProps extends RouteComponentProps<MatchParams> {
  nba: NbaState;
  epl: EplState;
  tennis: TennisState;
  dota: DotaState;
};

interface DispatchProps {
  getNbaVideos;
  getChampionsLeagueVideos;
  getDotaVideos;
}

type Props = StateProps & DispatchProps;

interface State {
  sport: string;
}

class SpecificHighlightsContainer extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      sport: props.match.params.sport.toLowerCase()
    };
  }

  componentDidMount() {
    const videos = this.getVideosArray(this.state.sport);
    if (videos.length < 1) this.getVideosForSport(this.state.sport);
  }

  getVideosArray = (sport) => {
    const obj = this.getReduxObjectForSport(sport);
    return (obj) ? this.props[obj].videos : [];
  }

  getVideosForSport = (sport) => {
    switch (sport.toLowerCase()) {
      case 'basketball':
        getNbaVideos();
        break;
      case 'football':
        getChampionsLeagueVideos();
        // getEuropaLeagueVideos();
        break;
      case 'tennis':
        // getTennisVideos();
        break;
      case 'dota':
        getDotaVideos();
        break;
      default:
        break;
    }
  }

  getReduxObjectForSport = (sport) => {
    switch (sport.toLowerCase()) {
      case 'basketball':
        return 'nba';
      case 'football':
        return 'epl';
      case 'tennis':
        return 'tennis';
      case 'dota':
        return 'dota';
      default:
        return '';
    }
  }

  render() {
    if (!allSportsList.some(s => s.toLowerCase() == this.state.sport.toLowerCase()))
      return <WrongUrl />;

    const obj = this.getReduxObjectForSport(this.state.sport);
    const thumbnails = (obj) ? this.props[obj].thumbnails : [];

    return (
      <div className="mid-container">
        <VideoThumbnails heading={this.state.sport.toUpperCase()}
          thumbnails={thumbnails} />;
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  nba: state.nba,
  epl: state.epl,
  tennis: state.tennis,
  dota: state.dota
});

const mapDispatchToProps = {
  getNbaVideos,
  getChampionsLeagueVideos,
  getDotaVideos
};

export default connect(mapStateToProps, mapDispatchToProps)(SpecificHighlightsContainer);