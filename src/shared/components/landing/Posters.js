import React from 'react';
import { Carousel } from 'antd';

const Posters = () => {
  return (
    <div className="carousel-container">
      <Carousel vertical autoplay className="carousel">
        <div><img src="https://via.placeholder.com/600x320/3498DB/FFFFFF?text=Football"/></div>
        <div><img src="https://via.placeholder.com/600x320/3498DB/FFFFFF?text=Basketball"/></div>
        <div><img src="https://via.placeholder.com/600x320/3498DB/FFFFFF?text=Tennis"/></div>
      </Carousel>
      <Carousel vertical autoplay className="carousel">
        <div><img src="https://via.placeholder.com/600x320/E74C3C/FFFFFF?text=Dota2"/></div>
        <div><img src="https://via.placeholder.com/600x320/E74C3C/FFFFFF?text=LeagueOfLegends"/></div>
        <div><img src="https://via.placeholder.com/600x320/E74C3C/FFFFFF?text=CounterStrike"/></div>
      </Carousel>
    </div>
  );
};

export default Posters;