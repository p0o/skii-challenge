var fs = require('fs'),
	currentPath = 1,
	grid = [],
	NORTH = 0,
	EAST  = 1,
	SOUTH = 2,
	WEST  = 3,
	row,height,startPoint,finalPath=0,finalDrop=0;
/**
* getter function for grid
* use this function to avoid changing grid manually
*/
var getValue = function(x, y){
	if (typeof grid[y] === 'undefined')
		return -1;
	else if (typeof grid[y][x] !== 'undefined')
			return grid[y][x];
}
/**
* setter function for grid
* use this function to avoid changing grid manually
*/
var setValue = function(x, y, value){
	grid[y][x] = value;
}
/**
* provide correct value for each direction
*
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
* loading file from memory
*
* @param: {string} address of the file containing crazy numbers from local
* @return: {array} the grid array extracted from the given path
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

var skiiFromPoint = function continueSkiing(xPoint, yPoint) {
	this.isDeadend = true;
	var	currentPoint,
		direction,
		nextPoint;

	currentPoint = getValue(xPoint , yPoint);
	// looping four directions (north,east,south,west)
	for(var dest=0; dest < 4; dest++) {
		direction = getDirection(xPoint, yPoint, dest);
		nextPoint = getValue.apply(undefined,direction);
		//console.log('nextPoint: %s', nextPoint);
		//console.log('nextPoint: %d', nextPoint);
		if(nextPoint < currentPoint && nextPoint !== -1) {
			// Increment path
			currentPath+=1;
			this.isDeadend = false;
			continueSkiing(direction[0], direction[1]);
		}
	}
	// if it was a deadend then record path and drop
	// then get back to surf other pathes in the tree
	if (this.isDeadend) {
		var currentDrop = startPoint - currentPoint;

		statsCheck(currentPath,currentDrop);
		//console.log('startPoint:%s currentPoint:%s',startPoint,currentPoint);
		//console.log('bestPath:%s bestDrop:%s',currentPath,currentDrop);
		// stepping back for one path
		if(currentPath > 1)
			currentPath-=1;
	}

}

var checkoutPoints = function() {
	var that={};

	for (var i=0; i < row; i++)
		for (var j=0; j < height; j++) {
			startPoint = getValue(i, j);
			skiiFromPoint.call(that,i, j);
			currentPath=1;
		}
}

var statsCheck = function(bestPath,bestDrop) {
	if(bestPath > finalPath || bestPath === finalPath && bestDrop > finalDrop) {
		finalPath = bestPath;
		finalDrop = bestDrop;
	}
	bestPath = 0;
	bestDrop = 0;
}

// Exporting module info
module.exports = function() {
	return {
		load: function(addr) {
			return loadFile(addr);
		},
		run: function() {
			checkoutPoints();
			return {
				bestLength: finalPath,
				bestDrop: finalDrop
			}
		}
	}
}