import React from 'react';

import VideoThumbnails from './VideoThumbnails';
import { sportsList, esportsList } from '../../../helpers/constants';
import SelectDropdown from '../common/SelectDropdown';

export default class HighlightsPageContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      videos: [
        "https://dummyimage.com/200x160/000/fff.jpg&text=Video",
        "https://dummyimage.com/200x160/000/fff.jpg&text=Video2",
        "https://dummyimage.com/200x160/000/fff.jpg&text=Video3",
        "https://dummyimage.com/200x160/000/fff.jpg&text=Video4"
      ],
      show: this.getCompleteList()
    };
  }
  
  getCompleteList = () => {
    return ["Popular"].concat(sportsList, esportsList);
  }

  handleChange = value => {
    if (value.length > 0) {
      this.setState({ show: value });
    } else {
      this.setState({ show: this.getCompleteList() });
    }
  }

  render() {
    return (
      <div className="mid-container">
        <SelectDropdown handleChange={this.handleChange} />
        {this.state.show.map(sport => {
          return <VideoThumbnails key={sport} heading={sport} videos={this.state.videos} />;
        })}
      </div>
    );
  }
}