// Fill requirements
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

// Set requirements
const app = express();

// Secure env and add authentication
require('dotenv').config();

// Add this after you initialize express.
app.use(cookieParser());

// Set db
require('./data/reddit-clone-db');

// Set up a static directory
app.use(express.static('public'));

// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator()); // Add after Body parser!

// Establish main hbs layout
app.engine('hbs', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'hbs');

// --------------------------------------------------------
/** Start the app */
// --------------------------------------------------------

app.set('port', process.env.PORT);
app.set('port', 3000);

if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log('Server is running on port 3000');
  });
}

// --------------------------------------------------------
/** Check for Auth */
// --------------------------------------------------------

const checkAuth = (req, res, next) => {
  console.log('Checking authentication');
  if (
    typeof req.cookies.nToken === 'undefined' ||
    req.cookies.nToken === null
  ) {
    req.user = null;
  } else {
    const token = req.cookies.nToken;
    const decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  }

  next();
};

app.use(checkAuth);

// --------------------------------------------------------
/** Define routes */
// --------------------------------------------------------

// Set post routes
require('./controllers/posts')(app);
require('./controllers/comments')(app);
require('./controllers/auth')(app);
require('./controllers/replies')(app);

/* Not Defined
require('./controllers/posts-api')(app);
*/

/**********************************************
 / Home Route: Get
 /**********************************************/

const Post = require('./models/post');

app.get('/', (req, res) => {
  const currentUser = req.user;

  Post.find({})
    .populate('author')
    .then(posts => {
      res.render('reddit.hbs', { posts, currentUser });
    })
    .catch(err => {
      console.log(err.message);
    });
});

/*
  const currentUser = req.user;
  let message = "";
  let loggedin = "loggedout";

  if (currentUser !== null) {
    message = `Welcome back ${currentUser.username}`;
    loggedin = "loggedin";
  }

  // res.cookie('hello', 'Hello Cookie!');

  res.render('home.hbs', {
    ...req.user,
    bodyClass: `home ${loggedin}`,
    pageTitle: "Home",
    currentUser,
    message: message
  });
  */

/* Currently testing and developing
app.get('/', function(req, res) {
  res.render('reddit');
  //res.send('Hello World');
});

app.get('/posts/new/', function(req, res) {
  res.render('posts-new');
});

app.post('/posts/new/', function(req, res) {
  const postBody = req.body;
  console.log(postBody);
  res.render('posts-index');
});
*/

// Export app
module.exports = app;
