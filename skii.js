var fs = require('fs');

var grid = [];
var NORTH = 0;
var EAST  = 1;
var SOUTH = 2;
var WEST  = 3;
var row,height;

//////////////////////////////////////////////////////////// this is master branch
var grid_init = function() {
	// Read file
	var b = fs.readFileSync('testdata.txt').toString();

	b.split(/\r?\n/).forEach(function(line){
  		var lineArray = line.split(/\s/);
  		// Based on the protocol it should be the first line
  		if(lineArray.length === 2) {
  			row = parseInt(lineArray[0]);
  			height = parseInt(lineArray[1]);
  		} 
  		// Reading other lines, converting strings to number and pushing to grid
  		else {
  			var numArray = [];
  			for(var rowIndex=0; rowIndex<row; rowIndex++)
  				numArray.push(parseInt(lineArray[rowIndex]));
  			grid.push(numArray);
  		}
  	});
}
///////////////////////////////////////////////////////////////

var getValue = function(x, y){
	if (typeof(grid[x]) === 'undefined' || typeof(grid[y]) === 'undefined')
		return -1;
	else
		return grid[y][x];
}
var setValue = function(x, y, value){
	grid[y][x] = value;
}
var selectPoint = function(x, y, destination){
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

var skii = function(x , y) {
	//first get value
	var 
	currentPath = 1,
	startDrop,
	endDrop,
	pathList = [];

	startDrop = getValue(x, y);

	var _pathSurfer = function(xPoint, yPoint) {
		this.isDeadend = true;
		for(var destination=0; destination<4; destination++) {
			var currentPoint = getValue(xPoint , yPoint);
			var selectedPoint = selectPoint(xPoint, yPoint, destination);
			var nextPoint = getValue(selectedPoint[0], selectedPoint[1]);
			//console.log('selectedPoint: %s', selectedPoint);
			//console.log('nextPoint: %d', nextPoint);

			if(nextPoint < currentPoint && nextPoint !== -1) {
				// Increment path
				currentPath+=1;
				this.isDeadend = false;
				_pathSurfer(selectedPoint[0], selectedPoint[1]);
				
			}
		}
		// if it was a deadend record path and drop
		if (this.isDeadend) {
			var currentDrop = startDrop - currentPoint;
			pathList.push({path: currentPath, drop: currentDrop});
			// stepping back for one path
			currentPath-=1;
		}
	}

	_pathSurfer(x, y);
	console.log(pathList);

	// return {
	// 	path: A,
	// 	drop: B
	// };

}




grid_init();
for (var i=0; i<row; i++)
	for (var j=0; j<height; j++)
		skii(i, j);



// View grid
//console.log(grid);
