require("dotenv").config();

var keys = require("./keys.js");

// var to access Axios
var axios = require("axios")
// var to access fs so we can read/write files
var fs = require("fs")
// var to have that moment package
var moment = require("moment")

var spotify = new Spotify(keys.spotify);

// FUNCTIONS!

// Function for running a Spotify search
var getMeSpotify = function(songName) {
    if (songName === undefined) {
      songName = "What's my age again";
    }
  
    spotify.search(
      {
        type: "track",
        query: songName
      },
      function(err, data) {
        if (err) {
          console.log("Error occurred: " + err);
          return;
        }
  
        var songs = data.tracks.items;
  
        for (var i = 0; i < songs.length; i++) {
          console.log(i);
          console.log("artist(s): " + songs[i].artists.map(getArtistNames));
          console.log("song name: " + songs[i].name);
          console.log("preview song: " + songs[i].preview_url);
          console.log("album: " + songs[i].album.name);
          console.log("-----------------------------------");
        }
      }
    );
  };

//   Function to figure out what user entered

var userSearch = function(typeOfSearch, whatSearched) {
    switch (typeOfSearch) {
        case "concert-this":
        getMyBands(whatSearched);
        break;

        case "spotify-this-song":
        getMeSpotify(whatSearched)
        break;

        case "movie-this":
        getMeMovie(whatSearched);
        break;

        case "do-what-it-says":
        doWhatItSays();
        break;

        default: console.log("LIRI is not sure what you mean. Please try a different command.")

    }
}

var runTheThing = function(one, two) {
    userSearch(one, two);
}

runTheThing(process.argv[2], process.argv.slice(3).join(" "));