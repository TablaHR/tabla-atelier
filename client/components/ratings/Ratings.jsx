/* eslint-disable react/prop-types */
import React from 'react';
import ReactDOM from 'react-dom';
import './ratings.css'
import ReviewGraphics from './ReviewGraphics.jsx';
import ReviewList from './ReviewList.jsx';
import $ from 'jquery';

import text, {CText, CTextDemoView} from '../shared/CText.jsx';
import { getActiveProductInfo, getActiveProductStyles } from '../../serverHelpers/ratingsServerHelper.js'

class Ratings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: '',
      reviews: [],
      sortType: 'relevance', //options are relevance, date, helpfulness; default is relevance
      reviewListEnd: 1,
      addReviewRating: 0,
      recommended: {},
      ratings: {},
      characteristics: {},
      characteristicsSize: 0,
      characteristicsWidth: 0,
      characteristicsComfort: 0,
      characteristicsQuality: 0,
      characteristicsLength: 0,
      characteristicsFit: 0,
      reviewBodyTextCharacterCount: 0,
      numberImages: 0,
      imageFile1URL: '',
      imageFile2URL: '',
      imageFile3URL: '',
      imageFile4URL: '',
      imageFile5URL: '',
      sortText: '',
      starFilterOn: false,
      display5Star: true,
      display4Star: true,
      display3Star: true,
      display2Star: true,
      display1Star: true
    };
    this.sortReviews = this.sortReviews.bind(this);
    this.moreReviews = this.moreReviews.bind(this);
    this.fetchReviews = this.fetchReviews.bind(this);
    this.changeSort = this.changeSort.bind(this);
    this.changeAddReviewRating = this.changeAddReviewRating.bind(this);
    this.addReviewToggleModal = this.addReviewToggleModal.bind(this);
    this.addReviewHandleSubmit = this.addReviewHandleSubmit.bind(this);
    this.handleRadioCharacteristics = this.handleRadioCharacteristics.bind(this);
    this.handleReviewBodyText = this.handleReviewBodyText.bind(this);
    this.handleFiles = this.handleFiles.bind(this);
    this.updateImageState = this.updateImageState.bind(this);
    this.handleHelpful = this.handleHelpful.bind(this);
    this.handleReport = this.handleReport.bind(this);
    this.handleSearchReviews = this.handleSearchReviews.bind(this);
    this.handleStarFilterOn = this.handleStarFilterOn.bind(this);
    this.handleStarFilterOff = this.handleStarFilterOff.bind(this);

  }

  addReviewToggleModal () {
    var modal = document.querySelector("#modal");
    var modalOverlay = document.querySelector("#modal-overlay");
    modal.classList.toggle("closed");
    modalOverlay.classList.toggle("closed");
  }

  changeAddReviewRating (event) {
    if (event.target.className === 'star1') {
      this.setState({addReviewRating: 1});
    } else if (event.target.className === 'star2') {
      this.setState({addReviewRating: 2});
    } else if (event.target.className === 'star3') {
      this.setState({addReviewRating: 3});
    } else if (event.target.className === 'star4') {
      this.setState({addReviewRating: 4});
    } else if (event.target.className === 'star5') {
      this.setState({addReviewRating: 5});
    }
  }

  addReviewHandleSubmit(event) {
    this.addReviewToggleModal();
    event.preventDefault();
    console.log(event);
    var reviewForm = {};
    reviewForm['product_id'] = this.props.id;
    reviewForm['rating'] = this.state.addReviewRating;
    reviewForm['summary'] = event.target.elements.reviewSummary.value;
    reviewForm['body'] = event.target.elements.reviewBody.value;

    if (event.target.elements.recommend.value === 'yes') {
      reviewForm['recommend'] = true;
    } else {
      reviewForm['recommend'] = false;
    }

    reviewForm['name'] = event.target.elements.nickname.value;
    reviewForm['email'] = event.target.elements.email.value;

    var photos = [];
    for (var photo = 1; photo <= this.state.numberImages; photo++) {
      var photoObject = {};
      photoObject['id'] = photo;
      photoObject['url'] = this.state[`imageFile${photo}URL`];
      photos.push(photoObject);
    }

    reviewForm['photos'] = photos;

    var characteristicsObj = {};
    for (var key in this.state.characteristics) {
      var name = key[0].toLowerCase() + key.slice(1);
      characteristicsObj[this.state.characteristics[key].id] = Number(event.target.elements[name].value);
    }

    reviewForm['characteristics'] = characteristicsObj;

    console.log(reviewForm);

    var sendReviewForm = JSON.stringify(reviewForm);
    var item = reviewForm['product_id'].toString() + 'review';

    var successfulAddReview = () => {
      localStorage.setItem(item, 'reviewed');
    };

    if (localStorage.getItem(item) === null) {
      $.ajax({
        type: "POST",
        url: 'http://127.0.0.1:3000/addreview',
        processData: false,
        contentType: 'application/json',
        data: sendReviewForm,
        success: successfulAddReview,
        dataType: 'json'
      });
    }
  }

  sortReviews(reviewsArray, sortType = this.state.sortType) {
    if (reviewsArray !== undefined && sortType === 'helpfulness') {
      var sortedReviews = reviewsArray.slice();
      sortedReviews.sort(function (a, b) {
        return a.helpfulness - b.helpfulness;
      });
      sortedReviews.reverse();
      return sortedReviews;
    }
    else if (reviewsArray !== undefined && sortType === 'date') {
      var sortedReviews = reviewsArray.slice();
      sortedReviews.sort(function (a, b) {
        return ((Date.now() - Date.parse(a.date)) - (Date.now() - Date.parse(b.date))) / 2592000000;
      });
      return sortedReviews;
    }
    else if (reviewsArray !== undefined && sortType === 'relevance') {
      var sortedReviews = reviewsArray.slice();
      sortedReviews.sort(function (a, b) {
        return (24.8492 - (5.22794 * Math.log(1.18379 - 5.18465 * (((Date.now() - Date.parse(a.date)) - (Date.now() - Date.parse(b.date))) / 2592000000)))) * (a.helpfulness - b.helpfulness);
      });
      sortedReviews.reverse();
      return sortedReviews;
    }
  }

  changeSort(event) {
    var newSort = event.target.value;
    var sorted = this.sortReviews(this.state.reviews, newSort);
    if (newSort === 'relevance') {
      this.setState({
        reviews: sorted,
        sortType: 'relevance'});
    } else if (newSort === 'helpfulness') {
      this.setState({
        reviews: sorted,
        sortType: 'helpfulness'});
    } else if (newSort === 'date') {
      this.setState({
        reviews: sorted,
        sortType: 'date'});
    }
  }

  moreReviews() {
    var lengthList = this.state.reviewListEnd + 2;
    this.setState({reviewListEnd: lengthList});
  }

  fetchReviews(id) {
    var successfulFetch = (response) => {
      var fetchAndSort = this.sortReviews(response.results);
      this.setState({reviews: fetchAndSort, productName: response.name, ratings: response.ratings, recommended: response.recommended, characteristics: response.characteristics});
    };
    var idData = JSON.stringify({id: this.props.id});

    $.ajax({
      url: `${process.env.EXPRESS_SERVER}/reviewsproductmeta`,
      type: 'POST',
      data: idData,
      success: successfulFetch,
      contentType: 'application/json',
      processData: false
    });
  }

  handleRadioCharacteristics(event) {

    var name = `characteristics${event.target.name[0].toUpperCase()}${event.target.name.slice(1)}`;
    var characteristic = {};
    characteristic[name] = Number(event.target.value);
    this.setState(characteristic);
  }

  handleReviewBodyText(event) {

    this.setState({reviewBodyTextCharacterCount: event.target.textLength});
  }

  handleFiles(event) {
    var thumbnail = document.getElementById("image-file-1-thumb");

    if (!event.target.files.length) {
      thumbnail.innerHTML = "<p>No files selected!</p>";
    } else {
      var reviewImage = document.getElementById(event.target.id).files[0];

      var multipart = new FormData();
      multipart.append('image', reviewImage, event.target.files[0].name);

      $.ajax({
        url: `${process.env.EXPRESS_SERVER}/uploadreviewimage`,
        type: 'POST',
        data: multipart,
        success: this.updateImageState,
        contentType: false,
        processData: false
      })
        .done(function () {
          var thumbnails = document.getElementById(`${event.target.id}-thumb`);
          thumbnails.innerHTML = "";
          const list = document.createElement("ul");
          thumbnails.appendChild(list);
          for (let i = 0; i < event.target.files.length; i++) {
            const li = document.createElement("li");
            list.appendChild(li);

            const img = document.createElement("img");
            img.src = URL.createObjectURL(event.target.files[i]);
            img.height = 60;
            img.onload = function() {
              URL.revokeObjectURL(this.src);
            }
            li.appendChild(img);
            const info = document.createElement("span");
            info.innerHTML = event.target.files[i].name + ": " + event.target.files[i].size + " bytes";
            li.appendChild(info);
          }
        })
        .fail(function () {
          console.log('AJAX POST request for add review image has failed.');
        });
    }
  }

  updateImageState(response) {

    var currentImageNumber = this.state.numberImages + 1;
    var updateImageData = {numberImages: currentImageNumber};
    updateImageData[`imageFile${currentImageNumber}URL`] = response.postedURL;

    this.setState(updateImageData);


  }

  handleHelpful(event) {
    event.preventDefault();
    console.log(event);
    var item = event.target.classList[1] + 'helpful';
    let helpful = localStorage.getItem(item);


    if (helpful !== null) {

      var successfulAddHelpful = () => {
        localStorage.setItem(item, 'helpful');
      }

      $.ajax({
        type: "POST",
        url: 'http://127.0.0.1:3000/addhelpful',
        processData: false,
        contentType: 'application/json',
        data: JSON.stringify({review_id: event.target.classList[1]}),
        success: successfulAddHelpful,
        dataType: 'json'
      });
    }
  }

  handleReport(event) {
    event.preventDefault();
    var item = event.target.classList[1] + 'report';
    let helpful = localStorage.getItem(item);


    if (helpful !== null) {

      var successfulAddReport = () => {
        localStorage.setItem(item, 'report');
      }

      $.ajax({
        type: "POST",
        url: 'http://127.0.0.1:3000/addreport',
        processData: false,
        contentType: 'application/json',
        data: JSON.stringify({review_id: event.target.classList[1]}),
        success: successfulAddReport,
        dataType: 'json'
      });
    }
  }

  handleSearchReviews(event) {
    this.setState({sortText: event.target.value});
  }

  handleStarFilterOn(event) {
    event.preventDefault();
    if (this.state.starFilterOn === false) {
      var filter = {starFilterOn: true, display5Star: false, display4Star: false, display3Star: false, display2Star: false, display1Star: false};
      filter[event.target.id] = true;
      this.setState(filter);
    } else {
      var filter = {};
      filter[event.target.id] = true;
      this.setState(filter);
    }
  }

  handleStarFilterOff(event) {
    event.preventDefault();
    this.setState({starFilterOn: false, display5Star: true, display4Star: true, display3Star: true, display2Star: true, display1Star: true});
  }

  render() {
    return (
      <div className="reviews">
        <ReviewGraphics ratings={this.state.ratings} recommended={this.state.recommended} characteristics={this.state.characteristics} display5Star={this.state.display5Star} display4Star={this.state.display4Star} display3Star={this.state.display3Star} display2Star={this.state.display2Star} display1Star={this.state.display1Star} starFilterOn={this.state.starFilterOn} handleStarFilterOn={this.handleStarFilterOn} handleStarFilterOff={this.handleStarFilterOff} />
        <ReviewList reviews={this.state.reviews} sortType={this.state.sortType} reviewListEnd={this.state.reviewListEnd} moreReviews={this.moreReviews} changeSort={this.changeSort} productName={this.state.productName} addReviewRating={this.state.addReviewRating} changeAddReviewRating={this.changeAddReviewRating} addReviewToggleModal={this.addReviewToggleModal} addReviewHandleSubmit={this.addReviewHandleSubmit} handleRadioCharacteristics={this.handleRadioCharacteristics} characteristicsSize={this.state.characteristicsSize} characteristicsWidth={this.state.characteristicsWidth} characteristicsComfort={this.state.characteristicsComfort} characteristicsQuality={this.state.characteristicsQuality} characteristicsLength={this.state.characteristicsLength} characteristicsFit={this.state.characteristicsFit} characteristics={this.state.characteristics}
        handleReviewBodyText={this.handleReviewBodyText} reviewBodyTextCharacterCount={this.state.reviewBodyTextCharacterCount} handleFiles={this.handleFiles} numberImages={this.state.numberImages} handleHelpful={this.handleHelpful} handleReport={this.handleReport} sortText={this.state.sortText} display5Star={this.state.display5Star} display4Star={this.state.display4Star} display3Star={this.state.display3Star} display2Star={this.state.display2Star} display1Star={this.state.display1Star} handleSearchReviews={this.handleSearchReviews} />
      </div>
    )
  }

  componentDidMount() {
    this.fetchReviews(this.props.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.setState({productName: '',
      reviews: [],
      addReviewRating: 0,
      recommend: {},
      characteristics: {},
      characteristicsSize: 0,
      characteristicsWidth: 0,
      characteristicsComfort: 0,
      characteristicsQuality: 0,
      characteristicsLength: 0,
      characteristicsFit: 0,
      reviewBodyTextCharacterCount: 0,
      numberImages: 0,
      imageFile1URL: '',
      imageFile2URL: '',
      imageFile3URL: '',
      imageFile4URL: '',
      imageFile5URL: ''
    }, () => {
      this.fetchReviews(this.props.id);
    });
    }
  }
}

export default Ratings;