// Import Swiper React components
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper-bundle.min.css';

class Slide extends React.Component {
  constructor(props) {
    super(props)
  }

  handleClick(e) {
    this.props.switchStyle(e.target.className[0]);
  }

  render() {
    return ( <img className={this.props.idx} src={this.props.image} style={{height: "50px", width: "50px", borderBottom: this.props.idx + "" === this.props.stylesIdx + "" ? "5px solid rgb(54,143,182)":"none"}} onClick={(e) => {this.handleClick(e)}}></img>)
  }
}

class ImageCarosel extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedIdx:0,
    }
  }


  renderAvailableStyles() {
    if (this.props.styles) {
      return this.props.styles.map((element, idx) => {
          return (
            <Slide key={idx} idx={idx} image={element.photos[0].url || "./sample.jpeg"} stylesIdx={this.props.stylesIdx} className="style-div" switchStyle={(idx) => {this.props.switchStyle(idx)}}></Slide>
          )
      });
    }
  }

  render() {
    return (
    <Swiper style={{width: "50px", maxHeight:"300px", minHeight:"200px"}} slidesPerView={3} direction={"vertical"} onSlideChange={() => console.log('slide change')} onSwiper={(swiper) => console.log(swiper)}>
      <SwiperSlide>{this.renderAvailableStyles()}</SwiperSlide>
    </Swiper>)
  }
}

export default ImageCarosel;