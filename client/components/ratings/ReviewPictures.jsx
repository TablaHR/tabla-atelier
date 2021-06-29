/* eslint-disable react/prop-types */
import React from 'react';

var ReviewPictures = function (props) {
  console.log(props.photos);
  var pictures = props.photos.map((photo) => {
      return (
        <img className="review-photo"
        key={`review-photo-${photo.id}`} src={photo.url} onClick={(e) => props.handleReviewPhotoClick(photo.url)}/>

      );
  });

  return (

    <React.Fragment>
    <div className="review-photos">
      {pictures}
    </div>
    <div className="review-photos-modal-overlay review-photos-closed" id="review-photos-modal-overlay"></div>

    <div className="review-photos-modal review-photos-closed" id="review-photos-modal">
      <button className="review-photos-close-button" id="review-photos-close-button" onClick={props.handleReviewPhotoClick}>&times;</button>
      <div className="review-photos-modal-body">
      <img src={props.photoclickedURL} onClick={props.handleReviewPhotoClick}/>
    </div>
    </div>
    </React.Fragment>

  );

}
export default ReviewPictures;