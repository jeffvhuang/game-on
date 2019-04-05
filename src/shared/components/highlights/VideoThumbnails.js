import React from 'react';
import { Row, Col } from 'antd';
import { string, array, number, bool } from 'prop-types';
import { Link } from 'react-router-dom';

import { paths } from '../../../helpers/constants';

VideoThumbnails.propTypes = {
  heading: string.isRequired,
  thumbnails: array.isRequired,
  showCount: number,
  showMore: bool
};

function VideoThumbnails({ heading, thumbnails, showCount, showMore = false }) {
  let shownThumbnails;
  if (showCount && showCount < thumbnails.length) shownThumbnails = thumbnails.slice(0, showCount);
  else shownThumbnails = thumbnails;

  return (
    <div className="section">
      <h2>{heading}</h2>
      <Row gutter={8} type="flex" justify="space-between" className="margin-bot">
        {shownThumbnails.map((thumbnail, i) => {
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
      {showMore && 
        <Link to={paths.HIGHLIGHTS + '/' + heading.toLowerCase()} className="right">
          More >
        </Link>
      }
    </div>
  );
}

export default VideoThumbnails;