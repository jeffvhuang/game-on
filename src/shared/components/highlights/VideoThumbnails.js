import React from 'react';
import { Row, Col } from 'antd';
import { string, array } from 'prop-types';
import { paths } from '../../../helpers/constants';
import { Link } from 'react-router-dom';

const VideoThumbnails = ({ heading, videos }) => {
  return (
    <div className="section">
      <h2>{heading}</h2>
      <Row gutter={8} type="flex" justify="space-between" className="margin-bot">
        {videos.map((video, i) => {
          return (
            <Col span={5} key={i}>
              <Link to={paths.VIDEO + '/' + '1'} ><img src={video} /></Link>
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