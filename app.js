var Skii = require('./skiii.js');


var skii = Skii();

skii.load('testdata.txt');
var result = skii.run();

console.log(result.bestLength);
console.log(result.bestDrop); 
console.log('Finsihed in: ' + result.benchmark/1000 + ' seconds'); 


//console.log(grid);
