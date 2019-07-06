import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { paths } from '../../../../helpers/constants';
import { getFormattedTime, getTournamentNameFromMatch } from '../../../../helpers/utils';
import { getOverwatchMatches, getOverwatchTournaments } from '../../../redux/overwatch/overwatch-actions';

import SelectDropdown from '../../common/SelectDropdown';
import OverwatchTournamentMatches from './OverwatchTournamentMatches';
import TournamentSelectDropdown from '../../common/TournamentSelectDropdown';
import MatchData from '../lol/MatchData';
import { OverwatchState } from '../../../redux/overwatch/overwatch-types';
import { ReduxState } from '../../../redux/redux-state';
import { ESportsMatch } from '../../../../types/esports-api/esports-match.model';

interface StateProps {
  overwatch: OverwatchState
};
interface DispatchProps {
  getOverwatchMatches; getOverwatchTournaments;
}
type Props = StateProps & DispatchProps;

interface State {
  values: string[];
  tournamentValues: string[];
}

class OverwatchMatchesContainer extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      values: [],
      tournamentValues: [],
    };
  }

  componentDidMount() {
    const props = this.props;
    if (!props.overwatch.matches.length) props.getOverwatchMatches();
    if (!props.overwatch.tournaments.length) props.getOverwatchTournaments();
  }

  handleChange = values => this.setState({ values });
  handleTournamentChange = tournamentValues => this.setState({ tournamentValues });

  getMatchesForTable = (data: ESportsMatch[], values: string[], tournamentValues: string[]) => {
    const matches = [] as any[];
    // Create objects for every match or filter matches that include one of the selected teams
    if (!values.length && !tournamentValues.length) {
      for (let i = 0; i < data.length; i++) {
        const match = data[i];
        matches.push(this.getMatchTableObject(match));
      }
    } else {
      for (let i = 0; i < data.length; i++) {
        const match = data[i];
        const tournamentNameFromMatch = getTournamentNameFromMatch(match);
      
        // Only append match to table if the match has a selected team and 
        // is part of any of the selected tournaments
        if (match.opponents.length > 1 && (values.some(v => v == match.opponents[0].opponent.name
          || v == match.opponents[1].opponent.name))
          || tournamentValues.some(t => t == tournamentNameFromMatch)) {
          matches.push(this.getMatchTableObject(match));
        }
      }
    }
    return matches;
  }

  getMatchTableObject = (match: ESportsMatch) => {
    const startDate = (match.beginAt) ? new Date(match.beginAt) : undefined;
    return {
      key: match.id,
      name: match.name,
      team1: (match.opponents.length) ? match.opponents[0].opponent.name : "",
      team2: (match.opponents.length) ? match.opponents[1].opponent.name : "",
      date: (startDate) ? startDate.toDateString().slice(0, -5) : undefined,
      time: (startDate) ? getFormattedTime(startDate) : undefined,
      games: match.games,
      beginAt: match.beginAt,
      endAt: match.endAt,
      opponents: match.opponents
    };
  }

  getExpandedRow = () => {
    return (match: ESportsMatch) => <MatchData match={match}
      getWinnerName={this.getWinnerName}
      getWinnerLogo={this.getWinnerLogo} />;
  }

  getWinnerName = (winnerId, opponents) => {
    const winner = opponents.find(x => x.opponent.id == winnerId);
    return (winner) ? winner.opponent.name : null;
  }

  getWinnerLogo = (winnerId, opponents) => {
    const winner = opponents.find(x => x.opponent.id == winnerId);
    return (winner) ? winner.opponent.imageUrl : null;
  }

  render() {
    return (
      <div className="section">
        <div className="select-dd">
          <TournamentSelectDropdown handleChange={this.handleTournamentChange}
            options={this.props.overwatch.tournaments} />
        </div>
        <div className="select-dd">
          <SelectDropdown handleChange={this.handleChange}
            options={this.props.overwatch.matchesTeams} />
        </div>
        <div>
          <OverwatchTournamentMatches header="Matches"
            matches={this.getMatchesForTable(
              this.props.overwatch.matches,
              this.state.values,
              this.state.tournamentValues)}
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
  getOverwatchMatches,
  getOverwatchTournaments
};

export default connect(mapStateToProps, mapDispatchToProps)(OverwatchMatchesContainer);

