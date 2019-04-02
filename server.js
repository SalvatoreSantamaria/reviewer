// Configuration______________________________________________________
var express = require('express');
var app = express();
var path = require('path');
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
// ____________________________________________________________________|

//Express Setting______________________________________________________
app.use(express.static(__dirname + '/public/dist/public')); 
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
// ____________________________________________________________________|


//Mongoose Setting_____________________________________________________
mongoose.connect('mongodb://localhost/restaurant');
require('./server/models/restaurant');
mongoose.Promise = global.Promise;
// ____________________________________________________________________|

//Routing______________________________________________________________
require('./server/config/routes.js')(app);
// require('./server/config/reviewRoutes.js')(app);
// this route will be triggered if any of the express routes do not match
app.all('*', (req, res, next) => {
  res.sendFile(path.resolve('./public/dist/public/index.html'));
});
// ____________________________________________________________________|

//App listening________________________________________________________
app.listen(8006, function() {
  console.log('listening on port 8006');
});
// ___________________________________________________________________|