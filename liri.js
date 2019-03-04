require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var omdb = require('omdb');
var axios = require("axios");
var command = process.argv[2];
var value = process.argv.slice(3).join(" ");
var spotify = new Spotify(keys.spotify);
var omdb = keys.omdb.key;

if (command === "song") {
  songSearch();
} else if (command === "movie") {
  movieSearch();
} else if (command === "inTown") {
  artistSearch();
}


function songSearch() {
  console.log("search")
  spotify.search({
    type: 'track',
    query: value
  }, function (err, data) {
    if (err) console.log(err);
    for (var i = 0; i < data.tracks.items[0].artists.length; i++) {
      if (i === 0) {
        console.log("Artist(s):    " + data.tracks.items[0].artists[i].name);
      } else {
        console.log("              " + data.tracks.items[0].artists[i].name);
      }
    }
    console.log("Song:         " + data.tracks.items[0].name);
    console.log("Preview Link: " + data.tracks.items[0].preview_url);
    console.log("Album:        " + data.tracks.items[0].album.name);
  });
}


function movieSearch() {
  var queryUrl = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=65ebfd34"

  console.log(queryUrl);

  axios.get(queryUrl).then(
    function (response) {
      console.log("Release Year: " + response.data.Year);
      console.log(response.data.Title)
      console.log(response);
    }
  );
}

function artistSearch() {
  var queryURL = "https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp"
  axios.get(queryURL).then(
    function(response) {
      console.log(response.data.offers.venue.name);
      console.log(response.data.lineup);
      console.log(response.data.city);
      console.log(response.data.country);
  });
};

// promise13 = () => {
//   return new Promise((resolve, reject) => { reject(13)})
// }

// (async () => {
//   let num = await promise13(); // UnhandledPromiseRejectionWarning
//   console.log('num', num);
// })();

// (async () => {
//   let num = await promise13().catch((err) => console.log('caught it'));
//   console.log('num', num);
// })();