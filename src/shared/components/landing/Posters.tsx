import * as React from 'react';
import { Carousel } from 'antd';

const Posters = () => {
  return (
    <div className="carousel-container">
      <Carousel dotPosition="bottom" autoplay className="carousel">
        <div><img src="https://dummyimage.com/500x320/3498DB/fff.jpg&text=Football"/></div>
        <div><img src="https://dummyimage.com/500x320/3498DB/fff.jpg&text=Basketball"/></div>
        <div><img src="https://dummyimage.com/500x320/3498DB/fff.jpg&text=Tennis"/></div>
      </Carousel>
      <Carousel dotPosition="bottom" autoplay className="carousel">
        <div><img src="https://dummyimage.com/500x320/E74C3C/fff.jpg&text=Dota2"/></div>
        <div><img src="https://dummyimage.com/500x320/E74C3C/fff.jpg&text=LeagueOfLegends"/></div>
        <div><img src="https://dummyimage.com/500x320/E74C3C/fff.jpg&text=CounterStrike"/></div>
      </Carousel>
    </div>
  );
};

export default Posters;