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

class DotaTournamentsPageContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: []
    };
  }

  componentDidMount() {
    const props = this.props;
    if (props.dota.tournaments.length < 1) props.actions.getDotaTournaments();
  }

  handleChange = values => this.setState({ values });

  render() {
    return (
      <div>
        <h1>Dota 2</h1>
        {/* <SelectDropdown handleChange={this.handleChange}
          options={this.props.dota.teams} /> */}
        <div className="section">
          <DotaTournaments header="Ongoing"
            games={this.props.dota.ongoing}
            values={this.state.values} />
          <DotaTournaments header="Upcoming"
            games={this.props.dota.upcoming}
            values={this.state.values} />
          <DotaTournaments header="Completed"
            games={this.props.dota.completed}
            values={this.state.values} />
          <Link to={paths.EVENTS} className="right">More ></Link>
        </div>
      </div>
    );
  }
}

DotaTournamentsPageContainer.propTypes = propTypes;

const mapStateToProps = (state) => ({
  dota: state.dota
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    getDotaTournaments
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DotaTournamentsPageContainer);

