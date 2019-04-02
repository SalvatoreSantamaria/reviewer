var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RestaurantSchema = new mongoose.Schema({
  restaurantName: { type: String, required: [true, 'Restaurant name is required'], minlength: [3, 'Restaurant name text length must be at least 3 charcters long'] },
  cuisine: { type: String, required: [true, 'Cuisine type is required'], minlength: [3, 'Cuisine type text length must be at least 3 charcters long'] },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  _user: [{ type: Schema.Types.ObjectId, ref: 'User'}]
});
mongoose.model('Restaurant', RestaurantSchema);
var Restaurant = mongoose.model('Restaurant');

module.exports = Restaurant;


var UserSchema = new mongoose.Schema({
  userName: { type: String, required: [true, 'User name is required'], minlength: [3, 'User name text length must be at least 3 charcters long'] },
  stars: { type: Number, required: [true, 'Please include a rating between 1 and 5'],  min:[1, 'Minimum Star Rating is 1'], max:[5, 'Maximum Star Rating is 5'] },
  review: { type: String, required: [true, 'Please enter a review'], minlength: [3, 'Your review length must be at least 3 charcters long'] },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  _restaurant: { type:Schema.Types.ObjectId, ref: 'Restaurant' }
});
mongoose.model('User', UserSchema);
var User = mongoose.model('User');

module.exports = User;
