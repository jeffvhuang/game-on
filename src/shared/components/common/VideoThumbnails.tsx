import * as React from 'react';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';

import { paths } from '../../../helpers/constants';

interface Props {
  heading: string,
  thumbnails: any[],
  showCount?: number,
  showMore?: boolean,
  showMoreLink?: string
};

function VideoThumbnails({ heading, thumbnails, showCount, showMore = false, showMoreLink }: Props) {
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
                <img src={thumbnail.imgSrc} className="thumbnail" />
                <h5>{thumbnail.title}</h5>
              </Link>
            </Col>
          );
        })}
      </Row>
      {/* {showMore && 
        <Link to={showMoreLink} className="right">
          More >
        </Link>
      } */}
    </div>
  );
}

export default VideoThumbnails;