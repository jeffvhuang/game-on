import * as React from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { allSportsList } from '../../../helpers/constants';
import { getNbaVideos } from '../../redux/nba/nba-actions';
import { getChampionsLeagueVideos, getEuropaLeagueVideos } from '../../redux/football/football-actions';
// import { getTennisVideos } from '../../redux/actions/tennis-actions';
import { getDotaVideos } from '../../redux/actions/dota-actions';

import VideoThumbnails from '../common/VideoThumbnails';
import WrongUrl from '../errors/WrongUrl';

const propTypes = {
  match: object.isRequired,
  actions: object.isRequired,
  nba: object,
  epl: object,
  tennis: object,
  dota: object
};

class SpecificHighlightsContainer extends React.Component {
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
    const { actions } = this.props;
    switch (sport.toLowerCase()) {
      case 'basketball':
        actions.getNbaVideos();
        break;
      case 'football':
        actions.getChampionsLeagueVideos();
        actions.getEuropaLeagueVideos();
        break;
      case 'tennis':
        actions.getTennisVideos();
        break;
      case 'dota':
        actions.getDotaVideos();
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

SpecificHighlightsContainer.propTypes = propTypes;

const mapStateToProps = (state) => ({
  nba: state.nba,
  epl: state.epl,
  tennis: state.tennis,
  dota: state.dota
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    getNbaVideos,
    getChampionsLeagueVideos,
    getEuropaLeagueVideos,
    getDotaVideos }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SpecificHighlightsContainer);