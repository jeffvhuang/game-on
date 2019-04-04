import React from 'react';
import { Row, Col } from 'antd';
import { string, array } from 'prop-types';
import { Link } from 'react-router-dom';

import { paths } from '../../../helpers/constants';

VideoThumbnails.propTypes = {
  heading: string.isRequired,
  thumbnails: array.isRequired
};

function VideoThumbnails({ heading, thumbnails }) {
  return (
    <div className="section">
      <h2>{heading}</h2>
      <Row gutter={8} type="flex" justify="space-between" className="margin-bot">
        {thumbnails.map((thumbnail, i) => {
          return (
            <Col span={5} key={i}>
              <Link key={i} to={paths.VIDEO + '/' + thumbnail.videoId}>
                <img src={thumbnail.imgSrc} />
                <h5>{thumbnail.title}</h5>
              </Link>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default VideoThumbnails;