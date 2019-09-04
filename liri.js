require("dotenv").config();

var keys = require("./keys.js");

// var to access Axios
var axios = require("axios")
// var to access fs so we can read/write files
var fs = require("fs")
// var to have that moment package
var moment = require("moment")
// var to that Spootifoo package
var Spotify = require("node-spotify-api")

var spotify = new Spotify(keys.spotify);

// FUNCTIONS!
// Function that gets the artist name: NEED for spotify search
var grabArtist = function(artist) {
    return artist.name;
  };

// Function for running a Spotify search
var spotifySearch = function(nameOfSong) {
    if (nameOfSong === undefined) {
      nameOfSong = "What's my age again";
    }
  // The Spotify API search - if there are results, the first one displays with the artist, name of song, preview, and album
    spotify.search({type: "track", query: nameOfSong},
      function(err, data) {
        if (err) {
          console.log("Error: " + err);
          return;
        }

        else {
  
        var songs = data.tracks.items;
  
        for (var i = 0; i < songs.length; i++) {

          console.log("Search result #: " + i);
          console.log("Artist(s): " + songs[i].artists.map(grabArtist));
          console.log("Name of Song: " + songs[i].name);
          console.log("Preview the song: " + songs[i].preview_url);
          console.log("Album: " + songs[i].album.name);
          console.log(".....");
        }
      }}
    );
  };

  var getMyBands = function(artist) {
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
  
    axios.get(queryURL).then(
      function(response) {
        var jsonData = response.data;
  
        if (!jsonData.length) {
          console.log("No results found for " + artist);
          return;
        }
  
        console.log("Upcoming concerts for " + artist + ":");
  
        for (var i = 0; i < jsonData.length; i++) {
          var show = jsonData[i];
  
          // Print data about each concert
          // If a concert doesn't have a region, display the country instead
          // Use moment to format the date
          console.log(
            show.venue.city +
              "," +
              (show.venue.region || show.venue.country) +
              " at " +
              show.venue.name +
              " " +
              moment(show.datetime).format("MM/DD/YYYY")
          );
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
        spotifySearch(whatSearched);
        break;

        // case "movie-this":
        // getMeMovie(whatSearched);
        // break;

        // case "do-what-it-says":
        // doWhatItSays();
        // break;

        default: console.log("LIRI is not sure what you mean. Please try a different command.")

    }
}

var runTheThing = function(one, two) {
    userSearch(one, two);
}

runTheThing(process.argv[2], process.argv.slice(3).join(" "));