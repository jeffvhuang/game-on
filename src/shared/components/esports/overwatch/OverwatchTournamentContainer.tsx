import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { paths } from '../../../../helpers/constants';
import { getFormattedTime, getTournamentNameFromMatch } from '../../../../helpers/utils';
import { getOverwatchTournaments, getOverwatchTournamentMatches } from '../../../redux/overwatch/overwatch-actions';

import ManualSelectDropdown from '../../common/ManualSelectDropdown';
import OverwatchTournamentMatches from './OverwatchTournamentMatches';
import SingleTournamentSelectDropdown from '../../common/SingleTournamentSelectDropdown';
import MatchData from '../lol/MatchData';
import { OverwatchState } from '../../../redux/overwatch/overwatch-types';
import { ReduxState } from '../../../redux/redux-state';
import { ESportsOpponent } from '../../../../types/esports-api/esports-opponent.model';
import { ESportsMatch } from '../../../../types/esports-api/esports-match.model';

interface StateProps { overwatch: OverwatchState; };
interface DispatchProps { getOverwatchTournaments; getOverwatchTournamentMatches; };
type Props = StateProps & DispatchProps;
interface State {
  values: string[];
  tournamentId?: number;
}

class OverwatchTournamentContainer extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      values: [],
      tournamentId: undefined
    };
  }

  componentDidMount() {
    const { overwatch } = this.props;
    if (!overwatch.tournaments.length) this.props.getOverwatchTournaments();
  }

  handleChange = values => this.setState({ values });
  handleTournamentChange = tournamentId => {
    const { overwatch } = this.props;
    if (!overwatch.tournamentMatches.length || overwatch.tournamentMatches[0].tournament.id != tournamentId)
      this.props.getOverwatchTournamentMatches(tournamentId);
    this.setState({ tournamentId, values: [] });
  }

  getTournamentId = (tournamentMatches: ESportsMatch[], id?: number): string => {
    if (tournamentMatches.length) return tournamentMatches[0].tournament.id.toString();
    return (id) ? id.toString() : '';
  }

  getTournamentName = (tournamentMatches: ESportsMatch[]): string => {
    return (tournamentMatches.length) ? getTournamentNameFromMatch(tournamentMatches[0]) : '';
  }

  getTeams = (tournamentMatches) => {
    if (tournamentMatches.length) {
      const id = tournamentMatches[0].tournament.id;
      const tournament = this.props.overwatch.tournaments.find(x => x.id == id);
      return (tournament != null) ? tournament.teams : [];
    }
    return [];
  }

  getMatchesForTable = (tournamentMatches: ESportsMatch[], values: string[]) => {
    const matches = [] as any[];
    // Create objects for every match or filter matches that include one of the selected teams
    if (!values.length) {
      for (let i = 0; i < tournamentMatches.length; i++) {
        const match = tournamentMatches[i];
        matches.push(this.getMatchTableObject(match));
      }
    } else {
      for (let i = 0; i < tournamentMatches.length; i++) {
        const match = tournamentMatches[i];
        if (values.some(v => v == match.opponents[0].opponent.name
          || v == match.opponents[1].opponent.name))
          matches.push(this.getMatchTableObject(match));
      }
    }
    return matches;
  }

  getMatchTableObject = (match: ESportsMatch) => {
    const startDate = (match.beginAt) ? new Date(match.beginAt) : null;
    const dateString = (startDate) ? startDate.toDateString().slice(0, -5) : null;
    const time = (startDate) ? getFormattedTime(startDate) : null;

    return {
      key: match.id,
      name: match.name,
      team1: match.opponents[0].opponent.name,
      team2: match.opponents[1].opponent.name,
      date: dateString,
      time: time,
      games: match.games,
      beginAt: match.beginAt,
      endAt: match.endAt,
      opponents: match.opponents
    };
  }

  getExpandedRow = () => {
    return match => <MatchData match={match} 
      getWinnerName={this.getWinnerName}
      getWinnerLogo={this.getWinnerLogo} />;
  }

  getWinnerName = (winnerId: number, opponents: ESportsOpponent[]) => {
    const winner = opponents.find(x => x.opponent.id == winnerId);
    return (winner) ? winner.opponent.name : undefined;
  }

  getWinnerLogo = (winnerId: number, opponents: ESportsOpponent[]) => {
    const winner = opponents.find(x => x.opponent.id == winnerId);
    return (winner) ? winner.opponent.imageUrl : undefined;
  }

  render() {
    return (
      <div className="section">
        <div className="select-dd">
          <SingleTournamentSelectDropdown handleChange={this.handleTournamentChange}
            options={this.props.overwatch.tournaments}
            value={this.getTournamentId(this.props.overwatch.tournamentMatches, this.state.tournamentId)} />
        </div>
        <h2>{this.getTournamentName(this.props.overwatch.tournamentMatches)}</h2>
        <div className="select-dd">
          <ManualSelectDropdown handleChange={this.handleChange}
            options={this.getTeams(this.props.overwatch.tournamentMatches)}
            values={this.state.values} />
        </div>
        <div>
          <OverwatchTournamentMatches matches={this.getMatchesForTable(
            this.props.overwatch.tournamentMatches,
            this.state.values)}
            getRow={this.getExpandedRow} />
          <Link to={paths.EVENTS} className="right">More ></Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  overwatch: state.overwatch
});

const mapDispatchToProps = {
  getOverwatchTournaments,
  getOverwatchTournamentMatches
};

export default connect(mapStateToProps, mapDispatchToProps)(OverwatchTournamentContainer);

