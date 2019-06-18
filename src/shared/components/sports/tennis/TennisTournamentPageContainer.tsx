import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Link } from 'react-router-dom';

import { paths } from '../../../../helpers/constants';
import {
  getTennisTournamentSchedule,
  getTennisTournamentInfo,
  clearTennisTournamentSchedule,
  clearTennisTournamentInfo
} from '../../../redux/tennis/tennis-actions';

import VideoThumbnails from '../../common/VideoThumbnails';
import SelectDropdown from '../../common/SelectDropdown';
import TennisMatches from './TennisMatches';
import { RouteComponentProps } from 'react-router';
import { TennisState, TennisActionTypes } from '../../../redux/tennis/tennis-types';
import { AppState } from '../../../redux/root-reducer';
import { TennisTournamentSchedule } from '../../../../types/tennis-api/tennis-tournament-schedule.model';
import { TennisTournamentInfo } from '../../../../types/tennis-api/tennis-tournament-info.model';

interface MatchParams { tournamentNumber: string; }

interface OwnProps extends RouteComponentProps<MatchParams> {
  // tennis: TennisState;
  // actions: TennisActionTypes | typeof getTennisTournamentSchedule;
}

interface StateProps {
  tennis: TennisState;
}

interface DispatchProps {
  getTennisTournamentSchedule: (tournamentId: string) => Promise<TennisTournamentSchedule[]>;
  getTennisTournamentInfo: (tournamentId: string) => Promise<TennisTournamentInfo>;
  clearTennisTournamentSchedule: () => void;
  clearTennisTournamentInfo: () => void;
}

interface State {
  tournamentId: string;
  values: string[];
  tournamentName: string;
}

type Props = StateProps & OwnProps & DispatchProps;

class TennisTournamentPageContainer extends React.Component<Props, State> {
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
      props.getTennisTournamentSchedule(tournamentId);

    if (!tournamentInfo.tournament || tournamentInfo.tournament.id !== tournamentId)
      props.getTennisTournamentInfo(tournamentId).then(data =>
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

const mapStateToProps = (state: AppState) => ({
  tennis: state.tennis
});

const mapDispatchToProps = (dispatch: Dispatch<TennisActionTypes>) =>
  bindActionCreators({
    getTennisTournamentSchedule,
    getTennisTournamentInfo,
    clearTennisTournamentSchedule,
    clearTennisTournamentInfo
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TennisTournamentPageContainer);
