import React from 'react';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { paths } from '../../../helpers/constants';

export default class HighlightsContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      videos: [
        "https://dummyimage.com/200x160/000/fff.jpg&text=Video",
        "https://dummyimage.com/200x160/000/fff.jpg&text=Video2",
        "https://dummyimage.com/200x160/000/fff.jpg&text=Video3",
        "https://dummyimage.com/200x160/000/fff.jpg&text=Video4"
      ]
    };
  }

  render() {
    return (
      <div className="section">
        <h2>Highlights</h2>
        <Row gutter={8} type="flex" justify="space-between" className="margin-bot">
          {this.state.videos.map((video, i) => {
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