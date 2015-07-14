//helper file for stashing functions to be performed on user data

var profile = require("./profile.js");

var parser = function (username, resBody, code, codeDef) {
	if (code === 200) {
		try {
			var resParse = JSON.parse(resBody);
			// calculates and prints out class with the most points 
			// and prints out information
			var topPoints = 0;
			var topClass = "";
			for (key in resParse.points) {
				if (resParse.points[key] > topPoints && !(key === "total")) {
					topPoints = resParse.points[key];
					topClass = key;
				}
			}
			printMessage(username, resParse.badges.length, topPoints, topClass);
		}
		//parse error
		catch (error) {
			printError(error);
		}
	}
	//retrieval error
	else {
		printError({message: "There was a problem retrieving profile for " + username + ". (" + codeDef + ")"});
	}
}

var printMessage = function(username, badgeCount, topPoints, topClass) {
	var message = username + " has " + badgeCount + " total badges. and " + topPoints + " points in " + topClass + ".";
	console.log(message);
}

var printError = function (error) {
	console.error(error.message);
}

module.exports.parser = parser;
module.exports.printError = printError;
module.exports.printMessage = printMessage;
