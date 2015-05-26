var Skii = require('./skiii.js');


var skii = Skii();
var grid = skii.load('testdata.txt');
var result = skii.run();

console.log(result.bestLength);
console.log(result.bestDrop); 


//console.log(grid);
