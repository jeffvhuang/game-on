import React from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { paths } from '../../../../helpers/constants';
import { getNbaSchedule, getNbaTeams, getNbaVideos } from '../../../redux/actions/nba-actions';

import VideoThumbnails from '../../common/VideoThumbnails';
import NbaSelectDropdown from './NbaSelectDropdown';
import BasketballScheduleSection from './BasketballScheduleSection';
import VideoHeader from '../../common/VideoHeader';

const propTypes = {
  nba: object.isRequired,
  actions: object.isRequired
};

class BasketballPageContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: []
    };
  }

  componentDidMount() {
    const props = this.props;
    // if (props.nba.videos.length < 1) props.actions.getNbaVideos();
    if (props.nba.teams.length < 1) props.actions.getNbaTeams();
    if (props.nba.schedule.length < 1) props.actions.getNbaSchedule();
  }

  handleChange = values => this.setState({ values });

  render() {
    return (
      <div>
        {/* <VideoHeader /> */}
        <h1>Basketball</h1>
        <NbaSelectDropdown handleChange={this.handleChange} 
          teams={this.props.nba.teams} />
        {/* <VideoThumbnails heading="NBA Videos"
          thumbnails={this.props.nba.thumbnails}
          showCount={4}
          showMore
          showMoreLink={paths.HIGHLIGHTS + '/basketball/nba'} /> */}
        <div className="section">
          <BasketballScheduleSection header="Today's Games"
            games={this.props.nba.gamesToday}
            values={this.state.values} />
          <BasketballScheduleSection header="Upcoming"
            games={this.props.nba.upcoming}
            values={this.state.values} />
          <Link to={paths.EVENTS} className="right">More ></Link>
        </div>
      </div>
    );
  }
}

BasketballPageContainer.propTypes = propTypes;

const mapStateToProps = (state) => ({
  nba: state.nba
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ getNbaSchedule, getNbaTeams, getNbaVideos }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(BasketballPageContainer);