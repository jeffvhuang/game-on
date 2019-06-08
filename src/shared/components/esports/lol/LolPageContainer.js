import React from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Switch } from 'antd';

import { paths } from '../../../../helpers/constants';
import { getLolTournaments } from '../../../redux/actions/lol-actions';

import SelectDropdown from '../../common/SelectDropdown';

const propTypes = {
  match: object,
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
        <Switch defaultChecked onChange={this.handleChange} />
        <div className="calendar">
          <FullCalendar defaultView="dayGridMonth" plugins={[dayGridPlugin]} />
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
