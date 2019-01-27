import React from 'react';
import VideoThumbnails from './VideoThumbnails';
import { paths, sports, esports } from '../../../helpers/constants';

export default class HighlightsPageContainer extends React.Component {
  state = {
    videos: [
      "https://dummyimage.com/200x160/000/fff.jpg&text=Video",
      "https://dummyimage.com/200x160/000/fff.jpg&text=Video2",
      "https://dummyimage.com/200x160/000/fff.jpg&text=Video3",
      "https://dummyimage.com/200x160/000/fff.jpg&text=Video4"
    ]
  }

  render() {
    return (
      <div className="mid-container">
        <VideoThumbnails heading="Popular" videos={this.state.videos} />
        <VideoThumbnails heading={sports.FOOTBALL} videos={this.state.videos} />
        <VideoThumbnails heading={sports.BASKETBALL} videos={this.state.videos} />
        <VideoThumbnails heading={sports.TENNIS} videos={this.state.videos} />
        <VideoThumbnails heading={esports.DOTA} videos={this.state.videos} />
        <VideoThumbnails heading={esports.LEAGUE} videos={this.state.videos} />
        <VideoThumbnails heading={esports.CSGO} videos={this.state.videos} />
        <VideoThumbnails heading={esports.OVERWATCH} videos={this.state.videos} />
      </div>
    );
  }
}