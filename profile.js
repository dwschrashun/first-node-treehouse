//helper file to manage connection and retrieval of user data

var http = require("http");
var funcs = require("./funcs");

var get = function (username) {
	var request = http.get("http://teamtreehouse.com/" + username + ".json", function (response) {
		var codeDef = http.STATUS_CODES[response.statusCode];
		var resBody = "";
		response.on("data", function (chunk) {
			resBody += chunk;
		});
		response.on("end", function () {
			funcs.parser(username, resBody, response.statusCode, codeDef);
		});
	});
	//connection error
	request.on("error", funcs.printError);
}

module.exports.get = get;

