import React from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { paths } from '../../../helpers/constants';
import { createYoutubeThumnailObjects } from '../../../helpers/utils';
import { getNbaVideos } from '../../redux/actions/nba-actions';

import VideoThumbnails from '../common/VideoThumbnails';
import SportSelectDropdown from '../common/SportSelectDropdown';

const propTypes = {
  actions: object.isRequired,
  nba: object.isRequired,
  epl: object.isRequired
};

class HighlightsPageContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      basketball: createYoutubeThumnailObjects(props.nba.videos),
      football: createYoutubeThumnailObjects(props.epl.videos),
      show: this.getCompleteList()
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const nba = nextProps.nba;
    
    // Populate schedule once received in props
    if (prevState.thumbnails.basketball.length < 1 && nba.videos.length > 0 ) {
      const thumbnails = Object.assign({}, prevState.thumbnails);
      thumbnails.basketball = createYoutubeThumnailObjects(nextProps.nba.videos);
      return { thumbnails };
    }
    return null;
  }

  componentDidMount() {
    const props = this.props;
    if (props.nba.videos.length < 1) {
      props.actions.getNbaVideos();
    } 
    if (props.epl.videos.length < 1) {
      props.actions.getChampionsLeagueVideos();
      props.actions.getEuropaLeagueVideos();
    } 
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
          const sportThumbnails = this.state[sport.toLowerCase()];
          return <VideoThumbnails key={sport} heading={sport} thumbnails={sportThumbnails}
            showCount={4} showMore showMoreLink={paths.HIGHLIGHTS + '/' + sport.toLowerCase()} />;
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