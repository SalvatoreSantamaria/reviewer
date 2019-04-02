var mongoose = require('mongoose');
var Restaurant = mongoose.model('Restaurant');
var restaurants  = require('../controllers/restaurants');

module.exports = function(app) {
  // Get to retrieve all restaurants
  app.get('/rts', function(req, res) {
    restaurants.showAll(req, res);
  });

  // Post to create 
  app.post('/rts', function (req, res) {
    // console.log('from routes.js app.post')
    restaurants.createOne(req, res);
  });

  // Put to update 
  app.put('/rts/:id', function (req, res) {
    restaurants.updateOne(req, res);
  });

  // Delete to delete 
  app.delete('/rts/:id', function(req, res) {
    // console.log('this is from routes.js', req.params.id);
    restaurants.deleteOne(req, res);
  });

  // Get to retrieve restaurant by ID
  app.get('/rts/:id', function(req, res) {
    restaurants.findOne(req, res);
  });


  // Get to retrieve by review by ID
  app.get('/rtsReview/:id', function(req, res) {
    restaurants.findOneReview(req, res);
  });

  // Post to create review
  app.post('/rtsReview/:id', function (req, res) {
   // console.log('from routes.js app.post, req is ', req)
    restaurants.createReview(req, res);
  });

};