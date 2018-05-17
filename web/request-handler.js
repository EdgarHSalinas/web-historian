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
    } else {
      var googlePath = path.join(__dirname, '../archives/sites/google/Google.htm');
      
      fs.readFile(googlePath, function(err, data) {
        if (err) { throw err; }

        res.writeHead(200, httpHelpers.headers);
        res.write(data);
        res.end();
      });
    }
  }

};



exports.handleRequest = function (req, res) {
  var requestMethod = actions[req.method];
  if (requestMethod) {
    requestMethod(req, res);
  }    
};
