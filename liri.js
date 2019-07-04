//helps access the file apicalls.js
var Search = require("./apicalls.js");
//helps access the file system
var fs = require(`fs`)
//access my search object constructor from the apicalls.js
var search = new Search.search();
//access my doWhatItSays object constructor from the apicalls.js
var fileSearch = new Search.fileSearch


// a function that will help the app run
runApp()
function runApp() {
    //using variables to better understand the terms
    var arguments = process.argv
    var command = arguments[2]
    var commandInput = arguments.slice(3).join(" ");
    if (isValidArgv(arguments)) {
        parseArguments(command, commandInput)
    }
}

// a function that will validate your command once you run the app through node 
function isValidArgv(argv) {
    // using a set of the arguments that will be allowed to be use in the command line 
    var commandList = new Set([`concert-this`, `spotify-this-song`, `movie-this`, `do-what-it-says`])
    var userCommand = argv[2]
    if (argv.length < 3) {
        console.log(`Error: Not enough arguments in command line`)
        return false
    }
    else if (!commandList.has(userCommand)) {
        console.log(`Error: Invalid argument`)
        return false
    }
    return true
}


//A function that will parse my arguments a run an api call to get you back some info 
function parseArguments(command, commandInput) {
    //command that searches band in town api
    if (command === `concert-this`) {
        search.BandsInTown(commandInput)
    }//command that searches spotify api
    else if (command === `spotify-this-song`) {
        search.spotify(commandInput)
    }//command that searches obdm api
    else if (command === `movie-this`) {
        if (commandInput === '') {
            commandInput = `Mr. Nobody`
        }
        search.movieSearch(commandInput)
    }//command that that take a command from the random.txt file in which the value of the parameter command and commandInput will will be nested 
    else if (command === `do-what-it-says`) {
        fileSearch.doWhatItSays(command, commandInput)
    }
}
