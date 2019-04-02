var mongoose = require('mongoose');
var Restaurant = mongoose.model('Restaurant');
var User = mongoose.model('User');

module.exports = {
  showAll: function (req, res) {
    Restaurant.find({}, function (err, restaurants) {
      if (err) {
        console.log('There is an error', err);
        // respond with JSON
        res.status(500).json({ message: 'There is an error', error: err }); //500 is an error code
      } else {
        // respond with JSON
        console.log('incoming restaurant data');
        res.json(restaurants);
      }
    });
  },



  //new code with validation
  createOne: function (req, res) {
    console.log('createOne from restaurants.js')
    var restaurant = new Restaurant({
      restaurantName: req.body.restaurantName,
      cuisine: req.body.cuisine,

    });
    restaurant.save()
      .then(function (results) {
        console.log('Restaurant Added!', results);
        res.json(results);
      })
      .catch(error => {
        const errors = Object.keys(error.errors)
          .map(key => error.errors[key].message)
        console.log("From controllers/restaurant.js. There are server errors ", errors)
        res.json({ error: errors })
      });
  },


  updateOne: function (req, res) {
    console.log(req.params.id);
    console.log('From restaurant.js, This is req.body.restaurantName', req.body.restaurantName);
    Restaurant.findById(req.params.id, function (err, data) {
      if (err) {
        console.log("Error while updating controller > restaurants.js", err)
        res.json(err)
      } else {
        data.restaurantName = req.body.restaurantName;
        data.cuisine = req.body.cuisine;
        data.save()
          .then(function (results) {
            console.log('Restaurant updated!', results);
            res.json(results);
          })
          .catch(error => {
            const errors = Object.keys(error.errors)
              .map(key => error.errors[key].message)
            console.log("From controllers/restaurant.js, updateOne. There are server errors ", errors)
            res.json({ error: errors })
          });
      }
    })
  },


  deleteOne: function (req, res) {
    Restaurant.remove({ _id: req.params.id }, function (err, deletedRestaurant) {
      if (err) {
        console.log('There is an error', err);
      } else {
        console.log('Restaurant deleted');
        res.json(deletedRestaurant); //reponding with API
      }
    });
  },
  findOne: function (req, res) {
    Restaurant.findOne({ _id: req.params.id }, function (err, restaurant) {
      if (err) {
        console.log('There is an error', err);
      } else {
        console.log('Restaurant found');
        // respond with JSON
        res.json({ data: restaurant });
      }
    });
  },

  findOneReview: function (req, res) {
    Restaurant.findOne({ _id: req.params.id })
    .populate({path: '_user', options: {sort:{"stars": "descending"}}})
    .exec( (err, restaurant) => {
      if (err) {
        console.log("restaurant.js error")
        res.status(400).json(err);
      } else {
        res.json({message: 'Success', data: restaurant});
      }
    })
  },

  //new code 
  createReview: function (req, res) {
    console.log('createReview from restaurants.js, _id: req.params.id is ', req.params.id)
    Restaurant.findOne({ _id: req.params.id }, (error, data) => {  
      // console.log('From restaurants.js, data is', data , 'and _id is ' , req.params.id );

      const user = new User(req.body); 
      user._restaurant = data.id; 
      data._user.push(user); // pushing into user from restaurant model
      user.save((error) => {
        data.save((e) => {

          if (error) {
            // res.status(400).json(error);
            const errors = Object.keys(error.errors)
              .map(key => error.errors[key].message)
              res.json({ error: errors })
          } else {
            console.log(user);
            res.json({ message: 'Success', data: user });
          }

          
        })
      })
    })
  },    
    
  

};
