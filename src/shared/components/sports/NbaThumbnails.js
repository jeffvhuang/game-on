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
          const videoId = video.snippet.resourceId.videoId;
          return (
            <Col span={5} key={videoId}>
              <Link to={paths.VIDEO + '/' + videoId}>
                <img src={video.snippet.thumbnails.default.url} />
                <h5>{video.snippet.title}</h5>
              </Link>
            </Col>
          );
        })}
      </Row>
      <Link to={paths.HIGHLIGHTS} className="right">More ></Link>
    </div>
  );
}

export default NbaThumbnails;