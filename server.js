// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/************
 * DATABASE *
 ************/

 var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


let profile = ({
  name: "Jared Pleva",
  github_link: "https://github.com/jpleva91",
  github_profile_image: "https://avatars3.githubusercontent.com/u/17632264?v=4&s=400&u=449e98d83424d02b2069df9d3a5e0b301a25c2de",
  current_city: "Denver",
  pets: [
  { name: "Mini", type: "Cat", breed: "Domestic Long Haired" }, 
  { name: "Ollie", type: "Dog", breed: "Australian Cattle Dog/ Shepherd Mix" }, 
  { name: "Cisco", type: "Dog", breed: "Albino German Shepherd"}]
});

/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    woops_i_has_forgot_to_document_all_my_endpoints: false,
    message: "Welcome to my personal api! Here's what you need to know!",
    documentation_url: "https://github.com/jpleva91/express-personal-api/blob/master/README.md", // CHANGE ME
    base_url: "https://safe-river-26936.herokuapp.com/api", // CHANGE ME
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "About Me!"}, // CHANGE ME
      {method: "GET", path: "/api/movies", description: "INDEX of my favorite movies"}, // CHANGE ME
      {method: "GET", path: "/api/movies/:id", description: "SHOW a movie by ID"},
      {method: "POST", path: "/api/movie", description: "CREATE a new movie"},
      {method: "PUT", path: "/api/movies/:id", description: "UPDATE a movie by ID"},
      {method: "DELETE", path: "/apis/movies/:id", description: "DESTORY a movie by ID"}
    ]
  });
});

app.get('/api/profile', function (req, res) {
  res.json(profile);
});

app.get('/api/movies', function(req, res) {
  db.Movie.find()
  .exec(function(err, movies) {
    if (err) { return console.log(err); }
    res.json(movies);
  });
});

app.get('/api/movies/:id', function(req, res) {
  db.Movie.findOne({ _id: req.params.id }, function(err, movie) {
    if(err) { return console.log("Error: ", err); }
    res.json(movie);
  });
});

app.post('/api/movies', function(req, res) {
  let newMovie = new db.Movie({
    title: req.body.title,
    director: req.body.director,
    characters: req.body.characters
  });

  newMovie.save(function(err, movie) {
    if(err) { return console.log("Error: ", err); }
    console.log("saved: ", movie.title);
    res.json(movie);
  });
});

app.put('/api/movies/:id', function(req, res) {
  let movieId = req.params.id;
  db.Movie.findOne({ _id: req.params.id }, function(err, movie) {
    movie.set({
      title: req.body.title,
      director: req.body.director,
      characters: req.body.characters
    });

    movie.save(function(err, updatedMovie) {
      if(err) { return console.log("Error: ", err); }
      res.json(updatedMovie);
    });
  });
});

app.delete('/api/movies/:id', function(req, res) {
  console.log("Movie deleted" + req.params);
  let movieId = req.params.id;
  db.Movie.findOneAndRemove({ _id: movieId }, function(err, movie) {
    if(err) { return console.log("Error:", err); }
    res.json(movie);
  });
});

/********, 
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
