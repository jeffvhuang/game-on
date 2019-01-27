import React from 'react';
import { object } from 'prop-types';

export default class VideoPageContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.match.params.id
    };
  }

  render() {
    return (
      <div className="mid-container">
        <div className="section">
          <div className="video-container">
            <video controls width="600" height="400" />
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

VideoPageContainer.propTypes = {
  match: object
};