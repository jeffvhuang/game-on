import React from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { paths } from '../../../../helpers/constants';
import { getDotaSeries } from '../../../redux/actions/dota-actions';

import SelectDropdown from '../../common/SelectDropdown';
import DotaSeries from './DotaSeries';
import DotaSeriesTournamentsContainer from './DotaSeriesTournamentsContainer';

const propTypes = {
  match: object,
  dota: object.isRequired,
  actions: object.isRequired
};

class DotaSeriesContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: [],
      showTournaments: false,
      selectedSeries: {},
    };
  }

  componentDidMount() {
    const { dota, actions } = this.props;
    if (dota.series.length < 1) actions.getDotaSeries();
  }

  handleChange = values => this.setState({ values });

  selectSeries = (id) => {
    return () => {
      const selectedSeries = this.props.dota.series.find(s => s.id == id);
      this.setState({
        showTournaments: true,
        selectedSeries
      });
    };
  }

  render() {
    const { dota } = this.props;
    const mainClass = (this.state.showTournaments) ? "reduced-side-width" : "full-width";
    const ddClass = (this.state.showTournaments) ? "select-dd-left" : "select-dd";

    return (
      <div className="section flex">
        <div className={mainClass}>
          {/* <div className={ddClass}>
            <SelectDropdown handleChange={this.handleChange}
              options={this.props.dota.teams} />
          </div> */}
          <DotaSeries header="Ongoing"
            series={dota.ongoingSeries}
            values={this.state.values}
            showTournaments={this.state.showTournaments}
            selectSeries={this.selectSeries} />
          <DotaSeries header="Upcoming"
            series={dota.upcomingSeries}
            values={this.state.values}
            showTournaments={this.state.showTournaments}
            selectSeries={this.selectSeries} />
          <DotaSeries header="Completed"
            series={dota.completedSeries}
            values={this.state.values}
            showTournaments={this.state.showTournaments}
            selectSeries={this.selectSeries} />
          <Link to={paths.EVENTS} className="right">More ></Link>
        </div>
        {/* {this.state.showTournamentsMatches &&
          <DotaSeriesTournamentsContainer tournament={this.state.tournament}
            matches={dota.tournamentMatches} />} */}
      </div>
    );
  }
}

DotaSeriesContainer.propTypes = propTypes;

const mapStateToProps = (state) => ({
  dota: state.dota
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    getDotaSeries
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DotaSeriesContainer);
