import React from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getNbaVideos } from '../../redux/actions/nba-actions';
import { getChampionsLeagueVideos, getEuropaLeagueVideos } from '../../redux/actions/epl-actions';

import VideoThumbnails from '../common/VideoThumbnails';

const propTypes = {
  match: object.isRequired,
  actions: object.isRequired,
  nba: object.isRequired,
  epl: object.isRequired
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
    switch (sport.toLowerCase()) {
      case 'basketball':
        this.props.actions.getNbaVideos();
        break;
      case 'football':
        this.props.actions.getChampionsLeagueVideos();
        this.props.actions.getEuropaLeagueVideos();
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
      default:
        return '';
    }
  }

  render() {
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
  epl: state.epl
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    getNbaVideos,
    getChampionsLeagueVideos,
    getEuropaLeagueVideos }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SpecificHighlightsContainer);