const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const axios = require('axios');
const port = process.env.EXPRESS_PORT;
const cors = require('cors');
var multer = require('multer');
var FormData = require('form-data');
const AWS = require('aws-sdk');
var fs = require('fs');

// Middlewear
app.use(cors());

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

app.use(express.static("./client/dist"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
var upload = multer({ dest: 'uploads/' });

app.get('/active-product', (req, res) => {

  let config = {
      method: 'GET',
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/' + req.query.id, // Force product id until logic is implemented
      headers: { 'Authorization': process.env.GITHUB_TOKEN }
  };

  // Call to products API and return as res
  axios(config)
      .then(function (response) {
          res.send(response.data)
      })
      .catch(function (error) {
          console.log(error);
      });
});

app.get('/active-product-styles', (req, res) => {

  let config = {
      method: 'GET',
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/' + req.query.id + '/styles', // Force product id until logic is implemented
      headers: { 'Authorization': process.env.GITHUB_TOKEN }
  };

  // Call to products API and return as res
  axios(config)
      .then(function (response) {
          res.send(response.data)
      })
      .catch(function (error) {
          console.log(error);
      });
});

// Posts to RELATED endpoint
app.post('/related', (req, res) => {

  let config = {
  method: 'GET',
  url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/'+req.body.id+'/related',
  headers: { 'Authorization': process.env.GITHUB_TOKEN } };

  axios(config)
    .then(function (response) {
      res.send(response.data)
    })
    .catch(function (error) {
      console.log(error);
      res.sendStatus(500);
    });
});

app.post('/card', (req, res) => {

  let config = {
  method: 'get',
  url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/'+req.body.id,
  headers: { 'Authorization': process.env.GITHUB_TOKEN } };

  axios(config)
    .then(function (response) {
      res.send(response.data)
    })
    .catch(function (error) {
    console.log(error);
    res.sendStatus(500);
    });
});

app.post('/cardimage', (req, res) => {
  let config = {
  method: 'get',
  url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/'+req.body.id+'/styles',
  headers: { 'Authorization': process.env.GITHUB_TOKEN} };

  axios(config)
    .then(function (response) {
      res.send(response.data)
    })
    .catch(function (error) {
    console.log(error);
    res.sendStatus(500);
    });

});

app.post('/review/meta', (req, res) => {
  let config = {
  method: 'get',
  url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/meta?product_id='+req.body.id,
  headers: { 'Authorization': process.env.GITHUB_TOKEN }};
  axios(config)
    .then(function (response) {
      res.send(response.data)
    })
    .catch(function (error) {
      console.log(error);
      res.sendStatus(500);
    });

});

app.post('/reviews', (req, res) => {
  var config = {
    method: 'GET',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews?product_id=${req.body.id}`,
    headers: { 'Authorization': process.env.GITHUB_TOKEN }};

  axios(config)
    .then(function (response) {
      res.send(response.data)
    })
    .catch(function (error) {
      console.log(error);
      res.sendStatus(500);
    });
});

app.post('/uploadreviewimage', upload.single('image'), function (req, res) {

  const BUCKET_NAME = process.env.AWS_S3BUCKET_REVIEW_PHOTOS;
  const fileContent = fs.readFileSync(req.file.path);
  const params = {
      Bucket: BUCKET_NAME,
      Key: `${Date.now()}_${req.file.originalname}`, // file name as it should be called in the bucket
      Body: fileContent
  };

  s3.upload(params, function(err, data) {
      if (err) {
        res.status(503).send(err);
      } else {
        res.status(201).send({postedURL: data.Location});
      }
  });



});

app.post('/reviewsproductmeta', (req, res) => {

  var configGetReviewsById = {
    method: 'GET',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews?product_id=${req.body.id}`,
    headers: {
      'Authorization': process.env.GITHUB_TOKEN
    }
  };
  var configGetProductById = {
    method: 'GET',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${req.body.id}`,
    headers: {
      'Authorization': process.env.GITHUB_TOKEN
    }
  };
  var configGetReviewsMetaById = {
    method: 'GET',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/meta?product_id=${req.body.id}`,
    headers: {
      'Authorization': process.env.GITHUB_TOKEN
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

app.post('/addreview', (req, res) => {

  var configAddReview = {
    method: 'POST',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews`,
    data: req.body,
    headers: {
      'Authorization': process.env.GITHUB_TOKEN
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

app.post('/addhelpful', (req, res) => {

  var configAddHelpful = {
    method: 'PUT',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/${req.body.review_id}/helpful`,
    headers: {
      'Authorization': process.env.GITHUB_TOKEN
    }
  };
  axios(configAddHelpful)
    .then(function (response) {
      res.sendStatus(201);
    })
    .catch(function (response) {
      res.sendStatus(500);
    });

});

app.post('/addreport', (req, res) => {

  var configAddReport = {
    method: 'PUT',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/${req.body.review_id}/report`,
    headers: {
      'Authorization': process.env.GITHUB_TOKEN
    }
  };
  axios(configAddReport)
    .then(function (response) {
      res.sendStatus(201);
    })
    .catch(function (response) {
      res.sendStatus(500);
    });

});

app.post('/click', (req, res) => {

  var configAddClicks = {
    method: 'POST',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/interactions`,
    data: req.body,
    headers: {
      'Authorization': process.env.GITHUB_TOKEN
    }
  };
  axios(configAddClicks)
  .then(function (response) {
    res.sendStatus(201);
  })
  .catch(function (response) {
    res.sendStatus(422);
  });

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
