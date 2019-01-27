import React from 'react';
import { Row, Col } from 'antd';
import { string, array } from 'prop-types';

const VideoThumbnails = ({ heading, videos }) => {
  return (
    <div className="section">
      <h2>{heading}</h2>
      <Row gutter={8} type="flex" justify="space-between" className="margin-bot">
        {videos.map((video, i) => {
          return (
            <Col span={5} key={i}>
              <img src={video} />
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

VideoThumbnails.propTypes = {
  heading: string.isRequired,
  videos: array.isRequired
};

export default VideoThumbnails;