var Table = require('cli-table');
var colors = require('colors');
colors.setTheme({
  info: 'green',
  infoName: 'grey',
  time: 'cyan',
});
var axios = require('axios');
var Spotify = require('node-spotify-api');
var moment = require('moment');
moment().format();
var separator = `=========================================================\n`
//code to read and set any environment variables with the dotenv package
require("dotenv").config();
// code required to import the keys.js file and store it in a variable
var keys = require("./keys.js");
var fs = require(`fs`);
var readData = require('./log')

var dataToBeLogged = ''
var Search = function () {
  this.spotify = function (song) {
    var spotify = new Spotify(keys.spotify)
    if (song === '') {
      spotify.search({ type: 'track', query: `The Sign` }, function (err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }

        var songInfos = data.tracks.items;
        songInfos.forEach(function (data, index) {
          var table = new Table({
            chars: {
              'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗'
              , 'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝'
              , 'left': '║', 'left-mid': '╟', 'mid': '─', 'mid-mid': '┼'
              , 'right': '║', 'right-mid': '╢', 'middle': '│'
            }
          });
          table.push(
            [`Artist(s)`.infoName, data.artists[0].name.info],
            [`The song's name`.infoName, data.name.info],
            [`A preview link of the song from Spotify`.infoName, data.external_urls.spotify.info],
            [`The album that the song is from`.infoName, data.album.name.info],
          );
          dataToBeLoggedFormatted = table.toString()
          dataToBeLogged = `${separator}\nArtist(s): ${data.artists[0].name}
                      \nThe song's name: ${data.name}
                      \nA preview link of the song from Spotify: ${data.external_urls.spotify}
                      \nThe album that the song is from: ${data.album.name}\n\n`
          readData(dataToBeLogged, dataToBeLoggedFormatted)
        })
      })

    } else {
      spotify.search({ type: 'track', query: `${song}` }, function (err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        var songInfos = data.tracks.items;
        songInfos.forEach(function (data, index) {
          var table = new Table({
            chars: {
              'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗'
              , 'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝'
              , 'left': '║', 'left-mid': '╟', 'mid': '─', 'mid-mid': '┼'
              , 'right': '║', 'right-mid': '╢', 'middle': '│'
            }
          });
          table.push(
            [`Artist(s)`.infoName, data.artists[0].name.info],
            [`The song's name`.infoName, data.name.info],
            [`A preview link of the song from Spotify`.infoName, data.external_urls.spotify.info],
            [`The album that the song is from`.infoName, data.album.name.info],
          );
          dataToBeLoggedFormatted = table.toString()
          dataToBeLogged = `${separator}\nArtist(s): ${data.artists[0].name}
                      \nThe song's name: ${data.name}
                      \nA preview link of the song from Spotify: ${data.external_urls.spotify}
                      \nThe album that the song is from: ${data.album.name}\n\n`
          readData(dataToBeLogged, dataToBeLoggedFormatted)
        })
      })
    }

  };

  this.BandsInTown = function (artistOrBandName) {
    var URL = `https://rest.bandsintown.com/artists/${artistOrBandName}/events?app_id=codingbootcamp`;
    axios.get(URL)
      .then(function (response) {
        info = response.data;
        info.forEach(function (data, index) {
          var table = new Table({
            chars: {
              'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗'
              , 'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝'
              , 'left': '║', 'left-mid': '╟', 'mid': '─', 'mid-mid': '┼'
              , 'right': '║', 'right-mid': '╢', 'middle': '│'
            }
          });

          table.push(
            [`Name of the venue`.infoName, data.venue.name.info],
            [`Venue location`.infoName, ` ${data.venue.city.info}, ${data.venue.region.info}, ${data.venue.country.info}`],
            [`Date of the Event`.infoName, `${moment(data.datetime).format('MM/DD/YYYY').time}`]
          );
          dataToBeLoggedFormatted = table.toString()
          dataToBeLogged = `${separator} \nName of the venue: ${data.venue.name}
                        \nVenue location: ${data.venue.city}, ${data.venue.region}, ${data.venue.country}
                        \nDate of the Event: ${moment(data.datetime).format('MM/DD/YYYY')}\n\n`
          readData(dataToBeLogged, dataToBeLoggedFormatted)
        })
      })
  }

  this.movieSearch = function (movieName) {
    var URL = `http://www.omdbapi.com/?apikey=trilogy&t=${movieName}`
    axios.get(URL)
      .then(function (response) {
        var data = response.data
        var title = data.Title
        var year = data.Year
        var ratings = data.Ratings
        var country = data.Country
        var Language = data.Language
        var plot = data.Plot
        var actors = data.Actors
        ratings.forEach(function (item, index) {
          if (item.Source === `Movie Database`) {
            imdbRating = item.Value
          }
        })
        if (ratings[1] === undefined) {
          var table = new Table({
            chars: {
              'top': '', 'top-mid': '', 'top-left': '', 'top-right': ''
              , 'bottom': '', 'bottom-mid': '', 'bottom-left': '', 'bottom-right': ''
              , 'left': '', 'left-mid': '', 'mid': '', 'mid-mid': ''
              , 'right': '', 'right-mid': '', 'middle': ' '
            },
            style: { 'padding-left': 0, 'padding-right': 0 }
          });

          table.push(
            [`* Year the movie came out`.infoName, year.info],
            [`* IMDB Rating of the movie`.infoName, ratings[0].Value.info],
            [`* Country where the movie was produced`.infoName, country.info],
            [`* Language of the movie`.infoName, Language.info],
            [`* Plot of the movie`.infoName, plot.info],
            [`* Actors in the movie`.infoName, actors.info]
          );
          dataToBeLoggedFormatted = table.toString()
          dataToBeLogged = `${separator}* Title of the movie: ${title}
          \n* Year the movie came out: ${year}
          \n* IMDB Rating of the movie: ${ratings[0].Value}
          \n* Country where the movie was produced: ${country}
          \n* Language of the movie: ${Language}
          \n* Plot of the movie: ${plot}
          \n* Actors in the movie: ${actors}\n\n`
          readData(dataToBeLogged, dataToBeLoggedFormatted)
        } else {
          var table = new Table({
            chars: {
              'top': '', 'top-mid': '', 'top-left': '', 'top-right': ''
              , 'bottom': '', 'bottom-mid': '', 'bottom-left': '', 'bottom-right': ''
              , 'left': '', 'left-mid': '', 'mid': '', 'mid-mid': ''
              , 'right': '', 'right-mid': '', 'middle': ' '
            },
            style: { 'padding-left': 0, 'padding-right': 0 }
          });

          table.push(
            [`* Year the movie came out`.infoName, year.info],
            [`* IMDB Rating of the movie`.infoName, ratings[0].Value.info],
            [`* Rotten Tomatoes Rating of the movie`.infoName, ratings[1].Value.info],
            [`* Country where the movie was produced`.infoName, country.info],
            [`* Language of the movie`.infoName, Language.info],
            [`* Plot of the movie`.infoName, plot.info],
            [`* Actors in the movie`.infoName, actors.info]
          );
          dataToBeLoggedFormatted = table.toString()
          dataToBeLogged = `${separator}* Title of the movie: ${title}
                    \n* Year the movie came out: ${year}
                    \n* IMDB Rating of the movie: ${ratings[0].Value}
                    \n* Rotten Tomatoes Rating of the movie: ${ratings[1].Value}
                    \n* Country where the movie was produced: ${country}
                    \n* Language of the movie: ${Language}
                    \n* Plot of the movie: ${plot}
                    \n* Actors in the movie: ${actors}\n\n`
          readData(dataToBeLogged, dataToBeLoggedFormatted)
        }
      }).catch(function (error) {
        console.log(error)
      })
  }


};
var doWhatItSays = function () {
  var searchFile = new Search()
  this.doWhatItSays = function (command, commandInput) {
    fs.readFile('random.txt', 'utf8', function (err, data) {
      command = data.split(`,`)[0];
      commandInput = data.split(`,`)[1].slice(1, commandInput.length - 1);
      if (command === `spotify-this-song`) {
        searchFile.spotify(commandInput)
      }
      else if (command === `concert-this`) {
        searchFile.BandsInTown(commandInput)
      } else {
        searchFile.movieSearch(commandInput)
      }
    })
  }
}

module.exports = {
  search: Search,
  fileSearch: doWhatItSays
};