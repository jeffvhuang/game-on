import * as React from 'react';
import { connect } from 'react-redux';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import { getTournamentName } from '../../../../helpers/utils';
import { getCsgoTournaments } from '../../../redux/csgo/csgo-actions';

import SelectDropdown from '../../common/SelectDropdown';
import { CsgoState } from '../../../redux/csgo/csgo-types';
import { ReduxState } from '../../../redux/redux-state';
import { ESportsTournament } from '../../../../types/esports-api/esports-tournament.model';

interface StateProps {
  csgo: CsgoState;
  selectTournament: (any) => void;
};
interface DispatchProps { getCsgoTournaments; };
type Props = StateProps & DispatchProps;
interface State {
  values: string[];
  tournaments: ESportsTournament[];
}

class CsgoTournamentsContainer extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      values: [],
      tournaments: props.csgo.tournaments
    };
  }

  componentDidMount() {
    const { csgo } = this.props;
    if (!csgo.tournaments.length) this.props.getCsgoTournaments()
      .then(data => {
        this.setState({ tournaments: data });
      });
  }

  handleChange = values => {
    // Either get all tournaments when nothing selected in dropdown or
    // get tournaments that include any team that has been selected
    const tournaments = (!values.length)
      ? this.props.csgo.tournaments
      : this.props.csgo.tournaments.filter(tournament => {
        for (let i = 0; i < tournament.teams.length; i++) {
          const team = tournament.teams[i];
          if (values.some(value => value == team.name)) return tournament;
        }
      });

    this.setState({ tournaments });
  }
  
  getTournamentsForCalendar = (tournaments: ESportsTournament[]) => {
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

    console.log(this.state);
    console.log(this.getTournamentsForCalendar(this.state.tournaments));
    return (
      <div className="section">
        <div className="select-dd">
          <SelectDropdown handleChange={this.handleChange}
            options={this.props.csgo.teams} />
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
  csgo: state.csgo
});

const mapDispatchToProps = {
  getCsgoTournaments
};

export default connect(mapStateToProps, mapDispatchToProps)(CsgoTournamentsContainer);
