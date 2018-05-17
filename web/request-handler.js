var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var httpHelpers = require('./http-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  
if (httpHelpers.actions[req.method]) {

    httpHelpers.actions[req.method](req, res);

}



// var indexHTML = archive.paths.siteAssets + '/index.html';
   
//   fs.readFile(indexHTML, function(err, data) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write(data);
//     res.end();
//   });
    
};
