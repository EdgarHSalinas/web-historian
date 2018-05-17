var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  
  fs.readFile(asset, function(err, data) {
    res.writeHead(statusCode, headers);
    res.write(data);
    res.end();
  });
  
};

exports.sendResponse = function(res, statusCode = 200) {
  
  

  
};

exports.collectData = function() {
// WRITE THE FUNCTION
};

exports.actions = {
  'GET': function(req, res) {
   if (req.url === '/') {
    fs.readFile('/Users/student/code/hrsf96-web-historian/web/public/index.html', function(err, data) {
      res.writeHead(200, exports.headers);
      res.write(data);
      res.end();
    }); 
   } else {
     archive.isUrlArchived(req.url, exports.serveAssets);
     }
  },
  // 'POST': function(req, res) {
  //   collectData(req, function() {
      
  //   });
  // }

};

// As you progress, keep thinking about what helper functions you can put here!
