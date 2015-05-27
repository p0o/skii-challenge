var assert = require('assert');
var Skii = require('../skii.js');

/**
* Testing the core functionality with some pre-made data files
*
* Just to make sure everything is working fine!
*/
describe('Skii in Singapore - Test Suit', function(){
	var result,fileNumber=0;

	beforeEach(function() {
		fileNumber+=1;
		var skii = Skii();
		skii.load('./data/test-' + fileNumber + '.txt');
		result = skii.run();
	});


	describe('Testing with a graph of isolated vertices',function() {
		//test-1.txt
		it('should have: length=1, drop=0', function() { 
			assert.equal(result.bestLength,1);
			assert.equal(result.bestDrop,0);
		});
	});
	describe('Testing with a forest of nodes (maximum degree 1)',function() {
		//test-2.txt
		it('should have: length=2, drop=1', function() {
			assert.equal(result.bestLength,2);
			assert.equal(result.bestDrop,1);
		});
		//test-3.txt
		it('should have: length=2, drop=4', function() {
			assert.equal(result.bestLength,2);
			assert.equal(result.bestDrop,4);
		});
		//test-4.txt
		it('should have: length=2, drop=7', function() {
			assert.equal(result.bestLength,2);
			assert.equal(result.bestDrop,7);
		});
		//test-5.txt
		it('should have: length=2, drop=9', function() {
			assert.equal(result.bestLength,2);
			assert.equal(result.bestDrop,9);
		});
	});
	describe('Testing with a forest of nodes (maximum length 2)',function() {
		//test-6.txt
		it('should have: length=3, drop=2',function() {
			assert.equal(result.bestLength,3);
			assert.equal(result.bestDrop,2);
		});
	});
	describe('Testing with a forest of nodes (maximum length 2)',function() {
		//test-7.txt
		it('should have: length=3, drop=3',function() {
			assert.equal(result.bestLength,3);
			assert.equal(result.bestDrop,3);
		});
	});
	describe('Testing with the reverse forest of nodes (maximum length 2)',function() {
		//test-8.txt
		it('should have: length=3, drop=3',function() {
			assert.equal(result.bestLength,3);
			assert.equal(result.bestDrop,3);
		});
	});
	describe('Testing with a forest of nodes with 2 leaves (maximum length 3)',function() {
		//test-9.txt
		it('should have: length=4, drop=4',function() {
			assert.equal(result.bestLength,4);
			assert.equal(result.bestDrop,4);
		});
	});
	describe('Testing with a reverse forest of nodes with 2 leaves (maximum length 3)',function() {
		//test-10.txt
		it('should have: length=4, drop=4',function() {
			assert.equal(result.bestLength,4);
			assert.equal(result.bestDrop,4);
		});
	});
	describe('Testing with larger forest of nodes (maxium length +3)',function() {
		//test-11.txt
		it('should have: length=10, drop=9',function() {
			assert.equal(result.bestLength,10);
			assert.equal(result.bestDrop,9);
		});
		//test-12.txt
		it('should have: length=15, drop=14',function() {
			assert.equal(result.bestLength,15);
			assert.equal(result.bestDrop,14);
		});
	});

	afterEach(function() {
		// Deleting module cache to try a new file
		delete require.cache[require.resolve('../skiii.js')];
		Skii = require('../skiii.js');
	});
});