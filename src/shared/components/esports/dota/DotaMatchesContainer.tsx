import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { paths } from '../../../../helpers/constants';
import { getDotaMatches, getDotaSeries } from '../../../redux/dota/dota-actions';

import SelectDropdown from '../../common/SelectDropdown';
import DotaMatches from './DotaMatches';
import { DotaState } from '../../../redux/dota/dota-types';
import { ReduxState } from '../../../redux/redux-state';

interface StateProps {
  dota: DotaState;
};
interface DispatchProps {
  getDotaMatches;
  getDotaSeries;
}
type Props = StateProps & DispatchProps;
interface State {
  values: string[];
}

class DotaPageContainer extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      values: []
    };
  }

  componentDidMount() {
    const props = this.props;
    if (props.dota.series.length < 1) props.getDotaSeries();
    if (props.dota.matches.length < 1) props.getDotaMatches();
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

const mapStateToProps = (state: ReduxState) => ({
  dota: state.dota
});

const mapDispatchToProps = {
    getDotaMatches,
    getDotaSeries
};

export default connect(mapStateToProps, mapDispatchToProps)(DotaPageContainer);

