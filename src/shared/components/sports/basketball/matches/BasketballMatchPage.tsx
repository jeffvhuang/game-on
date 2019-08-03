import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';

import { paths } from '../../../../../helpers/constants';
import { getNbaSchedule, getNbaTeams, getNbaVideos } from '../../../../redux/nba/nba-actions';
import { NbaState } from '../../../../redux/nba/nba-types';
import { ReduxState } from '../../../../redux/redux-state';

interface MatchParams { matchId: string; }
interface StateProps extends RouteComponentProps<MatchParams> {
  nba: NbaState;
}

interface DispatchProps {
  getNbaSchedule; getNbaTeams; getNbaVideos;
}

interface State {
  matchId: string
}

type Props = StateProps & DispatchProps;

class BasketballMatchPage extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      matchId: props.match.params.matchId
    };
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <>
        <h1>Match: </h1>
        <div className="main-section">
          {/* <BasketballScheduleSection header="Today's Games"
            games={this.props.nba.gamesToday}
            values={this.state.values} />
          <BasketballScheduleSection header="Upcoming"
            games={this.props.nba.upcoming}
            values={this.state.values} /> */}
          {/* <Link to={paths.EVENTS} className="right">More ></Link> */}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  nba: state.nba
});

const mapDispatchToProps = {
  getNbaSchedule, getNbaTeams, getNbaVideos
}

export default connect(mapStateToProps, mapDispatchToProps)(BasketballMatchPage);