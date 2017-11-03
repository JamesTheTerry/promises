/**
 * Using Promise.all, write a function, combineFirstLineOfManyFiles, that:
 *    1. Reads each file at the path in the `filePaths` array
 *    2. Plucks the first line of each file
 *    3. Joins each first line into a new file
 *      - The lines should be in the same order with respect to the input array
 *      - i.e. the second line in the new file should be the first line of `filePaths[1]`
 *    4. Writes the new file to the file located at `writePath`
 */

var fs = require('fs');
var Promise = require('bluebird');
var promConHelpers = require('../bare_minimum/promiseConstructor');
Promise.promisifyAll(fs);

var combineFirstLineOfManyFiles = function(filePaths, writePath) {

  var firstLines = [];
  for (var i = 0; i < filePaths.length; i++) {
    firstLines.push(promConHelpers.pluckFirstLineFromFileAsync(filePaths[i]));
  }

  return Promise.all(firstLines)
    .then((firstLineArray) => {
      return firstLineArray.join('\n');
    })
    .then((dataToWrite) => {
      return fs.writeFileAsync(writePath, dataToWrite, 'utf8');
    })
    .catch((err) => {
      console.log('Error: ', err.message);
    });
};

// Export these functions so we can unit test them
module.exports = {
  combineFirstLineOfManyFiles: combineFirstLineOfManyFiles
};
