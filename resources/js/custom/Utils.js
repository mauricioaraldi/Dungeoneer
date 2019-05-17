/**
 * Utilities used by all the app
 *
 * @author mauricio.araldi
 * @since 0.3.0
 */
/* eslint-disable-next-line no-unused-vars */
const Utils = (() => {
	/**
	 * Finds and return a number between two numers
	 *TODO
	 * @author mauricio.araldi
	 * @since 0.3.0
	 *
	 * @param {integer} min The minimum limit for the number who will be generated
	 * @param {integer} max The maximum limit for the number who will be generated
	 * @return {integer} The generated number
	 */
	function numberBetween(min, max) { // TODO Find a better logic
		let num = Math.random(); // Generate random number

		num = num * max; // Limitate it to the maximum
		num = Math.floor(num) + min; // Adds the minimum

		// Verify if is not above the max
		if (num > max) {
			return max; // If it is, returns max itself
		}

		return num;
	}

	/**
	 * Get random cordinate from dungeon, where something can be build. If there is at least
	 * one building arealdy, start from it. If there's not, get a completely random coordinate;
	 *
	 * @author mauricio.araldi
	 * @since 0.4.0
	 *
	 * @param {Array<Array<string>>} dungeon The dungeon from where to get cordinates
	 * @param {integer} [width] Width of the building
	 * @param {integer} [height] Height of the building
	 * @return {Array<integer>} Random valid cordinates from dungeon
	 */
	function getRandomBuildableCoordinate(dungeon, width, height) {
		if (!dungeon) {
			throw Error('Parameter dungeon is required');
		}

		if (!Content.rooms.length) {
			const randomLine = Utils.numberBetween(0, dungeon.length),
				randomColumn = Utils.numberBetween(0, dungeon[0].length),
				endLine = randomLine + height,
				endColumn = randomColumn + width;

			if (scanRect(dungeon, randomLine, randomColumn, endLine, endColumn, Tiles.wall)) {
				return new BuildableCoordinateModel(
					randomLine,
					randomColumn,
					getBuildableDirections(dungeon, randomLine, randomColumn)
				);
			}

			return getRandomBuildableCoordinate(dungeon, width, height);
		}

		const possibleBuildableAreas = [],
			buildings = [...Content.rooms, ...Content.corridors];

		buildings.forEach(building => {
			if (building.buildableAreas.length) {
				possibleBuildableAreas.concat(building.buildableAreas);
			}
		});

		console.log('buildings', buildings, possibleBuildableAreas);
		return [1, 1];

		// if (dungeon[randomLine][randomColumn] === Tiles.floor) {
		// 	const directions = getValidDirections(dungeon, randomLine, randomColumn, ['T', 'R', 'B', 'L'], Tiles.wall);

		// 	if (directions.length > 0) {
		// 		return [randomLine, randomColumn];
		// 	}
		// }

		// return getRandomValidCordinates(dungeon);
	}

	/**
	 * Get valid directions from a specific coordinate, accordingly to what is expected
	 *
	 * @author mauricio.araldi
	 * @since 0.4.0
	 *
	 * @param {Array<Array<string>>} dungeon The dungeon which to be used to verify
	 * @param {integer} line The line cordinate of position
	 * @param {integer} column The column cordinate of position
	 * @param {Array<string>} [directionsToTest] Directions to be verified
	 * @param {Array<string>} [expected] Tile which is considered valid
	 * @return {Array<string>} All expected and tested valid directions
	 */
	function getBuildableDirections(dungeon, line, column, directionsToTest, expected = Tiles.wall) {
		if (!directionsToTest || !directionsToTest.length) {
			directionsToTest = [
				Directions.BOTTOM,
				Directions.BOTTOM_LEFT,
				Directions.BOTTOM_RIGHT,
				Directions.CENTER,
				Directions.LEFT,
				Directions.RIGHT,
				Directions.TOP,
				Directions.TOP_LEFT,
				Directions.TOP_RIGHT
			];
		}

		return directionsToTest.filter(direction => verifyAround(dungeon, line, column, direction, expected));
	}

	/**
	 * Scans a rect veryfing if the content is what is expected
	 *TODO
	 * @author mauricio.araldi
	 * @since 0.3.0
	 *
	 * @param {Array<Array<string>>} dungeon The dungeon to be scanned
	 * @param {integer} initLine Initial line of rect
	 * @param {integer} initColumn Initial column of rect
	 * @param {integer} endLine Final line of rect
	 * @param {integer} endColumn Final column of rect
	 * @param {string} expected The expected content of rect
	 * @return {boolean} True if the scanned rect contains expected content
	 */
	function scanRect(dungeon, initLine, initColumn, endLine, endColumn, expected) {
		for (let l = initLine; l < endLine; l++) {
			for (let c = initColumn; c < endColumn; c++) {
				if (!dungeon[l] || !dungeon[l][c] || dungeon[l][c] !== expected) {
					return false;
				}
			}
		}

		return true;
	}

	/**
	 * Scans a square around a point (8 tiles) for expected content
	 *TODO
	 * @author mauricio.araldi
	 * @since 0.4.0
	 *
	 * @param {Array<Array<string>>} dungeon The dungeon to be scanned
	 * @param {integer} line Line number of point to be scanned
	 * @param {integer} column Column number of point to be scanned
	 * @param {Array<string>} directions Directions to be scanned
	 * @param {string} expected The expected content of scanned directions
	 * @return {boolean} True if the scanned directions contains expected content
	 */
	function verifyAround(dungeon, line, column, directions, expected) {
		if (
			(line > 0 && line < Values.lines - 1)
			&& (column > 0 && column < Values.columns - 1)
		) {
			/* Top */
			if (directions.indexOf(Directions.TOP_LEFT) > -1) {
				if (dungeon[line - 1] && dungeon[line - 1][column - 1] !== expected) {
					return false;
				}
			}

			if (directions.indexOf(Directions.TOP) > -1) {
				if (dungeon[line - 1] && dungeon[line - 1][column] !== expected) {
					return false;
				}
			}

			if (directions.indexOf(Directions.TOP_RIGHT) > -1) {
				if (dungeon[line - 1] && dungeon[line - 1][column + 1] !== expected) {
					return false;
				}
			}
			/* End Top */

			/* Middle */
			if (directions.indexOf(Directions.LEFT) > -1) {
				if (dungeon[line][column - 1] !== expected) {
					return false;
				}
			}

			if (directions.indexOf(Directions.CENTER) > -1) {
				if (dungeon[line][column] !== expected) {
					return false;
				}
			}

			if (directions.indexOf(Directions.RIGHT) > -1) {
				if (dungeon[line][column + 1] !== expected) {
					return false;
				}
			}
			/* End Middle */

			/* Bottom */
			if (directions.indexOf(Directions.BOTTOM_LEFT) > -1) {
				if (dungeon[line + 1] && dungeon[line + 1][column - 1] !== expected) {
					return false;
				}
			}

			if (directions.indexOf(Directions.BOTTOM) > -1) {
				if (dungeon[line + 1] && dungeon[line + 1][column] !== expected) {
					return false;
				}
			}

			if (directions.indexOf(Directions.BOTTOM_RIGHT) > -1) {
				if (dungeon[line + 1] && dungeon[line + 1][column + 1] !== expected) {
					return false;
				}
			}
			/* End Bottom */

			return true;
		}

		return false;
	}

	/**
	 * Fills a rect with content
	 *
	 * @author mauricio.araldi
	 *TODO
	 * @param {string} content The content to fill rect
	 * @param {Array<Array<string>>} dungeon The dungeon where to get the area
	 * @param {integer} initLine Initial line of rect
	 * @param {integer} initColumn Initial column of rect
	 * @param {integer} [endLine] Final line of rect
	 * @param {integer} [endColumn] Final column of rect
	 * @return {Array<Array<string>>} dungeon with the rect filles
	 */
	function fillRect(content, dungeon, initLine, initColumn, endLine = initLine, endColumn = initColumn) {
		for (let l = initLine; l <= endLine; l++) {
			for (let c = initColumn; c <= endColumn; c++) {
				if (!dungeon[l] || !dungeon[l][c]) {
					throw Error(`Invalid coordinate ${initLine},${initColumn} ${endLine},${endColumn}`);
				}

				dungeon[l][c] = content;
			}
		}

		return dungeon;
	}

	/**
	 * Get borders of a rect
	 *
	 * @author mauricio.araldi
	 * @since 0.4.0
	 *
	 * @param {Array<Array<string>>} dungeon The dungeon from where to get borders coordinates
	 * @param {integer} initLine The initial line coordinate of rect
	 * @param {integer} initColumn The initial column coordinate of rect
	 * @param {integer} endLine The final line coordinate of rect
	 * @param {integer} endColumn The final column coordinate of rect
	 * @return {Array<BuildableCoordinateModel>} The buildable coordinates of rect
	 */
	function getBordersCoordinates(dungeon, initLine, initColumn, endLine, endColumn) {
		const buildableCoordinates = [];

		for (let l = initLine; l <= endLine; l++) {
			for (let c = initColumn; c <= endColumn; c++) {
				if (
					l === initLine
					|| l === endLine
					|| c === initColumn
					|| c === endColumn
				) {
					buildableCoordinates.push(
						new BuildableCoordinateModel(l, c, getBuildableDirections(dungeon, l, c))
					);
				}
			}
		}
	}

	return {
		getBordersCoordinates,
		getRandomBuildableCoordinate,
		getBuildableDirections,
		fillRect,
		numberBetween,
		scanRect,
		verifyAround
	};
})();