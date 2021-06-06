import React from 'react';

var Bars = function (props) {
  var barPercentage = props.percentage;

  //defing width for CSS styling
  var barPercentageText = `${barPercentage.toString()}%`;
  var ratingStyle = {
    width: barPercentageText
  };

  return (
    <span className="bars-container">
      <span className="bars">
      &nbsp;
      </span>
      <span className="barsoverlap" style={ratingStyle}>&nbsp;</span>
    </span>
  );
}

export default Bars;