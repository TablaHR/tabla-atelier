import React from 'react';
import Stars from '../shared/Stars.jsx';
import Bars from './Bars.jsx';
import Sliders from './Sliders.jsx';

var ReviewGraphics = function (props) {
  console.log(props);
  var ratingsBreakdown = () => {
    var totalRatings = 0;
    var numberRatings = 0;
    var stars = {};
    for (var star = 1; star <= 5; star++) {
      var value = 0;
      if (props.ratings[star] !== undefined) {
        value = props.ratings[star];
      }
      stars[star] = value;
      totalRatings = (star * Number(value)) + totalRatings;
      numberRatings = Number(value) + numberRatings;
    }
    stars.totalRatings= totalRatings;
    stars.numberRatings = numberRatings;
    stars.averageRatings = totalRatings / numberRatings;
    console.log(stars);
    return stars;
  };

  var ratingsStats = ratingsBreakdown();

  var recommended = () => {
    var recommendedObj = {};
    if (props.recommended.true === undefined) {
      recommendedObj.true = 0;
    } else {
      recommendedObj.true = props.recommended.true;
    }
    if (props.recommended.false === undefined) {
      recommendedObj.false = 0;
    } else {
      recommendedObj.false = props.recommended.false;
    }
    return (Number(recommendedObj.true) / (Number(recommendedObj.true) + Number(recommendedObj.false))) * 100;
  };

  return (
    <div className="review-graphics">
      <div className="star-average">
        <h3>Ratings &#38; Reviews</h3>
        <h4>{ratingsStats.averageRatings}</h4>
        <Stars rating={ratingsStats.averageRatings} />
      </div>
      <div className="bars-sliders">
        <div className="review-bars">
          <div className="recommend">
            <h3>{recommended()}% of reviews recommend this product</h3>
          </div>
          <span className="review-link" onClick={props.handleStarFilterOn} id="display5Star">5 stars</span><Bars percentage={(ratingsStats[5] / ratingsStats.numberRatings) * 100} />
          <span className="review-link" onClick={props.handleStarFilterOn} id="display4Star">4 stars</span><Bars percentage={(ratingsStats[4] / ratingsStats.numberRatings) * 100} />
          <span className="review-link" onClick={props.handleStarFilterOn} id="display3Star">3 stars</span><Bars percentage={(ratingsStats[3] / ratingsStats.numberRatings) * 100} />
          <span className="review-link" onClick={props.handleStarFilterOn} id="display2Star">2 stars</span><Bars percentage={(ratingsStats[2] / ratingsStats.numberRatings) * 100} />
          <span className="review-link" onClick={props.handleStarFilterOn} id="display1Star">1 star</span><Bars percentage={(ratingsStats[1] / ratingsStats.numberRatings) * 100} />
        </div>
        <div className="star-sorting">
          {(props.starFilterOn) &&
            <div>
            Displaying reviews with:
            {((props.display5Star) && (props.starFilterOn)) &&
              <div className="star-display">
                5 Stars
              </div>
            }
            {((props.display4Star) && (props.starFilterOn)) &&
              <div className="star-sorting-display">
                4 Stars
              </div>
            }
            {((props.display3Star) && (props.starFilterOn)) &&
              <div className="star-sorting-display">
                3 Stars
              </div>
            }
            {((props.display2Star) && (props.starFilterOn)) &&
              <div className="star-sorting-display">
                2 Stars
              </div>
            }
            {((props.display1Star) && (props.starFilterOn)) &&
              <div className="star-sorting-display">
                1 Star
              </div>
            }
            <button type="reset" onClick={props.handleStarFilterOff}>Turn off Star Filtering</button>
            </div>
          }
        </div>
        <div className="review-sliders">
          {(props.characteristics.Size !== undefined) &&
            <div>
            <span>Size</span>
            <Sliders rating={props.characteristics.Size.value} />
            <span className="min-slide-text">Too Small</span>
            <span className="center-slide-text">Perfect</span>
            <span className="max-slide-text">Too Wide</span>
            </div>
          }
          {(props.characteristics.Width !== undefined) &&
            <div>
            <span>Width</span>
            <Sliders rating={props.characteristics.Width.value} />
            <span className="min-slide-text">Too Narrow</span>
            <span className="center-slide-text">Perfect</span>
            <span className="max-slide-text">Too Wide</span>
            </div>
          }
          {(props.characteristics.Comfort !== undefined) &&
            <div>
            <span>Comfort</span>
            <Sliders rating={props.characteristics.Comfort.value} />
            <span className="min-slide-text">Uncomfortable</span>
            <span className="center-slide-text">Ok</span>
            <span className="max-slide-text">Perfect</span>
            </div>
          }
          {(props.characteristics.Quality !== undefined) &&
            <div>
            <span>Quality</span>
            <Sliders rating={props.characteristics.Quality.value} />
            <span className="min-slide-text">Poor</span>
            <span className="center-slide-text">As Expected</span>
            <span className="max-slide-text">Perfect</span>
            </div>
          }
          {(props.characteristics.Length !== undefined) &&
            <div>
            <span>Length</span>
            <Sliders rating={props.characteristics.Length.value} />
            <span className="min-slide-text">Short</span>
            <span className="center-slide-text">Perfect</span>
            <span className="max-slide-text">Long</span>
            </div>
          }
          {(props.characteristics.Fit !== undefined) &&
            <div>
            <span>Fit</span>
            <Sliders rating={props.characteristics.Fit.value} />
            <span className="min-slide-text">Tight</span>
            <span className="center-slide-text">Perfect</span>
            <span className="max-slide-text">Long</span>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default ReviewGraphics;