/*
* The algorithm and code is written by Pooria Atarzadeh (hello@pooria.co)
* A programming challenge by RedMart.com
* 
* I enjoyed every bit of my time solving this problem (most of it actually if I want to be accurate!)
* It took me near to three days to code (including writting tests and figuring out the algorithm)
* Thank you RedMart team!
*/
var fs = require('fs'),
	currentLength = 1,
	grid = [],
	NORTH = 0,
	EAST  = 1,
	SOUTH = 2,
	WEST  = 3,
	isDeadend,row,height,startPoint,finalLength=0,finalDrop=0,benchmark=0;
/**
* getter function for grid
* use this function to avoid changing grid manually
* @param {number} x - The x position on the grid
* @param {number} y - The y position on the grid
* @return {number} value on the grid
*/
var getValue = function(x, y){
	if (typeof grid[y] === 'undefined')
		return -1;
	else if (typeof grid[y][x] !== 'undefined')
		return grid[y][x];
	else 
		return -1;
}
/**
* Setter function for grid
* use this function to avoid changing grid manually
* @param {number} x - The x position on the grid
* @param {number} y - The y position on the grid
*/
var setValue = function(x, y, value){
	grid[y][x] = value;
}
/**
* Provide correct value for each direction
*
* @param {number} x - The x position on the grid
* @param {number} y - The y position on the grid
* @param {number} destionation - accepts 0-3 as the direction (North=0,EAST=1,SOUTH=2,WEST=3)
*/
var getDirection = function(x, y, destination){
	switch (destination) {
	case NORTH:
		return [x , y-1];
		break;
	case EAST:
		return [x+1 , y];
		break;
	case SOUTH:
		return [x , y+1];
		break;
	case WEST:
		return [x-1 , y];
		break;
	default:
		return -1;
	}	
}
/**
* Loading file from memory
*
* @param {string} address of the file containing crazy numbers from local
* @return {array} the grid array extracted from the given path
*/
var loadFile = function(addr) {
	// Read file
	var buffer = fs.readFileSync(addr).toString();

	buffer.split(/\r?\n/).forEach(function(line,index){
  		var lineArray = line.split(/\s/);
  		// extracting row and height from the first line
  		if(index === 0) {
  			row = parseInt(lineArray[0]);
  			height = parseInt(lineArray[1]);
  		} 
  		else { // reading other lines, converting strings to number and pushing to grid
  			var numArray = [];
  			for(var rowIndex=0; rowIndex<row; rowIndex++)
  				numArray.push(parseInt(lineArray[rowIndex]));
  			grid.push(numArray);
  		}
  	});
  	return grid;
}
/**
* Finding all the possible pathes from a single point on the matrix.
* Using recursive function to skii to the deepest part of the tree and calculating 
* other directions while skiing back to the root. Fantastic!
*
*
* @param {number} xPoint - the x value of starting point (root of the tree)
* @param {number} yPoint - the y value of starting point (root of the tree)
*/
var skiiFromPoint = function continueSkiing(xPoint, yPoint) {
	isDeadend = true;
	var	currentPoint,
		direction,
		nextPoint;

	currentPoint = getValue(xPoint , yPoint);
	// looping four directions (north,east,south,west)
	for(var dest=0; dest < 4; dest++) {
		direction = getDirection(xPoint, yPoint, dest);
		nextPoint = getValue.apply(undefined,direction);

		if(nextPoint < currentPoint && nextPoint !== -1) {
			// Increment length
			currentLength+=1;
			isDeadend = false;
			continueSkiing(direction[0], direction[1]);
		}
	}
	// if it was a deadend then record length and drop
	// then get back to surf remaining sibblings in the current tree back to the root
	if (isDeadend) {
		var currentDrop = startPoint - currentPoint;
		statsCheck(currentLength,currentDrop);

		// stepping back for one length (except for root)
		if(currentLength > 1)
			currentLength-=1;
	}

}
/**
* Initializing recursive skii function
*
* @param {number} x - The x position on the grid
* @param {number} y - The y position on the grid
*/
var skii = function(x, y) {
	// storing start point to calculate drop
	startPoint = getValue(x, y);
	// running recursive function to skii the point as deep as possible
	skiiFromPoint(x, y);
	// reset length 
	currentLength=1;
}
/**
* Looping all points on the map to find the best point with longest Length and Drop
*
*/
var checkoutPoints = function() {
	// start benchmarking (benchmarking is for fun!)
	var start = new Date().getTime();
	// surfing all the start points
	for (var x=0; x < row; x++)
		for (var y=0; y < height; y++)
			skii(x, y);

	// record benchmark
	var finish = new Date().getTime();
	benchmark = finish-start;
}
/**
* Comparing a specific point's best score to the all previous recorded scores
*
* @param {number} bestLength - the best length in one single starting point
* @param {number} bestDrop - the best drop in one single starting point
*/
var statsCheck = function(bestLength,bestDrop) {
	if(bestLength > finalLength || bestLength === finalLength && bestDrop > finalDrop) {
		finalLength = bestLength;
		finalDrop = bestDrop;
	}
	bestLength = 0;
	bestDrop = 0;
}

// Exporting module info
module.exports = function() {
	return {
		load: function(addr) {
			loadFile(addr);
			// makes the load method chainable
			return this;
		},
		run: function() {
			checkoutPoints();
			return {
				bestLength: finalLength,
				bestDrop: finalDrop,
				benchmark: benchmark
			}
		}
	}
}