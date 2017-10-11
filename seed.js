// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

 var db = require('./models');

 var new_movie = ({
	title: "Pulp Fiction",
	director: "Quentin Tarantino",
	characters: ["Vincent Vega", "Mia Wallace"]
});

 db.Movie.create(new_movie, function(err, movie){
   if (err){
     return console.log("Error:", err);
   }

   console.log("Created new movie", movie._id);
   process.exit(); // we're all done! Exit the program.
 });
