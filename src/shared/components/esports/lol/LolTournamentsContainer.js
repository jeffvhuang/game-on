import React from 'react';
import { object, func } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import { getTournamentName } from '../../../../helpers/utils';
import { getLolTournaments } from '../../../redux/actions/lol-actions';

import SelectDropdown from '../../common/SelectDropdown';

const propTypes = {
  lol: object.isRequired,
  actions: object.isRequired,
  selectTournament: func.isRequired
};

class LolTournamentsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: [],
      tournaments: []
    };
  }

  componentDidMount() {
    const { lol, actions } = this.props;
    if (!lol.tournaments.length) actions.getLolTournaments()
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
    const events = [];

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

LolTournamentsContainer.propTypes = propTypes;

const mapStateToProps = (state) => ({
  lol: state.lol
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ getLolTournaments }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LolTournamentsContainer);
