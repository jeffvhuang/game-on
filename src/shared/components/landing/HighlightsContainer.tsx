import * as React from 'react';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';

import { paths } from '../../../helpers/constants';

interface Props {
  videos: any[];
};

class HighlightsContainer extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="section">
        <h2>Highlights</h2>
        <Row gutter={8} type="flex" justify="space-between" className="margin-bot">
          {this.props.videos.map((video, i) => {
            return (
              <Col span={5} key={i}>
                <img src={video} />
              </Col>
            );
          })}
        </Row>
        <Link to={paths.HIGHLIGHTS} className="right">More ></Link>
      </div>
    );
  }
}

export default HighlightsContainer;
