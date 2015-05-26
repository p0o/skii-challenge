var fs = require('fs'),
	currentPath = 1,
	startDrop,
	endDrop,
	pathList = [],
	grid = [],
	NORTH = 0,
	EAST  = 1,
	SOUTH = 2,
	WEST  = 3,
	row,height;
/**
* getter function for grid
* use this function to avoid changing grid manually
*/
var getValue = function(x, y){
	if (typeof(grid[x]) === 'undefined' || typeof(grid[y]) === 'undefined')
		return -1;
	else
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
/**
* provide correct value for each direction
*
*/
var selectDirection = function(x, y, destination){
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

module.exports = function() {
	return {
		load: function(addr) {
			return loadFile(addr);
		},
		ski: function() {
			
		}
	}
}