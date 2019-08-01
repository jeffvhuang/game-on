import * as React from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { paths } from '../../../helpers/constants';
import { getNbaVideos } from '../../redux/nba/nba-actions';
import { getChampionsLeagueVideos } from '../../redux/football/champions-league/champions-league-actions';

import VideoThumbnails from '../common/VideoThumbnails';
import SportSelectDropdown from '../common/SportSelectDropdown';
import { EplState } from '../../redux/football/epl/epl-types';
import { NbaState } from '../../redux/nba/nba-types';
import { isPropsEqual } from '@fullcalendar/core';
import { ReduxState } from '../../redux/redux-state';

interface StateProps {
  nba: NbaState;
  epl: EplState;
};

interface DispatchProps {
  getNbaVideos;
  getChampionsLeagueVideos;
}

type Props = StateProps & DispatchProps;

interface State {
  show: string[];
}

class HighlightsPageContainer extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      show: this.getCompleteList()
    };
  }

  componentDidMount() {
    const props = this.props;
    if (props.nba.videos.length < 1) {
      props.getNbaVideos();
    }
    if (props.epl.videos.length < 1) {
      props.getChampionsLeagueVideos();
      // props.getEuropaLeagueVideos();
    }
  }

  getCompleteList = () => {
    return ['Basketball', 'Football'];
    // return ["Popular", ...allSportsList];
  }

  handleChange = value => {
    if (value.length > 0) this.setState({ show: value });
    else this.setState({ show: this.getCompleteList() });
  }

  getReduxObjectForSport = (sport) => {
    switch (sport.toLowerCase()) {
      case 'basketball':
        return 'nba';
      case 'football':
        return 'epl';
      default:
        return '';
    }
  }

  render() {
    return (
      <div className="mid-container">
        <SportSelectDropdown handleChange={this.handleChange} showGeneral={false} />
        {this.state.show.map(sport => {
          const obj = this.getReduxObjectForSport(sport.toLowerCase());
          const thumbnails = (obj) ? this.props[obj].thumbnails : [];
          return <VideoThumbnails key={sport} heading={sport} thumbnails={thumbnails}
            showCount={4} showMore showMoreLink={paths.HIGHLIGHTS + '/' + sport.toLowerCase()} />;
        })}
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  nba: state.nba,
  epl: state.epl
});

const mapDispatchToProps = {
  getNbaVideos,
  getChampionsLeagueVideos
};

export default connect(mapStateToProps, mapDispatchToProps)(HighlightsPageContainer);