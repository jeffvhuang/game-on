import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

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
import { TennisState } from '../../../redux/tennis/tennis-types';
import { ReduxState } from '../../../redux/root-reducer';

interface MatchParams { tournamentNumber: string; }

interface StateProps extends RouteComponentProps<MatchParams>  {
  tennis: TennisState;
}

interface DispatchProps {
  getTennisTournamentSchedule,
  getTennisTournamentInfo,
  clearTennisTournamentSchedule,
  clearTennisTournamentInfo,
}

interface State {
  tournamentId: string;
  values: string[];
  tournamentName: string;
}

type Props = StateProps & DispatchProps;

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

const mapStateToProps = (state: ReduxState) => ({
  tennis: state.tennis
});

const mapDispatchToProps = {
  getTennisTournamentSchedule,
  getTennisTournamentInfo,
  clearTennisTournamentSchedule,
  clearTennisTournamentInfo
}

// longhand form
// const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
//   return {
//     getTennisTournamentSchedule,
//     getTennisTournamentInfo,
//     clearTennisTournamentSchedule,
//     clearTennisTournamentInfo
//   }
// }

// bindActionCreators({
//   getTennisTournamentSchedule,
//   getTennisTournamentInfo,
//   clearTennisTournamentSchedule,
//   clearTennisTournamentInfo
// }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TennisTournamentPageContainer);
