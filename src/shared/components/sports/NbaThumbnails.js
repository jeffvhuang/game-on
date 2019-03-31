import React from 'react';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { array } from 'prop-types';

import { paths } from '../../../helpers/constants';

NbaThumbnails.propTypes = {
  videos: array.isRequired
};

function NbaThumbnails({ videos }) {
  let vidsToShow;
  if (videos.length > 4) vidsToShow = videos.slice(0, 4);
  else vidsToShow = videos;
  
  return (
    <div className="section">
      <h2>Highlights</h2>
      <Row gutter={8} type="flex" justify="space-between" className="margin-bot">
        {vidsToShow.map((video) => {
          return (
            <Col span={5} key={video.snippet.resourceId.videoId}>
              <div>Video Id: {video.snippet.resourceId.videoId}</div>
              <img src={video.snippet.thumbnails.default.url} />
              <h4>{video.snippet.title}</h4>
            </Col>
          );
        })}
      </Row>
      <Link to={paths.HIGHLIGHTS} className="right">More ></Link>
    </div>
  );
}

export default NbaThumbnails;