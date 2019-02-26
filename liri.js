require("dotenv").config();
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var keys = require("./keys");
var spotify = new Spotify(keys.spotify);

// Function for running bandsintown search. Logs the first 3 concerts listed for artist.
var concertThis = function(artist) {
  axios
    .get(
      "https://rest.bandsintown.com/artists/" +
        artist +
        "/events?app_id=codingbootcamp"
    )
    .then(function(response) {
      for (let i = 0; i < 3; i++) {
        console.log("Venue: " + response.data[i].venue.name);
        console.log(
          "Location: " +
            response.data[i].venue.city +
            ", " +
            response.data[i].venue.region +
            ", " +
            response.data[i].venue.country
        );
        console.log(
          "Date: " +
            moment(response.data[i].venue.datetime).format("MM/DD/YYYY")
        );
        console.log("---------------------------------");
      }
    })
    .catch(function(error) {
      console.log(error);
    });
    
};

// Function for running spotify search. Returns the first 3 results for a searched song title.
var spotifySong = function(song) {
  if (song === undefined) {
    song = "The Sign";
  }
  spotify.search({ type: "track", query: song }, function(err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    }
    var songs = data.tracks.items;
    for (let i = 0; i < 3; i++) {
      console.log("Artist(s): " + songs[i].artists[0].name);
      console.log("Song Title: " + songs[i].name);
      console.log("Spotify Link: " + songs[i].external_urls.spotify);
      console.log("Album: " + songs[i].album.name);
      console.log("---------------------------------");
    }
  });
};

// Function for running OMDB movie search
var movieName = function(movie) {
  axios
    .get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy")
    .then(function(response) {
      console.log("Title: " + response.data.Title);
      console.log("Year: " + response.data.Year);
      console.log("IMDB Rating: " + response.data.imdbRating);
      console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
      console.log("Country: " + response.data.Country);
      console.log("Language: " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Cast: " + response.data.Actors);
    })
    .catch(function(error) {
      console.log(error);
    });
};

// Takes info from random.txt file and runs function with that info. Takes in userChoice from below.
var doIt = function() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    console.log(data);
    var dataArr = data.split(",");
    if (dataArr.length === 2) {
      userChoice(dataArr[0], dataArr[1]);
    } else if (dataArr.length === 1) {
      userChoice(dataArr[0]);
    }
  });
};

var userChoice = function(command, userPick) {
  switch (command) {
    case "concert-this":
      concertThis(userPick);
      break;
    case "spotify-this-song":
      spotifySong(userPick);
      break;
    case "movie-this":
      movieName(userPick);
      break;
    case "do-what-it-says":
      doIt();
      break;
    default:
      console.log("Liri doesn't recognize command");
  }
};
var runCommand = function(arg1, arg2) {
  userChoice(arg1, arg2);
};
runCommand(process.argv[2], process.argv.slice(3).join(" "));

// fs.appendFile("log.txt", concertThis, function(err){
//     if(err){
//         console.log(err)
//     } else{
//         console.log("Concert info added to log!")
//     }
// })


