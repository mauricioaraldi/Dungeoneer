/**
 * This module controls stair interactions
 *
 * @author mauricio.araldi
 * @since 0.3.0
 */
/* eslint-disable-next-line no-unused-vars */
const Stair = (() => {
	/**
	 * Generates a stair down in dungeon
	 *
	 * @author mauricio.araldi
	 * @since 0.3.0
	 *
	 * @param {Array<Array<string>>} dungeon The dungeon where to draw a stair down
	 * @param {integer} totalTries Number of tries before timing out the generation
	 * @param {integer} currentTry Number of current try
	 */
	function generateStairDown(dungeon, totalTries, currentTry) {
		// Controls the generation timeout
		if (currentTry === undefined) {
			currentTry = 0;
		} else if (currentTry === totalTries) { // Timeout
			throw new Error('FAILED TO GENERATE STAIR DOWN');
		}

		// Get random position
		const randomLine = Utils.numberBetween(0, dungeon.length),
			randomColumn = Utils.numberBetween(0, dungeon[0].length);

		// Verify if random position is a valid position for the stair down
		if (dungeon[randomLine][randomColumn] === Tiles.floor) {
			// Verify floor tiles around random position
			const directions = Utils.getValidDirections(dungeon, randomLine, randomColumn, ['T', 'R', 'B', 'L'], Tiles.floor);

			// If there is at least one floor tile, is valid
			if (directions.length > 0) {
				dungeon[randomLine][randomColumn] = Tiles.stairDown;
			} else {
				return generateStairDown(dungeon, totalTries, ++currentTry);
			}
		} else {
			return generateStairDown(dungeon, totalTries, ++currentTry);
		}

		return dungeon;
	}

	/**
	 * Generates a stair up in dungeon
	 *
	 * @author mauricio.araldi
	 * @since 0.3.0
	 *
	 * @param {Array<Array<string>>} dungeon The dungeon where to draw a stair up
	 * @param {integer} totalTries Number of tries before timing out the generation
	 * @param {integer} currentTry Number of current try
	 */
	function generateStairUp(dungeon, totalTries, currentTry) {
		// Controls the generation timeout
		if (currentTry === undefined) {
			currentTry = 0;
		} else if (currentTry === totalTries) { // Timeout
			throw new Error('FAILED TO GENERATE STAIR UP');
		}

		// Get random position
		const randomLine = Utils.numberBetween(0, dungeon.length),
			randomColumn = Utils.numberBetween(0, dungeon[0].length);

		// Verify if random position is a valid position for the stair up
		if (dungeon[randomLine][randomColumn] === Tiles.floor) {
			// 	Verify floor tiles around random position
			const directions = Utils.getValidDirections(dungeon, randomLine, randomColumn, ['T', 'R', 'B', 'L'], Tiles.floor);

			// If there is at least one floor tile, is valid
			if (directions.length > 0) {
				const initColumn = randomColumn - Values.roomMaxWidth < 0 ? 0 : randomColumn - Values.roomMaxWidth,
					initLine = randomLine - Values.roomMaxHeight < 0 ? 0 : randomLine - Values.roomMaxHeight;

				let endColumn = randomColumn + Values.roomMaxWidth,
					endLine = randomLine + Values.roomMaxHeight,
					hasStairDown = false;

				endColumn = endColumn > dungeon[0].length - 1 ? dungeon[0].length - 1 : endColumn;
				endLine = endLine > dungeon.length - 1 ? dungeon.length - 1 : endLine;

				// Verify stair bounds, to see if there is at least one max room size of distance from stair down
				for (let l = initLine; l <= endLine; l++) {
					for (let c = initColumn; c <= endColumn; c++) {
						if (dungeon[l][c] === Tiles.stairDown) {
							hasStairDown = true;
						}
					}
				}

				// If the position is valid, generate room
				if (!hasStairDown) {
					dungeon[randomLine][randomColumn] = Tiles.stairUp;
				} else {
					return generateStairUp(dungeon, totalTries, ++currentTry);
				}
			} else {
				return generateStairUp(dungeon, totalTries, ++currentTry);
			}
		} else {
			return generateStairUp(dungeon, totalTries, ++currentTry);
		}

		return dungeon;
	}

	return {
		generateStairDown,
		generateStairUp
	};
})();