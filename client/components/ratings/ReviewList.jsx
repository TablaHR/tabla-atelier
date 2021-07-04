/* eslint-disable react/prop-types */
import React from 'react';
import ReactDOM from 'react-dom';
import ReviewTile from './ReviewTile.jsx';
import Stars from '../shared/Stars.jsx';
import CButton from '../shared/CButton.jsx';

var reviewCharacteristics = {
  size: ['',
    'A size too small',
    '½ a size too small',
    'Perfect',
    '½ a size too big',
    'A size too wide'
  ],
  width: ['',
    'Too narrow',
    'Slightly narrow',
    'Perfect',
    'Slightly wide',
    'Too wide'
  ],
  comfort: ['',
    'Uncomfortable',
    'Slightly uncomfortable',
    'Ok',
    'Comfortable',
    'Perfect'
  ],
  quality: ['',
    'Poor',
    'Below average',
    'What I expected',
    'Pretty great',
    'Perfect'
  ],
  length: ['',
    'Runs Short',
    'Runs slightly short',
    'Perfect',
    'Runs slightly long',
    'Runs long'
  ],
  fit: ['',
    'Runs tight',
    'Runs slightly tight',
    'Perfect',
    'Runs slightly long',
    'Runs long'
  ]
}

var ReviewList = function (props) {
    var reviewDisplayCounter = 0;
    return (
      <React.Fragment>
        <div className="review-sorting-search">
          <div className="review-sorting">
            {(props.reviews.length >= 1) &&
            <h4>{props.reviews.length} review{(props.reviews.length > 1) && <span>s</span>}, sorted by <span className="review-sort-type"><select name="sortType" onChange={props.changeSort}>
            <option value="relevance" defaultValue>relevance</option>
            <option value="date">date</option>
            <option value="helpfulness">helpfulness</option>
          </select></span></h4>
            }
          </div>

          <form>
            <div className="review-search">
              <input className="review-search-text" type="text" placeholder="Search reviews by keyword...." onChange={props.handleSearchReviews}></input>
              <div className="review-search-button">
                <CButton Text={'SEARCH'} Type={"reset"} aria={'Search Text of Reviews Button'}/>
              </div>
            </div>
          </form>
        </div>
        <div className="review-listings">

        {(props.reviews.length > 0) &&
        props.reviews.map((review, index) => {
          if (
            (index >= 0)
            && (reviewDisplayCounter <= props.reviewListEnd)
            && (props[`display${review.rating}Star`])
            && (review.body.toLowerCase().includes(props.sortText.toLowerCase()))
            ) {
            reviewDisplayCounter++;
            return (
              <div className="review-list" key={review.review_id}>
              <ReviewTile review={review} handleHelpful={props.handleHelpful} handleReport={props.handleReport} handleReviewPhotoClick={props.handleReviewPhotoClick} photoclickedURL={props.photoclickedURL} />
              </div>
            );
          }
        })
        }
        </div>
        <div className="review-controls">
          <div className="review-more-reviews">
            <CButton click={() => {props.moreReviews()}} Text={'MORE REVIEWS'} aria={'Display More Reviews Button'} />
          </div>

        <div className="modal-overlay closed" id="modal-overlay"></div>

        <div className="modal closed" id="modal">
          <button className="close-button" id="close-button" onClick={props.addReviewToggleModal}>&times;</button>
        <div className="modal-body">
          <div className="add-review-heading">
            <h1>Write Your Review</h1>
          </div>
          <div className="add-review-subheading">
            <h2>About the {props.productName}</h2>
          </div>
          <div className="add-review-instructions">
            <p>Please describe your experience with the product below. Required fields are marked with an asterisk (*).</p>
          </div>

          <div className="add-review-overall-rating" onClick={props.changeAddReviewRating}>
            <label>Overall Rating *&nbsp;
            <Stars rating={props.addReviewRating} />
            {(props.addReviewRating) === 1 &&
              <span>&nbsp;Poor</span>
            }
            {(props.addReviewRating) === 2 &&
              <span>&nbsp;Fair</span>
            }
            {(props.addReviewRating) === 3 &&
              <span>&nbsp;Average</span>
            }
            {(props.addReviewRating) === 4 &&
              <span>&nbsp;Good</span>
            }
            {(props.addReviewRating) === 5 &&
              <span>&nbsp;Great</span>
            }
            </label>
          </div>
          <form className="add-review-form" onSubmit={props.addReviewHandleSubmit}>
            <div className="add-review-recommend">
              <label>
                Do you recommend this product? *
                <div>
                  <input type="radio" id="add-review-recommend-yes" name="recommend" value="yes" required />
                  <label htmlFor="add-review-recommend">Yes.</label>
                </div>
                <div>
                  <input type="radio" id="add-review-recommend-no" name="recommend" value="no" />
                  <label htmlFor="add-review-recommend">No.</label>
                </div>

              </label>
            </div>
            <div className="add-review-characteristics">

              <label className="characteristics-title">
                Characteristics *
              </label>
              {(props.characteristics.Size !== undefined) &&
              <div className="characteristics size">
                <div className="characteristics-section">
                  <h4>Size</h4>
                </div>
                <div className="characteristics-selection">
                <h4>{reviewCharacteristics.size[props.characteristicsSize]}</h4>
                </div>
                <div className="characteristics-buttons">
                  <input type="radio" id="add-review-characteristics-size-1" name="size" value="1" onChange={props.handleRadioCharacteristics} required />

                  <input type="radio" id="add-review-characteristics-size-2" name="size" value="2" onChange={props.handleRadioCharacteristics} required />

                  <input type="radio" id="add-review-characteristics-size-3" name="size" value="3" onChange={props.handleRadioCharacteristics} required />

                  <input type="radio" id="add-review-characteristics-size-4" name="size" value="4" onChange={props.handleRadioCharacteristics} required />

                  <input type="radio" id="add-review-characteristics-size-5" name="size" value="5" onChange={props.handleRadioCharacteristics} required />
                </div>
                <div className="characteristics-lowest-meaning">
                <h4>{reviewCharacteristics.size[1]}</h4>
                </div>
                <div className="characteristics-highest-meaning">
                <h4>{reviewCharacteristics.size[5]}</h4>
                </div>
              </div>
              }
              {(props.characteristics.Width !== undefined) &&
              <div className="characteristics width">
              <div className="characteristics-section">
                  <h4>Width</h4>
                </div>
                <div className="characteristics-selection">
                <h4>{reviewCharacteristics.width[props.characteristicsWidth]}</h4>
                </div>
                <div className="characteristics-buttons">
                  <input type="radio" id="add-review-characteristics-width-1" name="width" value="1" onChange={props.handleRadioCharacteristics} required />

                  <input type="radio" id="add-review-characteristics-width-2" name="width" value="2" onChange={props.handleRadioCharacteristics} required />

                  <input type="radio" id="add-review-characteristics-width-3" name="width" value="3" onChange={props.handleRadioCharacteristics} required />

                  <input type="radio" id="add-review-characteristics-width-4" name="width" value="4" onChange={props.handleRadioCharacteristics} required />

                  <input type="radio" id="add-review-characteristics-width-5" name="width" value="5" onChange={props.handleRadioCharacteristics} required />
                </div>
                <div className="characteristics-lowest-meaning">
                <h4>{reviewCharacteristics.width[1]}</h4>
                </div>
                <div className="characteristics-highest-meaning">
                <h4>{reviewCharacteristics.width[5]}</h4>
                </div>
              </div>
              }
              {(props.characteristics.Comfort !== undefined) &&
              <div className="characteristics comfort">
                <div className="characteristics-section">
                  <h4>Comfort</h4>
                </div>
                <div className="characteristics-selection">
                <h4>{reviewCharacteristics.comfort[props.characteristicsComfort]}</h4>
                </div>
                <div className="characteristics-buttons">
                  <input type="radio" id="add-review-characteristics-comfort-1" name="comfort" value="1" onChange={props.handleRadioCharacteristics} required />

                  <input type="radio" id="add-review-characteristics-comfort-2" name="comfort" value="2" onChange={props.handleRadioCharacteristics} required />

                  <input type="radio" id="add-review-characteristics-comfort-3" name="comfort" value="3" onChange={props.handleRadioCharacteristics} required />

                  <input type="radio" id="add-review-characteristics-comfort-4" name="comfort" value="4" onChange={props.handleRadioCharacteristics} required />

                  <input type="radio" id="add-review-characteristics-comfort-5" name="comfort" value="5" onChange={props.handleRadioCharacteristics} required />
                </div>
                <div className="characteristics-lowest-meaning">
                <h4>{reviewCharacteristics.comfort[1]}</h4>
                </div>
                <div className="characteristics-highest-meaning">
                <h4>{reviewCharacteristics.comfort[5]}</h4>
                </div>
              </div>
              }
              {(props.characteristics.Quality !== undefined) &&
              <div className="characteristics quality">
                <div className="characteristics-section">
                  <h4>Quality</h4>
                </div>
                <div className="characteristics-selection">
                <h4>{reviewCharacteristics.quality[props.characteristicsQuality]}</h4>
                </div>
                <div className="characteristics-buttons">
                  <input type="radio" id="add-review-characteristics-quality-1" name="quality" value="1" onChange={props.handleRadioCharacteristics} required />

                  <input type="radio" id="add-review-characteristics-quality-2" name="quality" value="2" onChange={props.handleRadioCharacteristics} required />

                  <input type="radio" id="add-review-characteristics-quality-3" name="quality" value="3" onChange={props.handleRadioCharacteristics} required />

                  <input type="radio" id="add-review-characteristics-quality-4" name="quality" value="4" onChange={props.handleRadioCharacteristics} required />

                  <input type="radio" id="add-review-characteristics-quality-5" name="quality" value="5" onChange={props.handleRadioCharacteristics} required />
                </div>
                <div className="characteristics-lowest-meaning">
                <h4>{reviewCharacteristics.quality[1]}</h4>
                </div>
                <div className="characteristics-highest-meaning">
                <h4>{reviewCharacteristics.quality[5]}</h4>
                </div>
              </div>
              }
              {(props.characteristics.Length !== undefined) &&
              <div className="characteristics length">
              <div className="characteristics-section">
                  <h4>Length</h4>
                </div>
                <div className="characteristics-selection">
                <h4>{reviewCharacteristics.length[props.characteristicsLength]}</h4>
                </div>
                <div className="characteristics-buttons">
                  <input type="radio" id="add-review-characteristics-length-1" name="length" value="1" onChange={props.handleRadioCharacteristics} required />

                  <input type="radio" id="add-review-characteristics-length-2" name="length" value="2" onChange={props.handleRadioCharacteristics} required />

                  <input type="radio" id="add-review-characteristics-length-3" name="length" value="3" onChange={props.handleRadioCharacteristics} required />

                  <input type="radio" id="add-review-characteristics-length-4" name="length" value="4" onChange={props.handleRadioCharacteristics} required />

                  <input type="radio" id="add-review-characteristics-length-5" name="length" value="5" onChange={props.handleRadioCharacteristics} required />
                </div>
                <div className="characteristics-lowest-meaning">
                <h4>{reviewCharacteristics.length[1]}</h4>
                </div>
                <div className="characteristics-highest-meaning">
                <h4>{reviewCharacteristics.length[5]}</h4>
                </div>
              </div>
              }
              {(props.characteristics.Fit !== undefined) &&
              <div className="characteristics fit">
                <div className="characteristics-section">
                  <h4>Fit</h4>
                </div>
                <div className="characteristics-selection">
                <h4>{reviewCharacteristics.fit[props.characteristicsFit]}</h4>
                </div>
                <div className="characteristics-buttons">
                  <input type="radio" id="add-review-characteristics-fit-1" name="fit" value="1" onChange={props.handleRadioCharacteristics} required />

                  <input type="radio" id="add-review-characteristics-fit-2" name="fit" value="2" onChange={props.handleRadioCharacteristics} required />

                  <input type="radio" id="add-review-characteristics-fit-3" name="fit" value="3" onChange={props.handleRadioCharacteristics} required />

                  <input type="radio" id="add-review-characteristics-fit-4" name="fit" value="4" onChange={props.handleRadioCharacteristics} required />

                  <input type="radio" id="add-review-characteristics-fit-5" name="fit" value="5" onChange={props.handleRadioCharacteristics} required />
                </div>
                <div className="characteristics-lowest-meaning">
                <h4>{reviewCharacteristics.fit[1]}</h4>
                </div>
                <div className="characteristics-highest-meaning">
                <h4>{reviewCharacteristics.fit[5]}</h4>
                </div>
              </div>
              }
            </div>
            <div className="add-review-summary">
              <label className="review-summary-text" htmlFor="review-summary">Review Summary *&nbsp;</label>
              <input className="review-summary-box" type="text" id="review-summary" name="reviewSummary" maxLength="60" placeholder="Example: Best purchase ever!" />
            </div>
            <div className="add-review-body">
              <label className="add-review-body-text" htmlFor="review-body">Review Body *&nbsp;</label>
              <textarea className="add-review-body-box" id="review-body" name="reviewBody" required minLength="50" maxLength="1000" placeholder="Why did you like this product or not?" onChange={props.handleReviewBodyText} />
              {(props.reviewBodyTextCharacterCount) < 50 &&
              <div className="review-body-characters"><h4>Minimum required characters left: [{50 - props.reviewBodyTextCharacterCount}]</h4></div>
              }
              {(props.reviewBodyTextCharacterCount) >= 50 &&
              <div className="review-body-characters"><h4>Minimum reached</h4></div>
              }
            </div>
            <div className="add-review-upload-image">
              <label htmlFor="imageFile">Upload your photos:&nbsp;</label>
                <input type="file" id="image-file-1" accept="image/*" onChange={props.handleFiles} />
                <div id="image-file-1-thumb"></div>

                {(props.numberImages >=1) &&
                <div>
                  <input type="file" id="image-file-2" accept="image/*" onChange={props.handleFiles} />
                  <div id="image-file-2-thumb"></div>
                </div>
                }

                {(props.numberImages >= 2) &&
                <div>
                  <input type="file" id="image-file-3" accept="image/*" onChange={props.handleFiles} />
                  <div id="image-file-3-thumb"></div>
                </div>
                }

                {(props.numberImages >= 3) &&
                <div>
                  <input type="file" id="image-file-4" accept="image/*" onChange={props.handleFiles} />
                  <div id="image-file-4-thumb"></div>
                </div>
                }

                {(props.numberImages >= 4) &&
                <div>
                  <input type="file" id="image-file-5" accept="image/*" onChange={props.handleFiles} />
                  <div id="image-file-5-thumb"></div>
                </div>
                }
            </div>
            <div className="add-review-username">
              <label className="review-username-text" htmlFor="nickname">Username *</label>
              <input username="review-username-box" type="text" id="nickname" name="nickname" maxLength="60" placeholder="Example: jackson11!" required />
              <h4>For privacy reasons, do not use your full name or email address.</h4>
            </div>
            <div className="add-review-email">
              <label className="review-email-text" htmlFor="email">E-mail *&nbsp;</label>
              <input className="review-email-box" type="email" id="email" name="email" maxLength="60" placeholder="Example: jackson11@email.com" required />
              <h4>For authentication reasons, you will not be emailed.</h4>
            </div>
            <div className="add-review-rating">
              {(props.addReviewRating > 0) &&
              <CButton Text={'SUBMIT'} Type={"submit"} aria={'Submit New Rating Button'} />
              }
            </div>

          </form>
        </div>
        </div>
        <div id="open-button" className="open-button">
          <CButton click={() => {props.addReviewToggleModal();}} Text={'ADD A REVIEW'} aria={'Add a Review Button'} />
        </div>
        </div>
      </React.Fragment>
    );

}

export default ReviewList;