var fs = require('fs');
var path = require('path');
var _ = require('underscore');


/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt'),
  indexHTML: path.join(__dirname, '../web/public/index.html'),
  loadingHTML: path.join(__dirname, '../web/public/loading.html') 
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  var urls = fs.readFileSync(exports.paths.list, 'utf8');
  var urlsSplit = urls.split('\n');

  callback(urlsSplit);
};

exports.isUrlInList = function(url, callback) {
  var urls = fs.readFileSync(exports.paths.list, 'utf8');
  var urlsSplit = urls.split('\n');

  for (var i = 0; i < urlsSplit.length; i++) {
    if (urlsSplit[i] === url) {
      callback(true)
      return true;
    }
  }
    callback(false);
    return false;

};

exports.addUrlToList = function(url, callback) {
  // add from POST from web service
  var fixturePath = exports.paths.list;
  fs.appendFileSync(fixturePath, url + '\n');
    if (callback !== undefined) {
      callback();
    }
   
};

exports.isUrlArchived = function(url, callback) {
  var fixturePath = exports.paths.archivedSites + '/' + url;
  if (fs.existsSync(fixturePath)) {
      if (callback !== undefined) {
           callback(true);
      }
      return true;
    // var asset = fixturePath + '/' + url + '.htm';
    // callback(res, asset, callback);
  } else {
     if (callback !== undefined) {
       callback(false);
     }
     return false;
  }
};

exports.downloadUrls = function(urls) {
  
  var filePath = exports.paths.archivedSites;
  for (var i = 0; i < urls.length; i++) {
    var url = urls[i].split('.')[1];
    fs.writeFile(filePath + '/' + urls[i], url, function() {
      console.log('downloadUrls ========');
    });
  }
};
