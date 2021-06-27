/* eslint-disable react/prop-types */
import React from 'react';
import Stars from '../shared/Stars.jsx';
import Bars from './Bars.jsx';
import Sliders from './Sliders.jsx';

var ReviewGraphics = function (props) {

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
    <React.Fragment>
      <div className="star-average">
        <div className="component-title">
        <h3>RATINGS &#38; REVIEWS</h3>
        </div>
        <div className="star-average-text">
          <p>{ratingsStats.averageRatings.toFixed(2)}</p>
        </div>
        <div className="star-average-display">
          <Stars rating={ratingsStats.averageRatings} />
        </div>
      </div>
      <div className="bars-sliders">

          <div className="recommend">
            <p>{(recommended()).toFixed()}% of reviews recommend this product</p>
          </div>
          <p className="review-link" onClick={props.handleStarFilterOn} id="display5Star">5 stars</p>
          <div id="starbar5">
            <Bars percentage={(ratingsStats[5] / ratingsStats.numberRatings) * 100} />
          </div>
          <p className="review-link" onClick={props.handleStarFilterOn} id="display4Star">4 stars</p>
          <div id="starbar4">
          <Bars percentage={(ratingsStats[4] / ratingsStats.numberRatings) * 100} />
          </div>
          <p className="review-link" onClick={props.handleStarFilterOn} id="display3Star">3 stars</p>
          <div id="starbar3">
          <Bars percentage={(ratingsStats[3] / ratingsStats.numberRatings) * 100} />
          </div>
          <p className="review-link" onClick={props.handleStarFilterOn} id="display2Star">2 stars</p>
          <div id="starbar2">
          <Bars percentage={(ratingsStats[2] / ratingsStats.numberRatings) * 100} />
          </div>
          <p className="review-link" onClick={props.handleStarFilterOn} id="display1Star">1 star</p>
          <div id="starbar1">
          <Bars percentage={(ratingsStats[1] / ratingsStats.numberRatings) * 100} />
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


          {(props.characteristics.Size !== undefined) &&
            <div className="character size">
            <p className="character-title">Size</p>
            <Sliders rating={props.characteristics.Size.value} />
            <p className="min-slide-text">Too Small</p>
            <p className="center-slide-text">Perfect</p>
            <p className="max-slide-text">Too Wide</p>
            </div>
          }

          {(props.characteristics.Width !== undefined) &&
            <div className="character width">
            <p className="character-title">Width</p>
            <Sliders rating={props.characteristics.Width.value} />
            <p className="min-slide-text">Too Narrow</p>
            <p className="center-slide-text">Perfect</p>
            <p className="max-slide-text">Too Wide</p>
            </div>
          }

          {(props.characteristics.Comfort !== undefined) &&
            <div className="character comfort">
            <p className="character-title">Comfort</p>
            <Sliders rating={props.characteristics.Comfort.value} />
            <p className="min-slide-text">Uncomfortable</p>
            <p className="center-slide-text">Ok</p>
            <p className="max-slide-text">Perfect</p>
            </div>
          }

          {(props.characteristics.Quality !== undefined) &&
            <div className="character quality">
            <p className="character-title">Quality</p>
            <Sliders rating={props.characteristics.Quality.value} />
            <p className="min-slide-text">Poor</p>
            <p className="center-slide-text">As Expected</p>
            <p className="max-slide-text">Perfect</p>
            </div>
          }

          {(props.characteristics.Length !== undefined) &&
            <div className="character length">
            <p className="character-title">Length</p>
            <Sliders rating={props.characteristics.Length.value} />
            <p className="min-slide-text">Short</p>
            <p className="center-slide-text">Perfect</p>
            <p className="max-slide-text">Long</p>
            </div>
          }

          {(props.characteristics.Fit !== undefined) &&
            <div className="character fit">
            <p className="character-title">Fit</p>
            <Sliders rating={props.characteristics.Fit.value} />
            <p className="min-slide-text">Tight</p>
            <p className="center-slide-text">Perfect</p>
            <p className="max-slide-text">Long</p>
            </div>
          }

      </div>
    </React.Fragment>
  );
}

export default ReviewGraphics;