import React from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { paths } from '../../../helpers/constants';
import { getTennisSchedule } from '../../redux/actions/tennis-actions';

import VideoThumbnails from '../common/VideoThumbnails';
// import TennisSelectDropdown from './TennisSelectDropdown';
import TennisTournaments from './TennisTournaments';

const propTypes = {
  tennis: object.isRequired,
  actions: object.isRequired
};

class TennisPageContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: []
    };
  }

  componentDidMount() {
    const props = this.props;
    // if (props.tennis.videos.length < 1) {
    //   props.actions.getChampionsLeagueVideos();
    //   props.actions.getEuropaLeagueVideos();
    // } 
    // if (props.tennis.teams.length < 1) props.actions.getTennisTeams();
    if (props.tennis.schedule.length < 1) props.actions.getTennisSchedule();
  }

  handleChange = values => this.setState({ values });

  resetInitialState = () => {
    this.setState({
      ongoing: this.props.tennis.ongoing,
      upcoming: this.props.tennis.upcoming 
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
        <h1>Tennis</h1>
        {/* <TennisSelectDropdown handleChange={this.handleChange}
          teams={this.sortTeamsForDropdown(this.props.tennis.teams)} />
        <VideoThumbnails heading="Tennis"
          thumbnails={this.props.tennis.thumbnails}
          showCount={4}
          showMore
          showMoreLink={paths.HIGHLIGHTS + '/Tennis/tennis'} /> */}
        <div className="section">
          <TennisTournaments games={this.props.tennis.ongoing}
            header="Ongoing"
            values={this.state.values} />
          <TennisTournaments games={this.props.tennis.upcoming}
            header="Upcoming"
            values={this.state.values} />
          <Link to={paths.EVENTS} className="right">More ></Link>
        </div>
      </div>
    );
  }
}

TennisPageContainer.propTypes = propTypes;

const mapStateToProps = (state) => ({
  tennis: state.tennis
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ 
    getTennisSchedule, }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TennisPageContainer);
