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
      var url = req.url.slice(1);
      if (archive.isUrlArchived(url)) {
        var filePath = path.join(__dirname, '../archives/sites', url); 
        fs.readFile(filePath, function(err, data) {
            if (err) { throw err; }
            res.writeHead(200, httpHelpers.headers);
            res.write(data);
            res.end();
        });  
      } else {
          res.writeHead(404, httpHelpers.headers);
          res.end('Not Found');
      }
    }
  },
  'POST': function(req, res) {
      var data = '';
      req.on('data', function(chunk) {
        data += chunk;
       
        data = data.split('='); 
        data = data[1];
        console.log('DATA ********* ' + data);
      });
      req.on('end', function() {
        
        archive.addUrlToList(data);
        res.writeHead(302, httpHelpers.headers);
        res.end('Found');
      });
      

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
