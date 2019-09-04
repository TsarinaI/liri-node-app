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
      nameOfSong = "The sign";
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

  // Used the solution vid to help with this
  var bandSearch = function(artist) {
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
  
    axios.get(queryURL).then(
      function(response) {
        var jsonData = response.data;
  
        if (!jsonData.length) {
          console.log("No results found for " + artist + ". Please try again.");
          return;
        }
  
        console.log("Upcoming concerts with " + artist + ":");
  
        for (var i = 0; i < jsonData.length; i++) {
          var show = jsonData[i];
  
          // Shows data about concert
          console.log(show.venue.city + "," +
          // This makes it display the country if there isn't a region (ES6 logic)
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
  
var movieSearch = function(nameOfMovie) {
  if (nameOfMovie === undefined) {
    nameOfMovie = "Mr Nobody";
  }
  var queryMovie = "http://www.omdbapi.com/?t=" + nameOfMovie + "&y=&plot=full&tomatoes=true&apikey=trilogy";

  axios.get(queryMovie)
  .then(function(response) {
      console.log("Title: " + response.data.Title);
      console.log("---------------------")
      console.log("Year of release: " + response.data.Year);
      console.log("Rated: " + response.data.Rated);
      console.log("IMDB Rating: " + response.data.imdbRating);
      console.log("Country: " + response.data.Country);
      console.log("Language: " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Actors: " + response.data.Actors);
      // Stole this idea from solution
      console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
  });
};

//   Function to figure out what user entered

var userSearch = function(typeOfSearch, whatSearched) {
    switch (typeOfSearch) {
        case "concert-this":
        bandSearch(whatSearched);
        break;

        case "spotify-this-song":
        spotifySearch(whatSearched);
        break;

        case "movie-this":
        movieSearch(whatSearched);
        break;

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