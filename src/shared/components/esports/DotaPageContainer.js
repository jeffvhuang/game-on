import React from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { dotaTournaments } from '../../../helpers/dotaData';
import { getDOTASchedule } from '../../../helpers/utils';
import { getDotaData, getDotaLeagues, getDotaProMatches, getDotaTeams } from '../../redux/actions/dota-actions';

import HighlightsContainer from '../landing/HighlightsContainer';
import EventSelectDropdown from '../common/EventSelectDropdown';
import EventDatesSection from '../common/EventDatesSection';

const propTypes = {
  match: object,
  dota: object.isRequired,
  actions: object.isRequired
};

class DotaPageContainer extends React.Component {
  constructor(props) {
    super(props);

    if (props.dota.data.length < 1) props.actions.getDotaData();
    props.actions.getDotaProMatches();

    this.state = {
      videos: [
        "https://dummyimage.com/200x160/000/fff.jpg&text=Video",
        "https://dummyimage.com/200x160/000/fff.jpg&text=Video2",
        "https://dummyimage.com/200x160/000/fff.jpg&text=Video3",
        "https://dummyimage.com/200x160/000/fff.jpg&text=Video4"
      ],
      schedule: {},
      selected: [],
      ongoing: [],
      upcoming: [],
      completed: []
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!prevState.schedule.hasOwnProperty('upcoming') && nextProps.dota.data.length > 0) {
      const schedule = getDOTASchedule(nextProps.dota.data);
      return {
        schedule: schedule,
        ongoing: schedule.ongoing,
        upcoming: schedule.upcoming,
        completed: schedule.completed
      };
    }
    return null;
  }

  handleChange = values => {
    const length = values.length;
    // Set state arrays depending on whether value has been selected or removed
    if (length == 0) { // All removed
      this.resetInitialState();
    } else {
      this.setState(prevState => {
        if (length > prevState.selected.length) {
          return this.handleAddedSelect(values, prevState);
        } else {
          return this.handleRemovedSelect(values, prevState);
        }
      });
    }
  }

  resetInitialState = () => {
    const { schedule } = this.state;
    this.setState({
      selected: [],
      ongoing: schedule.ongoing,
      upcoming: schedule.upcoming,
      completed: schedule.completed
    });
  }

  handleAddedSelect = (values, prevState) => {
    const selected = values[values.length - 1];
    const { schedule } = this.state;

    const ongoingForSelected = schedule.ongoing.filter(
      event => event.name == selected
    );
    const upcomingForSelected = schedule.upcoming.filter(
      event => event.name == selected
    );
    const completedForSelected = schedule.completed.filter(
      event => event.name == selected
    );

    // If only one has been selected, the previous data was all the data,
    // so replace instead of add on.
    if (values.length == 1) {
      return {
        selected: values,
        ongoing: ongoingForSelected,
        upcoming: upcomingForSelected,
        completed: completedForSelected
      };
    } else {
      return {
        selected: values,
        ongoing: prevState.ongoing.concat(ongoingForSelected),
        upcoming: prevState.upcoming.concat(upcomingForSelected),
        completed: prevState.completed.concat(completedForSelected)
      };
    }
  };

  handleRemovedSelect = (values, prevState) => {
    const previousValues = prevState.selected;
    let selected;
    // Find the removed sport
    for (let i = 0; i < previousValues.length; i++) {
      if (!values.includes(previousValues[i])) {
        selected = previousValues[i];
        break;
      }
    }

    const filteredOngoing = this.state.ongoing.filter(
      event => event.name != selected
    );
    const filteredUpcoming = this.state.upcoming.filter(
      event => event.sport != selected
    );
    const filteredCompleted = this.state.completed.filter(
      event => event.sport != selected
    );

    return {
      selected: values,
      ongoing: filteredOngoing,
      upcoming: filteredUpcoming,
      completed: filteredCompleted
    };
  };

  getTournamentNames = () => {
    return dotaTournaments.map(tournament => tournament.name);
  }

  getMatchesForLeague = (proMatches) => {
    const leagueMatches = proMatches.filter(match => match.league_name == "DreamLeague Season 11");
    return leagueMatches;
  }

  render() {
    return (
      <div>
        <div className="section">
          <div className="mid-flex">
            <video controls width="600" height="400" />
          </div>
        </div>
        <h1>{this.props.match.params.esport}</h1>
        <EventSelectDropdown handleChange={this.handleChange}
          events={this.getTournamentNames()} />
        <HighlightsContainer videos={this.state.videos} />
        <EventDatesSection ongoing={this.state.ongoing}
          upcoming={this.state.upcoming}
          completed={this.state.completed} />
      </div>
    );
  }
}

DotaPageContainer.propTypes = propTypes;

const mapStateToProps = (state) => ({
  dota: state.dota
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ getDotaData, getDotaLeagues, getDotaProMatches, getDotaTeams }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DotaPageContainer);

