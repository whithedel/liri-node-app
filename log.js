var fs = require(`fs`)
// function that will create the text file log.txt once created it will log the result from the api of the command we will be passing 
var readData = function readData(dataToBeLogged, dataToBeLoggedFormatted) {
    //check if txt file exist 
    if (!fs.existsSync(`./log.txt`)) {
        //creates an empty txt file if it doesn't exist 
        fs.writeFile("./log.txt", "", function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("The file was created!");
        })
    };

    //will append to the txt file then console
    fs.appendFile(`./log.txt`, dataToBeLogged, function (error) {
        if (error) {
            console.log(error)
        }
        console.log(dataToBeLoggedFormatted);
    })
}

module.exports = readData