import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';

import { paths } from '../../../../../helpers/constants';
import { getNbaGameDetails } from '../../../../redux/nba/nba-actions';
import { NbaState } from '../../../../redux/nba/nba-types';
import { ReduxState } from '../../../../redux/redux-state';

interface MatchParams { matchId: string; }
interface StateProps extends RouteComponentProps<MatchParams> {
  nba: NbaState;
}

interface DispatchProps {
  getNbaGameDetails;
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
    this.props.getNbaGameDetails(this.state.matchId);
  }

  render() {
    const { gameDetails } = this.props.nba;
    return (
      <>
        <h1>Match: {this.state.matchId}</h1>
        <div className="main-section">
          <div>
            <div className="team-display">
              <div>{gameDetails.hTeam.fullName}</div>
              <div><img src={gameDetails.hTeam.logo} /></div>
            </div>
            <div>
              <div className="score-display">
                <div>{gameDetails.hTeam.score.points}</div>
                <div>-</div>
                <div>{gameDetails.vTeam.score.points}</div>
              </div>
              <div className="period-display">
                <div>Q{gameDetails.currentPeriod.charAt(0)}</div>
                <div>{gameDetails.clock}</div>
              </div>
            </div>
            <div className="team-display">
              <div>{gameDetails.vTeam.fullName}</div>
              <div><img src={gameDetails.vTeam.logo} /></div>
            </div>
          </div>
          <div>
            <h3>Stats Leaders</h3>
            <div>
              <div className="stats-leader-col">
                {gameDetails.hTeam.leaders.map((leader, i) => {
                  return (
                    <div className="row" key={i}>
                      <div>{leader.name}</div>
                      <div>{leader.stat}</div>
                      <div>{leader.value}</div>
                    </div>
                  )
                })}
              </div>
              <div className="stats-leader-col">
                {gameDetails.vTeam.leaders.map((leader, i) => {
                  return (
                    <div className="row" key={i}>
                      <div>{leader.name}</div>
                      <div>{leader.stat}</div>
                      <div>{leader.value}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  nba: state.nba
});

const mapDispatchToProps = {
  getNbaGameDetails
}

export default connect(mapStateToProps, mapDispatchToProps)(BasketballMatchPage);