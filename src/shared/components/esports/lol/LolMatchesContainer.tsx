import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { paths } from '../../../../helpers/constants';
import { getFormattedTime, getTournamentNameFromMatch } from '../../../../helpers/utils';
import { getLolMatches, getLolTournaments } from '../../../redux/lol/lol-actions';

import SelectDropdown from '../../common/SelectDropdown';
import LolTournamentMatches from './LolTournamentMatches';
import TournamentSelectDropdown from '../../common/TournamentSelectDropdown';
import MatchData from './MatchData';
import { LolState } from '../../../redux/lol/lol-types';
import { ReduxState } from '../../../redux/redux-state';

interface StateProps {
  lol: LolState
};
interface DispatchProps {
  getLolMatches; getLolTournaments;
}
type Props = StateProps & DispatchProps;

interface State {
  values: string[];
  tournamentValues: string[];
}

class LolMatchesContainer extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      values: [],
      tournamentValues: [],
    };
  }

  componentDidMount() {
    const props = this.props;
    if (!props.lol.matches.length) props.getLolMatches();
    if (!props.lol.tournaments.length) props.getLolTournaments();
  }

  handleChange = values => this.setState({ values });
  handleTournamentChange = tournamentValues => this.setState({ tournamentValues });

  getMatchesForTable = (data, values, tournamentValues) => {
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
        if (values.some(v => v == match.opponents[0].opponent.name 
          || v == match.opponents[1].opponent.name)
          || tournamentValues.some(t => t == tournamentNameFromMatch))
          matches.push(this.getMatchTableObject(match));
      }
    }
    return matches;
  }

  getMatchTableObject = match => {
    const startDate = new Date(match.beginAt);
    return {
      key: match.id,
      name: match.name,
      team1: match.opponents[0].opponent.name,
      team2: match.opponents[1].opponent.name,
      date: startDate.toDateString().slice(0, -5),
      time: getFormattedTime(startDate),
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
            options={this.props.lol.tournaments} />
        </div>
        <div className="select-dd">
          <SelectDropdown handleChange={this.handleChange}
            options={this.props.lol.matchesTeams} />
        </div>
        <div>
          <LolTournamentMatches header="Matches"
            matches={this.getMatchesForTable(
              this.props.lol.matches, 
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
  lol: state.lol
});

const mapDispatchToProps = {
  getLolMatches,
  getLolTournaments
};

export default connect(mapStateToProps, mapDispatchToProps)(LolMatchesContainer);

