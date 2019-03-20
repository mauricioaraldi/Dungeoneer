/**
 * This module controls stair interactions
 *
 * @author mauricio.araldi
 * @since 0.3.0
 */
Stair = (() => {
	/**
	 * Generates a stair down in map
	 *
	 * @author mauricio.araldi
	 * @since 0.3.0
	 *
	 * @param {Array<Array<string>>} map The map where to draw a stair down
	 * @param {integer} totalTries Number of tries before timing out the generation
	 * @param {integer} currentTry Number of current try
	 */
	function generateStairDown(map, totalTries, currentTry) {
		//Controle the generation timeout
		if (currentTry == undefined) {
			currentTry = 0;
		} else if (currentTry == totalTries) { //Timeout
			console.error('FAILED TO GENERATE STAIR DOWN');
			return map;
		}

		//Get random position
		let randomLine = Utils.numberBetween(0, map.length),
			randomColumn = Utils.numberBetween(0, map[0].length);
		
		//Verify if random position is a valid position for the stair down
		if (map[randomLine][randomColumn] == Tiles.floor) {
			//Verify floor tiles around random position
			let directions = Utils.getValidDirections(map, randomLine, randomColumn, ['T', 'R', 'B', 'L'], Tiles.floor);
			
			//If there is at least one floor tile, is valid
			if (directions.length > 0) {
				map[randomLine][randomColumn] = Tiles.stairDown;
			} else {
				return generateStairDown(map, totalTries, ++currentTry);
			}
		} else {
			return generateStairDown(map, totalTries, ++currentTry);
		}
		
		return map;
	}

	/**
	 * Generates a stair up in map
	 *
	 * @author mauricio.araldi
	 * @since 0.3.0
	 *
	 * @param {Array<Array<string>>} map The map where to draw a stair up
	 * @param {integer} totalTries Number of tries before timing out the generation
	 * @param {integer} currentTry Number of current try
	 */
	function generateStairUp(map, totalTries, currentTry) {
		//Controle the generation timeout
		if (currentTry == undefined) {
			currentTry = 0;
		} else if (currentTry == totalTries) { //Timeout
			console.error('FAILED TO GENERATE STAIR UP');
			return map;
		}

		//Get random position
		let randomLine = Utils.numberBetween(0, map.length),
			randomColumn = Utils.numberBetween(0, map[0].length);
		
		//Verify if random position is a valid position for the stair up
		if (map[randomLine][randomColumn] == Tiles.floor) {
			//Verify floor tiles around random position
			let directions = Utils.getValidDirections(map, randomLine, randomColumn, ['T', 'R', 'B', 'L'], Tiles.floor);
			
			//If there is at least one floor tile, is valid
			if (directions.length > 0) {
				let initColumn = randomColumn - Values.roomMaxWidth < 0 ? 0 : randomColumn - Values.roomMaxWidth, 
					initLine = randomLine - Values.roomMaxHeight < 0 ? 0 : randomLine - Values.roomMaxHeight,
					endColumn = randomColumn + Values.roomMaxWidth, 
					endLine = randomLine + Values.roomMaxHeight,
					hasStairDown = false;
					
					endColumn = endColumn > map[0].length - 1 ? map[0].length - 1 : endColumn;
					endLine = endLine > map.length - 1 ? map.length - 1 : endLine;
				
				//Verify stair bounds, to see if there is at least one max room size of distance from stair down
				for (let l = initLine; l <= endLine; l++) {
					for (let c = initColumn; c <= endColumn; c++) {
						if (map[l][c] == Tiles.stairDown) {
							hasStairDown = true;
						}
					}
				}
				
				//If the position is valid, generate room
				if (!hasStairDown) {
					map[randomLine][randomColumn] = Tiles.stairUp;
				} else {
					return generateStairUp(map, totalTries, ++currentTry);
				}
			} else {
				return generateStairUp(map, totalTries, ++currentTry);
			}
		} else {
			return generateStairUp(map, totalTries, ++currentTry);
		}
		
		return map;
	}

	return {
		generateStairDown,
		generateStairUp
	}
})();