import React from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { paths, allSportsList } from '../../../helpers/constants';
import { getNbaVideos } from '../../redux/actions/nba-actions';
import { getChampionsLeagueVideos, getEuropaLeagueVideos } from '../../redux/actions/football-actions';

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
      show: this.getCompleteList()
    };
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
    // return ["Popular", ...allSportsList];
  }

  handleChange = value => {
    if (value.length > 0) this.setState({ show: value });
    else this.setState({ show: this.getCompleteList() });
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
    return (
      <div className="mid-container">
        <SportSelectDropdown handleChange={this.handleChange} />
        {this.state.show.map(sport => {
          const obj = this.getReduxObjectForSport(sport.toLowerCase());
          const thumbnails = (obj) ? this.props[obj].thumbnails : [];
          return <VideoThumbnails key={sport} heading={sport} thumbnails={thumbnails}
            showCount={4} showMore showMoreLink={paths.HIGHLIGHTS + '/' + sport.toLowerCase()} />;
        })}
      </div>
    );
  }
}

HighlightsPageContainer.propTypes = propTypes;

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

export default connect(mapStateToProps, mapDispatchToProps)(HighlightsPageContainer);