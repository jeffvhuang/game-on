import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { paths } from '../../../../helpers/constants';
import { getTennisTournaments } from '../../../redux/tennis/tennis-actions';

import VideoThumbnails from '../../common/VideoThumbnails';
import SelectDropdown from '../../common/SelectDropdown';
import TennisTournaments from './TennisTournaments';
import VideoHeader from '../../common/VideoHeader';
import { TennisState } from '../../../redux/tennis/tennis-types';
import { ReduxState } from '../../../redux/root-reducer';

interface StateProps {
  tennis: TennisState;
}

interface DispatchProps {
  getTennisTournaments
}

interface State {
  values: string[];
}

type Props = StateProps & DispatchProps;

const tournamentTypes = [
  { name: 'Grand Slam', id: 'grand_slam' },
  { name: 'ATP 1000', id: 'atp_1000' },
  { name: 'ATP 500', id: 'atp_500' },
  { name: 'ATP 250', id: 'atp_250' },
  { name: 'WTA Premier', id: 'wta_premier' },
  { name: 'WTA International', id: 'wta_international' },
  { name: 'Mixed', id: 'mixed' }
];

class TennisPageContainer extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      values: []
    };
  }

  componentDidMount() {
    const props = this.props;
    if (props.tennis.tournaments.length < 1) props.getTennisTournaments();
  }

  handleChange = values => this.setState({ values });

  render() {
    return (
      <div>
        {/* <VideoHeader /> */}
        <h1>Tennis</h1>
        <div className="select-dd">
          <SelectDropdown handleChange={this.handleChange} options={tournamentTypes} />
        </div>
        {/* <VideoThumbnails heading="Tennis"
          thumbnails={this.props.tennis.thumbnails}
          showCount={4}
          showMore
          showMoreLink={paths.HIGHLIGHTS + '/Tennis/tennis'} /> */}
        <div className="section">
          <TennisTournaments tournaments={this.props.tennis.ongoing}
            header="Ongoing"
            values={this.state.values} />
          <TennisTournaments tournaments={this.props.tennis.upcoming}
            header="Upcoming"
            values={this.state.values} />
          <TennisTournaments tournaments={this.props.tennis.completed}
            header="Completed"
            values={this.state.values} />
          <Link to={paths.EVENTS} className="right">More ></Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  tennis: state.tennis
});

const mapDispatchToProps = {
  getTennisTournaments
}

export default connect(mapStateToProps, mapDispatchToProps)(TennisPageContainer);
