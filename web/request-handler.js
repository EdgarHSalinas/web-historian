var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var httpHelpers = require('./http-helpers');
// require more modules/folders here!

var actions = {
  'GET': function(req, res) {
    if (req.url === '/') {
      var indexHTMLPath = archive.paths.indexHTML;
    
      fs.readFile(indexHTMLPath, function(err, data) {
        if (err) { throw err; }

        res.writeHead(200, httpHelpers.headers);
        res.write(data);
        res.end();
      });
    // I KNOW THE PROBLEM NOW, I SHOULDN'T PUT EVERYTHING IN THE GET REQUEST
    } else {
      var url = req.url;
      var filePath = path.join(__dirname, '../archives/sites', url, url);
      
      fs.readFile(filePath, function(err, data) {
        if (err) { throw err; }

        res.writeHead(200, httpHelpers.headers);
        res.write(data);
        res.end();
      });
    }
  }

};



exports.handleRequest = function (req, res) {
  console.log(`The method is: ${req.method}`);
  console.log(`The url is: ${req.url}`);
  var requestMethod = actions[req.method];
  if (requestMethod) {
    requestMethod(req, res);
  }    
};
