/**
 * Utilities used by all the app
 *
 * @author mauricio.araldi
 * @since 0.3.0
 */
Utils = (() => {
	/**
	 * Finds and return a number between two numers
	 * 
	 * @author mauricio.araldi
	 * @since 0.3.0
	 * 
	 * @param {integer} min The minimum limit for the number who will be generated
	 * @param {integer} max The maximum limit for the number who will be generated
	 * @return {integer} The generated number
	 */
	function numberBetween(min, max) { //TODO Find a better logic
		let num = Math.random(); //Generate random number

		num = num * max; //Limitate it to the maximum
		num = Math.floor(num) + min; //Adds the minimum
		
		//Verify if is not above the max
		if (num > max) {
			return max; //If it is, returns max itself
		}
		
		return num;
	}

	/**
	 * Get random cordinates from map, ensuring that they are valid
	 * to generate a room or a corridor
	 *
	 * @author mauricio.araldi
	 * @since 0.3.0
	 *
	 * @param {Array<Array<string>>} map The map from where to get cordinates
	 * @return {Array<integer>} Random valid cordinates from map
	 */
	function getRandomValidCordinates(map) {
		const randomLine = Utils.numberBetween(0, map.length),
			randomColumn = Utils.numberBetween(0, map[0].length);
		
		//Verify if the random cordinate is a floor tile
		if (map[randomLine][randomColumn] == Tiles.floor) {
			const directions = getValidDirections(map, randomLine, randomColumn, ['T', 'R', 'B', 'L'], Tiles.wall);
			
			if (directions.length > 0) {
				return [randomLine, randomColumn];
			}
		}
		
		return false;
	}

	/**
	 * Get valid directions from a specific point of map, accordingly
	 * to what is expected
	 *
	 * @author mauricio.araldi
	 * @since 0.3.0
	 *
	 * @param {Array<Array<string>>} map The map from where to get cordinates
	 * @param {integer} line The line cordinate of position
	 * @param {integer} column The column cordinate of position
	 * @param {Array<String>} directionsToTest Directions to be verified
	 * @param {Array<String>} expected Directions expected to be valid (at least one)
	 * @return {Array<String>} All expected and tested valid directions
	 */
	function getValidDirections(map, line, column, directionsToTest, expected) {
		let returnDirections = []

		for (let d in directionsToTest) {	
			const direction = [directionsToTest[d]];

			if (verifyAround(map, line, column, direction, expected)) {
				returnDirections.push(direction[0]);
			}
		}
		
		return returnDirections;
	}

	/**
	 * Scans a rect veryfing if the content is what is expected
	 *
	 * @author mauricio.araldi
	 * @since 0.3.0
	 *
	 * @param {Array<Array<string>>} map The map to be scanned
	 * @param {integer} initLine Initial line of rect
	 * @param {integer} initColumn Initial column of rect
	 * @param {integer} endLine Final line of rect
	 * @param {integer} endColumn Final column of rect
	 * @param {string} expected The expected content of rect
	 * @return {boolean} True if the scanned rect contains expected content
	 */
	function scanRect(map, initLine, initColumn, endLine, endColumn, expected) {
		for (let l = initLine; l <= endLine; l++) {
			for (let c = initColumn; c <= endColumn; c++) {
				if (map[l][c] != expected) {
					return false;
				}
			}
		}

		return true;
	}

	/**
	 * Scans a square around a point (8 tiles) for expected content
	 *
	 * @author mauricio.araldi
	 * @since 0.3.0
	 *
	 * @param {Array<Array<string>>} map The map to be scanned
	 * @param {integer} line Line number of point to be scanned
	 * @param {integer} column Column number of point to be scanned
	 * @param {Array<string>} directions Directions to be scanned
	 * @param {string} expected The expected content of scanned directions
	 * @return {boolean} True if the scanned directions contains expected content
	 */
	function verifyAround(map, line, column, directions, expected) {
		if ((line > 0 && line < Values.lines - 1)
			&& (column > 0 && column < Values.columns - 1)) {

			/* Top */
			if (directions.indexOf('TL') > -1) { //Top Left
				if (map[line-1][column-1] != expected) {
					return false;
				} 
			}
			
			if (directions.indexOf('T') > -1) { //Top
				if (map[line-1][column] != expected) {
					return false;
				} 
			}
			
			if (directions.indexOf('TR') > -1) { //Top Right
				if (map[line-1][column+1] != expected) {
					return false;
				} 
			}
			/* End Top */
			
			/* Middle */
			if (directions.indexOf('L') > -1) { //Left
				if (map[line][column-1] != expected) {
					return false;
				} 
			}
			
			if (directions.indexOf('C') > -1) { //Center
				if (map[line][column] != expected) {
					return false;
				} 
			}
			
			if (directions.indexOf('R') > -1) { //Right
				if (map[line][column+1] != expected) {
					return false;
				} 
			}
			/* End Middle */
			
			/* Bottom */
			if (directions.indexOf('BL') > -1) { //Bottom Left
				if (map[line+1][column-1] != expected) {
					return false;
				} 
			}
			
			if (directions.indexOf('B') > -1) { //Bottom
				if (map[line+1][column] != expected) {
					return false;
				} 
			}
			
			if (directions.indexOf('BR') > -1) { //Bottom Right
				if (map[line+1][column+1] != expected) {
					return false;
				} 
			}
			/* End Bottom */
			
			return true;
		} else {
			return false;
		}
	}

	/**
	 * Fills a rect with content
	 *
	 * @author mauricio.araldi
	 *
	 * @param {string} content The content to fill rect
	 * @param {Array<Array<string>>} map The map where to get the area
	 * @param {integer} initLine Initial line of rect
	 * @param {integer} initColumn Initial column of rect
	 * @param {integer} endLine Final line of rect
	 * @param {integer} endColumn Final column of rect
	 * @return {Array<Array<string>>} Map with the rect filles
	 */
	function fillRect(content, map, initLine, initColumn, endLine, endColumn) {
		for (let l = initLine; l <= endLine; l++) {
			for (let c = initColumn; c <= endColumn; c++) {
				map[l][c] = content;
			}
		}
		
		return map;
	}

	return {
		getRandomValidCordinates,
		getValidDirections,
		fillRect,
		numberBetween,
		scanRect,
		verifyAround
	}
})();