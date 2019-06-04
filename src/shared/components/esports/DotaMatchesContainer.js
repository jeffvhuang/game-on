import React from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { paths } from '../../../helpers/constants';
import { getDotaMatches, getDotaSeries } from '../../redux/actions/dota-actions';

import SelectDropdown from '../common/SelectDropdown';
import DotaMatches from './DotaMatches';

const propTypes = {
  match: object,
  dota: object.isRequired,
  actions: object.isRequired
};

class DotaPageContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: []
    };
  }

  componentDidMount() {
    const props = this.props;
    if (props.dota.series.length < 1) props.actions.getDotaSeries();
    if (props.dota.matches.length < 1) props.actions.getDotaMatches();
  }

  handleChange = values => this.setState({ values });

  render() {
    return (
      <div className="section">
        <div className="select-dd">
          <SelectDropdown handleChange={this.handleChange}
          options={this.props.dota.matchesTeams} />
        </div>
        <DotaMatches header="Most Recent"
          matches={this.props.dota.matches}
          values={this.state.values} />
        <Link to={paths.EVENTS} className="right">More ></Link>
      </div>
    );
  }
}

DotaPageContainer.propTypes = propTypes;

const mapStateToProps = (state) => ({
  dota: state.dota
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    getDotaMatches,
    getDotaSeries
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DotaPageContainer);

