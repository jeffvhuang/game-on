import React from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { paths } from '../../../helpers/constants';
import { getDotaTournaments } from '../../redux/actions/dota-actions';

import SelectDropdown from '../common/SelectDropdown';
import DotaTournaments from './DotaTournaments';

const propTypes = {
  match: object,
  dota: object.isRequired,
  actions: object.isRequired
};

class DotaTournamentsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: []
    };
  }

  componentDidMount() {
    const { dota, actions } = this.props;
    if (dota.tournaments.length < 1) actions.getDotaTournaments();
  }

  handleChange = values => this.setState({ values });

  render() {
    const { dota } = this.props;

    return (
      <div className="section">
        {/* <SelectDropdown handleChange={this.handleChange}
          options={this.props.dota.teams} /> */}
        <DotaTournaments header="Ongoing"
          games={dota.ongoing}
          values={this.state.values} />
        <DotaTournaments header="Upcoming"
          games={dota.upcoming}
          values={this.state.values} />
        <DotaTournaments header="Completed"
          games={dota.completed}
          values={this.state.values} />
        <Link to={paths.EVENTS} className="right">More ></Link>
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
    getDotaTournaments
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DotaTournamentsContainer);
