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
	 * @param {boolean} [interpolate] If the room can be joined with other rooms
	 * @param {integer} currentTry Current try in getting a random coordinate
	 * @return {Array<integer>} Random valid cordinates from dungeon
	 */
	function getRandomBuildableCoordinate(dungeon, width, height, interpolate, currentTry = 0) {
		if (!dungeon) {
			throw Error('Parameter dungeon is required');
		}

		if (typeof width === 'boolean') {
			interpolate = width;
			width = undefined;
		}

		const possibleBuildableAreas = [],
			buildings = [...Content.rooms, ...Content.corridors];

		let randomBuildableArea = null,
			randomLine = null,
			randomColumn = null,
			endLine = null,
			endColumn = null;

		buildings.forEach(building => {
			possibleBuildableAreas.push(...building.getBuildableBorderAreas());
		});

		if (!possibleBuildableAreas.length) {
			possibleBuildableAreas.push([Utils.numberBetween(0, dungeon.length - 1), Utils.numberBetween(0, dungeon[0].length - 1)]);
		}

		randomBuildableArea = possibleBuildableAreas[Utils.numberBetween(0, possibleBuildableAreas.length - 1)];
		randomLine = randomBuildableArea[0];
		randomColumn = randomBuildableArea[1];
		endLine = randomLine + height;
		endColumn = randomColumn + width;

		if (interpolate || scanRect(dungeon, randomLine, randomColumn, endLine, endColumn, Tiles.wall, !interpolate)) {
			return new BuildableCoordinateModel(randomLine, randomColumn);
		}

		randomLine = randomBuildableArea[0] - height;
		endLine = randomBuildableArea[0];

		if (scanRect(dungeon, randomLine, randomColumn, endLine, endColumn, Tiles.wall, !interpolate)) {
			return new BuildableCoordinateModel(randomLine, randomColumn);
		}

		randomLine = randomBuildableArea[0];
		endLine = randomBuildableArea[0] + height;
		randomColumn = randomBuildableArea[1] - width;
		endColumn = randomBuildableArea[1];

		if (scanRect(dungeon, randomLine, randomColumn, endLine, endColumn, Tiles.wall, !interpolate)) {
			return new BuildableCoordinateModel(randomLine, randomColumn);
		}

		randomLine = randomBuildableArea[0] - height;
		endLine = randomBuildableArea[0];

		if (scanRect(dungeon, randomLine, randomColumn, endLine, endColumn, Tiles.wall, !interpolate)) {
			return new BuildableCoordinateModel(randomLine, randomColumn);
		}

		if (++currentTry === Values.maxRandomCoordinatesTry) {
			throw Error('It wasn\'t possible to get a random buildable coordinate.');
		}

		return getRandomBuildableCoordinate(dungeon, width, height, currentTry);
	}

	/**
	 * Scans a rect veryfing if the content is what is expected
	 *
	 * @author mauricio.araldi
	 * @since 0.3.0
	 *
	 * @param {Array<Array<string>>} dungeon The dungeon to be scanned
	 * @param {integer} initLine Initial line of rect
	 * @param {integer} initColumn Initial column of rect
	 * @param {integer} endLine Final line of rect
	 * @param {integer} endColumn Final column of rect
	 * @param {string} expected The expected content of rect
	 * @param {boolean} [safeBorder = true] If the border around the area should also be scanned
	 * @return {boolean} True if the scanned rect contains expected content
	 */
	function scanRect(dungeon, initLine, initColumn, endLine, endColumn, expected, safeBorder = true) {
		let initialLine = safeBorder ? initLine - 1 : initLine,
			initialColumn = safeBorder ? initColumn - 1 : initColumn,
			finalLine = safeBorder ? endLine + 1 : endLine,
			finalColumn = safeBorder ? endColumn + 1 : endColumn;

		for (let l = initialLine; l <= finalLine; l++) {
			for (let c = initialColumn; c <= finalColumn; c++) {
				if (!dungeon[l] || !dungeon[l][c] || dungeon[l][c] !== expected) {
					return false;
				}
			}
		}

		return true;
	}


	/**
	 * Fills a rect with content
	 *
	 * @author mauricio.araldi
	 * @since 0.4.0
	 *
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

	return {
		getRandomBuildableCoordinate,
		fillRect,
		numberBetween,
		scanRect
	};
})();