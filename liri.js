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
      var divider =
        "\n------------------------------------------------------------\n\n";
      for (let i = 0; i < 3; i++) {
        var concertData = [
          "Venue: " + response.data[i].venue.name,

          "Location: " +
            response.data[i].venue.city +
            ", " +
            response.data[i].venue.region +
            ", " +
            response.data[i].venue.country,

          "Date: " +
            moment(response.data[i].venue.datetime).format("MM/DD/YYYY")
        ].join("\n\n");

        // adds concertData to log.txt file
        fs.appendFile("log.txt", concertData + divider, function(err) {
          if (err) throw err;
          console.log(concertData);
        });
      }
    })
    .catch(function(error) {
      console.log(error);
    });
};

// Function for running spotify search. Returns the first 3 results for a searched song title.
var spotifySong = function(song) {
  // should display info for the song "The Sign" if userPick is undefined for Spotify song command (not currently working)
  if (!song) {
    song = "The Sign";
  }
  spotify.search({ type: "track", query: song }, function(err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    }
    var songs = data.tracks.items;
    for (let i = 0; i < 3; i++) {
      var divider =
        "\n------------------------------------------------------------\n\n";
      var songData = [
        "Artist(s): " + songs[i].artists[0].name,
        "Song Title: " + songs[i].name,
        "Spotify Link: " + songs[i].external_urls.spotify,
        "Album: " + songs[i].album.name
      ].join("\n\n");

      // adds songData to log.txt file
      fs.appendFile("log.txt", songData + divider, function(err) {
        if (err) throw err;
        console.log(songData);
      });
    }
  });
};

// Function for running OMDB movie search
var movieName = function(movie) {
  // should display info for the movie "Mr. Nobody" if userPick is undefined for movie command (not currently working)
  if (!movie) {
    movie = "Mr. Nobody";
  }

  axios
    .get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy")
    .then(function(response) {
      var divider =
        "\n------------------------------------------------------------\n\n";
      var movieData = [
        "Title: " + response.data.Title,
        "Year: " + response.data.Year,
        "IMDB Rating: " + response.data.imdbRating,
        "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value,
        "Country: " + response.data.Country,
        "Language: " + response.data.Language,
        "Plot: " + response.data.Plot,
        "Cast: " + response.data.Actors
      ].join("\n\n");

      // adds movieData to log.txt file
      fs.appendFile("log.txt", movieData + divider, function(err) {
        if (err) throw err;
        console.log(movieData);
      });
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
