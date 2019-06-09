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
      values: []
    };
  }

  componentDidMount() {
    const { lol, actions } = this.props;
    if (!lol.tournaments.length) actions.getLolTournaments();
  }

  handleChange = values => this.setState({ values });

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
    console.log(info);
    console.log('event title', info.event.title);
    console.log('event id', info.event.id);
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
            events={this.getTournaments(this.props.lol.tournaments)}
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
