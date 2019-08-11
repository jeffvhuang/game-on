import * as React from 'react';
import { RouteComponentProps } from 'react-router';

interface MatchParams {
  vidId: string;
}

interface Props extends RouteComponentProps<MatchParams> { }

interface State {
  vidId: string;
}

class VideoPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      vidId: "https://www.youtube.com/embed/" + props.match.params.vidId
    };
  }

  render() {
    return (
      <div className="mid-container">
        <div className="section">
          <div className="mid-flex">
            <iframe width="1519" height="554" src={this.state.vidId} frameBorder="0" 
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen />
          </div>
        </div>
        <div className="section">
          <h1>Title</h1>
          <div>Description</div>
          <div>Source</div>
        </div>
      </div>
    );
  }
}

export default VideoPage;