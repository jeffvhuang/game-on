import React from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { paths } from '../../../helpers/constants';
import { getDotaTournaments, getDotaTournamentMatches } from '../../redux/actions/dota-actions';

import SelectDropdown from '../common/SelectDropdown';
import DotaTournaments from './DotaTournaments';
import DotaTournamentMatchesContainer from './DotaTournamentMatchesContainer';

const propTypes = {
  match: object,
  dota: object.isRequired,
  actions: object.isRequired
};

class DotaTournamentsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: [],
      showTournamentsMatches: false,
      tournament: {},
    };
  }

  componentDidMount() {
    const { dota, actions } = this.props;
    if (dota.tournaments.length < 1) actions.getDotaTournaments();
  }

  handleChange = values => this.setState({ values });

  selectTournament = (id) => {
    return () => {
      this.props.actions.getDotaTournamentMatches(id);
      const tournament = this.props.dota.tournaments.find(t => t.id == id);
      this.setState({
        showTournamentsMatches: true,
        tournament
      });
    };
  }

  render() {
    const { dota } = this.props;
    const mainClass = (this.state.showTournamentsMatches) ? "reduced-side-width" : "full-width";
    const ddClass = (this.state.showTournamentsMatches) ? "select-dd-left" : "select-dd";

    return (
      <div className="section flex">
        <div className={mainClass}>
          <div className={ddClass}>
            <SelectDropdown handleChange={this.handleChange}
              options={this.props.dota.teams} />
          </div>
          <DotaTournaments header="Ongoing"
            tournaments={dota.ongoing}
            values={this.state.values}
            showTournamentsMatches={this.state.showTournamentsMatches}
            selectTournament={this.selectTournament} />
          <DotaTournaments header="Upcoming"
            tournaments={dota.upcoming}
            values={this.state.values}
            showTournamentsMatches={this.state.showTournamentsMatches}
            selectTournament={this.selectTournament} />
          <DotaTournaments header="Completed"
            tournaments={dota.completed}
            values={this.state.values}
            showTournamentsMatches={this.state.showTournamentsMatches}
            selectTournament={this.selectTournament} />
          <Link to={paths.EVENTS} className="right">More ></Link>
        </div>
        {this.state.showTournamentsMatches &&
          <DotaTournamentMatchesContainer tournament={this.state.tournament}
            matches={dota.tournamentMatches} />}
      </div>
    );
  }
}

DotaTournamentsContainer.propTypes = propTypes;

const mapStateToProps = (state) => ({
  dota: state.dota
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    getDotaTournaments,
    getDotaTournamentMatches
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DotaTournamentsContainer);
