var Search = require("./apicalls.js");
var fs =require(`fs`)
var search = new Search.search();
var fileSearch = new Search.fileSearch
runApp()

function runApp(){
    var arguments = process.argv
    var command = arguments[2]
    var commandInput = arguments.slice(3).join(" ");
    if (isValidArgv(arguments)){
        parseArguments(command, commandInput)
    }
}


function isValidArgv(argv){
    var commandList = new Set([`concert-this`,`spotify-this-song`,`movie-this`,`do-what-it-says`])
    var userCommand = argv[2]
    if (argv.length < 3 ){
        console.log(`Error: Not enough arguments in command line`)
        return false 
    }
    else if(!commandList.has(userCommand) ){
        console.log(`Error: Invalid argument`)
        return false 
    }
    return true
}
function parseArguments(command, commandInput){

    if (command === `concert-this`){
        search.BandsInTown(commandInput)
    }
    else if (command === `spotify-this-song`){
        search.spotify(commandInput)
    }
    else if (command === `movie-this`){
        if (commandInput === ''){
            commandInput = `Mr. Nobody`
        }
        search.movieSearch(commandInput)
    }
    else if (command === `do-what-it-says`){
        fileSearch.doWhatItSays(command,commandInput)
    }
}
