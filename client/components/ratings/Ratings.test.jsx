import React from 'react';
import regeneratorRuntime from "regenerator-runtime";

//Initial API Response
var firstState = {
  "reviews":[{"review_id":406678,"rating":3,"summary":"Djembe","recommend":true,"response":null,"body":"Djembe","date":"2021-06-09T00:00:00.000Z","reviewer_name":"Djembe","helpfulness":7,"photos":[]},{"review_id":407038,"rating":1,"summary":"I don't like it","recommend":false,"response":null,"body":"Don't like it very much","date":"2021-06-17T00:00:00.000Z","reviewer_name":"notafan","helpfulness":0,"photos":[]},{"review_id":407220,"rating":5,"summary":"Perfect!!","recommend":true,"response":null,"body":"My cat also loves it!","date":"2021-06-18T00:00:00.000Z","reviewer_name":"catlover","helpfulness":0,"photos":[{"id":730881,"url":"https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"}]},{"review_id":407222,"rating":5,"summary":"My cat loves it!!","recommend":true,"response":null,"body":"Perfect product for cats, I guess","date":"2021-06-18T00:00:00.000Z","reviewer_name":"furrball","helpfulness":0,"photos":[{"id":730882,"url":"https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"},{"id":730883,"url":"https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"},{"id":730884,"url":"https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"},{"id":730885,"url":"https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"},{"id":730886,"url":"https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"}]},{"review_id":289139,"rating":5,"summary":"This product was great!","recommend":true,"response":"","body":"I really did or did not like this product based on whether it was sustainably sourced. Then I found out that its made from nothing at all.","date":"2019-01-01T00:00:00.000Z","reviewer_name":"funtime","helpfulness":13,"photos":[]}],
  "productName":"Camo Onesie",
  "ratings":{"1":"6","2":"4","3":"6","4":"28","5":"17"},
  "recommended":{"false":"14","true":"47"},
  "characteristics":{"Fit":{"id":74277,"value":"3.5686274509803922"},
  "Length":{"id":74278,"value":"2.8437500000000000"},
  "Comfort":{"id":74279,"value":"3.5625000000000000"},
  "Quality":{"id":74280,"value":"3.5000000000000000"}}};

//Enzyme
import '@testing-library/jest-dom';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mount } from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

// import API mocking utilities from Mock Service Worker
import { rest } from 'msw';
import { setupServer } from 'msw/node';

// import react-testing methods
import { render, fireEvent, waitFor, screen } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom/extend-expect';

// the component to test
import Ratings from './Ratings.jsx'

test('Loads Ratings & Reviews ReviewGraphics Component', async () => {
  render(<Ratings />);
  var ratingReviewHeader = screen.getByText('RATINGS & REVIEWS');

  expect(ratingReviewHeader).toBeDefined();
});

test('Loads Ratings & Reviews ReviewList Component', async () => {
  render(<Ratings />);
  var addReviewButton = screen.getByText('ADD A REVIEW');

  expect(addReviewButton).toBeDefined();
});

test('Loads 2 Reviews in Reviews List after State is Updated', () => {
  const wrapper = mount(<Ratings />);
  wrapper.setState(firstState, () => {
    console.log(wrapper.find('div.review-list').length);
    expect(wrapper.find('div.review-list')).toHaveLength(2);
  });

});