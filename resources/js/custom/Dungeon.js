/**
 * This module controls dungeon interactions
 *
 * @author mauricio.araldi
 * @since 0.3.0
 */
/* eslint-disable-next-line no-unused-vars */
const Dungeon = (() => {
	/**
	 * Initiate the dungeon with only walls
	 *
	 * @author mauricio.araldi
	 * @since 0.3.0
	 *
	 * @param {integer} lines The number of lines to generate
	 * @param {integer} columns The number of columns to generate
	 * @return {Array<Array<string>>} An empty dungeon
	 */
	function initiate(lines, columns) {
		const dungeon = [];

		while (lines--) {
			dungeon.push(Tiles.wall.repeat(columns).split(''));
		}

		return dungeon;
	}

	/**
	 * Generate rooms and corridors
	 *
	 * @author mauricio.araldi
	 * @since 0.4.0
	 *
	 * @param {Array<Array<string>>} dungeon The dungeon to be filled
	 * @param {integer} totalTries The number of tries before returning dungeon
	 * @param {integer} [currentTry = 0] Current try
	 * @return {Array<Array<string>>} The filled dungeon
	 */
	function generateRoomsAndCorridors(dungeon, totalTries, currentTry = 0) {
		const chance = Utils.numberBetween(1, 8);

		// if (chance === 1) {
		// 	Corridor.generateCorridor(dungeon);
		// } else if (chance >= 2) {
			Room.generateRoom(dungeon);
		// }

		if (++currentTry === totalTries) {
			return dungeon;
		}

		return generateRoomsAndCorridors(dungeon, totalTries, currentTry);
	}

	return {
		initiate,
		generateRoomsAndCorridors
	};
})();