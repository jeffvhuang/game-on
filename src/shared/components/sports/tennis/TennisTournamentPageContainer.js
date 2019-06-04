import React from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { paths } from '../../../../helpers/constants';
import {
  getTennisTournamentSchedule,
  getTennisTournamentInfo,
  clearTennisTournamentSchedule,
  clearTennisTournamentInfo
} from '../../../redux/actions/tennis-actions';

import VideoThumbnails from '../../common/VideoThumbnails';
import SelectDropdown from '../../common/SelectDropdown';
import TennisMatches from './TennisMatches';

const propTypes = {
  tennis: object.isRequired,
  actions: object.isRequired,
  match: object.isRequired
};

class TennisTournamentPageContainer extends React.Component {
  constructor(props) {
    super(props);

    const tournamentId = "sr:tournament:" + props.match.params.tournamentNumber;
    const tournamentInfo = props.tennis.tournamentInfo;
    const tournamentSchedule = props.tennis.tournamentSchedule;
    let isSameTournamentInfo = true;

    if (!tournamentInfo.tournament || tournamentInfo.tournament.id !== tournamentId) {
      isSameTournamentInfo = false;
      props.actions.clearTennisTournamentInfo();
    }

    if (tournamentSchedule.length > 0 && tournamentSchedule[0].tournament.id !== tournamentId) {
      props.actions.clearTennisTournamentSchedule();
    }

    this.state = {
      tournamentId: tournamentId,
      values: [],
      tournamentName: (isSameTournamentInfo) ? tournamentInfo.tournament.name : '',
    };
  }

  componentDidMount() {
    const props = this.props;
    const tournamentId = this.state.tournamentId;
    const tournamentInfo = props.tennis.tournamentInfo;
    const tournamentSchedule = props.tennis.tournamentSchedule;

    if (tournamentSchedule.length < 1 ||
      (tournamentSchedule.length > 0 && tournamentSchedule[0].tournament.id !== tournamentId))
      props.actions.getTennisTournamentSchedule(tournamentId);

    if (!tournamentInfo.tournament || tournamentInfo.tournament.id !== tournamentId)
      props.actions.getTennisTournamentInfo(tournamentId).then(data =>
        this.setState({ tournamentName: data.tournament.currentSeason.name }));
  }

  handleChange = values => this.setState({ values });

  render() {
    return (
      <div>
        <h1>{this.state.tournamentName}</h1>
        <div className="select-dd">
          <SelectDropdown handleChange={this.handleChange}
            options={this.props.tennis.tournamentInfo.competitors || []} />
        </div>
        {/* <VideoThumbnails heading="Tennis"
          thumbnails={this.props.tennis.thumbnails}
          showCount={4}
          showMore
          showMoreLink={paths.HIGHLIGHTS + '/Tennis/tennis'} /> */}
        <div className="section">
          <TennisMatches games={this.props.tennis.tournamentSchedule}
            header="Matches"
            values={this.state.values} />
          <Link to={paths.EVENTS} className="right">More ></Link>
        </div>
      </div>
    );
  }
}

TennisTournamentPageContainer.propTypes = propTypes;

const mapStateToProps = (state) => ({
  tennis: state.tennis
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    getTennisTournamentSchedule,
    getTennisTournamentInfo,
    clearTennisTournamentSchedule,
    clearTennisTournamentInfo
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TennisTournamentPageContainer);
