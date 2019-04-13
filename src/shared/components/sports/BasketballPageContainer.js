import React from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { paths } from '../../../helpers/constants';
import { getNbaSchedule, getNbaTeams, getNbaVideos } from '../../redux/actions/nba-actions';

import VideoThumbnails from '../common/VideoThumbnails';
import TeamSelectDropdown from '../common/TeamSelectDropdown';
import BasketballScheduleSection from './BasketballScheduleSection';

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
    if (props.nba.videos.length < 1) props.actions.getNbaVideos();
    if (props.nba.teams.length < 1) props.actions.getNbaTeams();
    if (props.nba.schedule.length < 1) props.actions.getNbaSchedule();
  }

  handleChange = values => this.setState({ values });

  resetInitialState = () => {
    this.setState({
      gamesToday: this.props.nba.gamesToday,
      upcoming: this.props.nba.upcoming 
    });
  }

  render() {
    return (
      <div>
        <div className="section">
          <div className="mid-flex">
            <video controls width="600" height="400" />
          </div>
        </div>
        <h1>Basketball</h1>
        <TeamSelectDropdown handleChange={this.handleChange} 
          teams={this.props.nba.teams} />
        <VideoThumbnails heading="Basketball"
          thumbnails={this.props.nba.thumbnails}
          showCount={4}
          showMore
          showMoreLink={paths.HIGHLIGHTS + '/basketball/nba'} />
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