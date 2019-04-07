import React from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { footballThumbnails } from '../../../helpers/constants';
import { createNbaThumnailObjects } from '../../../helpers/utils';
import { getNbaVideos } from '../../redux/actions/nba-actions';

import VideoThumbnails from '../common/VideoThumbnails';

const propTypes = {
  match: object.isRequired,
  actions: object.isRequired,
  nba: object.isRequired
};

class SpecificHighlightsContainer extends React.Component {
  constructor(props) {
    super(props);
    
    const { sport } = props.match.params;
    if (sport.toLowerCase() == 'basketball' && props.nba.videos.length < 1) 
      props.actions.getNbaVideos();

    this.state = {
      sport: sport.toLowerCase(),
      thumbnails : this.getThumbnails(sport)
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // Populate thumbnails once received in props
    if (prevState.sport == 'basketball' && prevState.thumbnails.length < 1 && nextProps.nba.videos.length > 0) {
      return { thumbnails: createNbaThumnailObjects(nextProps.nba.videos) };
    }
    return null;
  }

  getThumbnails = (sport) => {
    switch (sport.toLowerCase()) {
      case 'basketball':
        return createNbaThumnailObjects(this.props.nba.videos);
      default:
        return [];
    }
  }

  render() {
    return (
      <div className="mid-container">
        <VideoThumbnails heading={this.state.sport.toUpperCase()}
          thumbnails={this.state.thumbnails} />;
      </div>
    );
  }
}

SpecificHighlightsContainer.propTypes = propTypes;

const mapStateToProps = (state) => ({
  nba: state.nba
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ getNbaVideos }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SpecificHighlightsContainer);