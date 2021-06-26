import React from 'react';
import Stars from '../shared/Stars.jsx';
import ReviewPictures from './ReviewPictures.jsx';

var ReviewTile = function (props) {
  console.log(props.review);
  var titlewrap = false;
  var wrapCharacter = 0;
  var reviewDate = new Date(props.review.date);
  var dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  if (props.review.summary.length > 60) {
    titlewrap = true;
    for (var i = 59; i >= 0; i--) {
      if (props.review.summary[i] === ' ') {
        wrapCharacter = i;
        break;
      }
    }
  }
  return (
    <div className="reviewtile">
      {titlewrap
        ? <h3 className="review-title bold">{props.review.summary.slice(0, wrapCharacter)}...</h3>
        : <h3 className="review-title bold">{props.review.summary}</h3>
      }
      {titlewrap === true &&
        <p className="review-titlewrap">...{props.review.summary.slice(wrapCharacter + 1)}</p>
      }
      <div className="review-stars">
        <Stars rating={props.review.rating} />
      </div>
      <p className="review-userdate">{props.review.reviewer_name}, {reviewDate.toLocaleDateString('en-US', dateOptions)}</p>
      <p className="review-body">{props.review.body}</p>
      {props.review.photos.length > 0 &&
        <ReviewPictures photos={props.review.photos} />
      }
      {props.review.recommend === true &&
        <p className="review-recommend">&#10003; I recommend this product</p>
      }
      {props.review.response !== null &&
        <div className="review-response">
          <h4>Response:</h4>
          <p>{props.review.response}</p>
        </div>
      }
      <p className="review-helpfulness">Helpful? <span className={`review-link ${props.review.review_id}`} onClick={props.handleHelpful}>Yes</span>&nbsp;({props.review.helpfulness})&nbsp;&nbsp;|&nbsp;&nbsp;<span className={`review-link ${props.review.review_id}`} onClick={props.handleReport}>Report</span></p>
    </div>
  );
}

export default ReviewTile;