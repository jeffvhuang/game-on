import React from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { sportsList, esportsList, footballThumbnails } from '../../../helpers/constants';
import { createNbaThumnailObjects } from '../../../helpers/utils';
import { getNbaVideos } from '../../redux/actions/nba-actions';

import VideoThumbnails from './VideoThumbnails';
import SportSelectDropdown from '../common/SportSelectDropdown';

const propTypes = {
  nba: object.isRequired,
  actions: object.isRequired
};

class HighlightsPageContainer extends React.Component {
  constructor(props) {
    super(props);

    if (props.nba.videos.length < 1) props.actions.getNbaVideos();

    this.state = {
      thumbnails : {
        basketball: createNbaThumnailObjects(props.nba.videos),
        football: footballThumbnails
      },
      show: this.getCompleteList(),
      hide: []
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const nba = nextProps.nba;
    
    // Populate schedule once received in props
    if (prevState.thumbnails.basketball.length < 1 && nba.videos.length > 0 ) {
      const thumbnails = Object.assign({}, prevState.thumbnails);
      thumbnails.basketball = createNbaThumnailObjects(nextProps.nba.videos);
      return { thumbnails };
    }
    return null;
  }
  
  getCompleteList = () => {
    return ['Basketball', 'Football'];
    // return ["Popular"].concat(sportsList, esportsList);
  }

  handleChange = value => {
    if (value.length > 0) {
      this.setState({ show: value });
    } else {
      this.setState({ show: this.getCompleteList() });
    }
  }

  render() {
    return (
      <div className="mid-container">
        <SportSelectDropdown handleChange={this.handleChange} />
        {this.state.show.map(sport => {
          const sportThumbnails = this.state.thumbnails[sport.toLowerCase()];
          return <VideoThumbnails key={sport} heading={sport} thumbnails={sportThumbnails} />;
        })}
      </div>
    );
  }
}

HighlightsPageContainer.propTypes = propTypes;

const mapStateToProps = (state) => ({
  nba: state.nba
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ getNbaVideos }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(HighlightsPageContainer);