var Skii = require('./skii.js');

var skii = Skii();

skii.load('map.txt');
var result = skii.run();



// using the result object to show the report
console.log('Best Length: %s',result.bestLength);
console.log('Best Drop: %s',result.bestDrop); 
console.log('Calculated in: ' + result.benchmark/1000 + ' seconds'); 