var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  console.log(`Serving a ${req.method} request.`);
  res.end(archive.paths.list);
};
