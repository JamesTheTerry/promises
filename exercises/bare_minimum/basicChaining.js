/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var promHelpers = require('./promisification');
Promise.promisifyAll(fs);
var promConHelpers = require('./promiseConstructor');

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return promConHelpers.pluckFirstLineFromFileAsync(readFilePath)
  .then((githubProfile) => {
    return promHelpers.getGitHubProfileAsync(githubProfile);
  })
  .then((response) => {
    return fs.writeFileAsync(writeFilePath, JSON.stringify(response));
  })
  .catch((err) => {
    console.log('Oops, caught an error: ', err.message);
  });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
