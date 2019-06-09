import React from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import { paths } from '../../../../helpers/constants';
import { getTournamentName } from '../../../../helpers/utils';
import { getLolTournaments } from '../../../redux/actions/lol-actions';

import SelectDropdown from '../../common/SelectDropdown';

const propTypes = {
  lol: object.isRequired,
  actions: object.isRequired
};

class LolPageContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: [],
      tournaments: [],

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

  getTournaments = (tournaments) => {
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

  selectTournament = (info) => {
    console.log(info.event.title);
  }

  render() {
    return (
      <div>
        <div className="page-header">
          <h1>League of Legends</h1>
        </div>
        <div className="select-dd">
          <SelectDropdown handleChange={this.handleChange}
            options={this.props.lol.teams} />
        </div>
        <div className="calendar">
          <FullCalendar defaultView="dayGridMonth"
            plugins={[dayGridPlugin]}
            events={this.getTournaments(this.state.tournaments)}
            eventClick={this.selectTournament} />
        </div>
      </div>
    );
  }
}

LolPageContainer.propTypes = propTypes;

const mapStateToProps = (state) => ({
  lol: state.lol
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    getLolTournaments
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LolPageContainer);
