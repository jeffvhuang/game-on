import * as React from 'react';
import { connect } from 'react-redux';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import { getTournamentName } from '../../../../helpers/utils';
import { getLolTournaments } from '../../../redux/lol/lol-actions';

import SelectDropdown from '../../common/SelectDropdown';
import { LolState } from '../../../redux/lol/lol-types';
import { ReduxState } from '../../../redux/redux-state';
import { ESportsTournament } from '../../../../types/esports-api/esports-tournament.model';

interface StateProps {
  lol: LolState;
  selectTournament: (any) => void;
};

interface DispatchProps {
  getLolTournaments;
};

type Props = StateProps & DispatchProps;

interface State {
  values: string[];
  tournaments: ESportsTournament[];
}

class LolTournamentsContainer extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      values: [],
      tournaments: props.lol.tournaments
    };
  }

  componentDidMount() {
    const { lol } = this.props;
    if (!lol.tournaments.length) this.props.getLolTournaments()
      .then(data => {
        this.setState({ tournaments: data });
      });
  }

  handleChange = values => {
    // Either get all tournaments when nothing selected in dropdown or
    // get tournaments that include any team that has been selected
    const tournaments = (!values.length)
      ? this.props.lol.tournaments
      : this.props.lol.tournaments.filter(tournament => {
        for (let i = 0; i < tournament.teams.length; i++) {
          const team = tournament.teams[i];
          if (values.some(value => value == team.name)) return tournament;
        }
      });

    this.setState({ tournaments });
  }
  
  getTournamentsForCalendar = (tournaments) => {
    const events = [] as any[];

    for (let i = 0; i < tournaments.length; i++) {
      const tournament = tournaments[i];

      events.push({
        id: tournament.id,
        title: getTournamentName(tournament),
        start: tournament.beginAt,
        end: tournament.endAt
      });
    }

    return events;
  }

  render() {
    return (
      <div className="section">
        <div className="select-dd">
          <SelectDropdown handleChange={this.handleChange}
            options={this.props.lol.teams} />
        </div>
        <div className="calendar">
          <FullCalendar defaultView="dayGridMonth"
            plugins={[dayGridPlugin]}
            events={this.getTournamentsForCalendar(this.state.tournaments)}
            eventClick={this.props.selectTournament} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  lol: state.lol
});

const mapDispatchToProps = {
  getLolTournaments
};

export default connect(mapStateToProps, mapDispatchToProps)(LolTournamentsContainer);
