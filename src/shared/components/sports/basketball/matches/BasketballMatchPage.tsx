import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';

import { paths } from '../../../../../helpers/constants';
import { getNbaGameDetails } from '../../../../redux/nba/nba-actions';
import { NbaState } from '../../../../redux/nba/nba-types';
import { ReduxState } from '../../../../redux/redux-state';
import TeamsAndScoresSection from './TeamsAndScoresSection';
import StatsLeadersSection from './StatsLeadersSection';

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
          <TeamsAndScoresSection gameDetails={gameDetails} />
          <StatsLeadersSection gameDetails={gameDetails} />
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