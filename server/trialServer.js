const express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');


var FormData = require('form-data');
var cloudinary = require('cloudinary');
const app = express();
const axios = require('axios');
const port = 3000;
const token = require('./config.js');
const cors = require('cors');

var upload = multer({ dest: 'uploads/' });

cloudinary.config({
  cloud_name: token.cloudinaryCloudName,
  api_key: token.cloudinaryAPIKey,
  api_secret: token.cloudinaryAPISecret
});

app.use(cors());
app.use(express.static("./client/dist"));

var jsonParser = bodyParser.json();

app.post('/uploadreviewimage', upload.single('image'), function (req, res) {

  cloudinary.v2.uploader.upload(req.file.path,
  function(error, result) {
    if (error) {
      console.log(error);
    } else {
      res.status(201).send({postedURL: result.url});
    }
  });

});

app.post('/reviewsproductmeta', jsonParser, (req, res) => {

  var configGetReviewsById = {
    method: 'GET',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews?product_id=${req.body.id}`,
    headers: {
      'Authorization': token.token
    }
  };
  var configGetProductById = {
    method: 'GET',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${req.body.id}`,
    headers: {
      'Authorization': token.token
    }
  };
  var configGetReviewsMetaById = {
    method: 'GET',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/meta?product_id=${req.body.id}`,
    headers: {
      'Authorization': token.token
    }
  };

  var getReviewsById = () => {
    return axios(configGetReviewsById);
  };
  var getProductById = () => {
    return axios(configGetProductById);
  };
  var getReviewsMetaById = () => {
    return axios(configGetReviewsMetaById);
  };

  Promise.all([getReviewsById(), getProductById(), getReviewsMetaById()])
  .then(function (response) {
    response[0].data.name = response[1].data.name;
    response[0].data.ratings = response[2].data.ratings;
    response[0].data.recommended = response[2].data.recommended;
    response[0].data.characteristics = response[2].data.characteristics;
    res.send(response[0].data);
  })
  .catch(function (error) {
  console.log(error);
  });

});

app.post('/addreview', jsonParser, (req, res) => {

  var configAddReview = {
    method: 'POST',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews`,
    data: req.body,
    headers: {
      'Authorization': token.token
    }
  };

  var addReview = () => {
    return axios(configAddReview);
  };

  Promise.all([addReview()])
  .then(function (response) {
    res.sendStatus(201);
  })
  .catch(function (error) {
  console.log(error);
  });

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})