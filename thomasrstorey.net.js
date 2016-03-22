/*
thomasrstorey.net
Thomas R Storey
copyleft 2016
*/

const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const busboy = require('express-busboy');
const log = console.log;
const app = express();
busboy.extend(app);

var hbs = exphbs.create({
  defaultLayout : 'main',
  extname : 'hbs',
  helpers : require('./helpers')(app)
});

app.use(bodyParser.urlencoded({extended: false}));
app.engine('.hbs', hbs.engine);
app.set('view engine', 'hbs');
app.use(express.static('views/static'));

require('./app.locals.js')(app);

require('./routes.js')(app);

// 2197 = 13^3
app.listen(2197, function(err){
  log("start thomasrstorey.net on port 2197")
})
