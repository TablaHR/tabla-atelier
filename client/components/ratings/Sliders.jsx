/* eslint-disable react/prop-types */
import React from 'react';

var Sliders = function (props) {
  var rating = props.rating;

  //define position of slider for CSS styling
  //slider's center is offset by 0.46rem
  //the bars are 20rem wide in total, thus the pointer needs to be rating (from 0 to 5) times 4, minus the offset
  var pointerOffset = 0.414;
  var pointerPostition = (rating * 3.6) - pointerOffset;
  var ratingStyle = {};
  ratingStyle['marginLeft'] = `${pointerPostition.toString()}rem`;

  return (
    <span className="sliders-container">
      <span className="slider1"></span>
      <span className="sliderbreak1"></span>
      <span className="slider2"></span>
      <span className="sliderbreak2"></span>
      <span className="slider3"></span>
      <span className="slidericon" style={ratingStyle}>&#9660;</span>
    </span>
  );
}

export default Sliders;