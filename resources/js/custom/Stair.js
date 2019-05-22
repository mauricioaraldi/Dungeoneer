/**
 * This module controls stair interactions
 *
 * @author mauricio.araldi
 * @since 0.4.0
 */
/* eslint-disable-next-line no-unused-vars */
const Stair = (() => {
	/**
	 * Generates a stair down in dungeon
	 *
	 * @author mauricio.araldi
	 * @since 0.4.0
	 *
	 * @param {Array<Array<string>>} dungeon The dungeon where to draw a stair down
	 * @param {string} tile The tile to generate (down or up stair)
	 * @return {Array<Array<string>>} The dungeon with the desired stair
	 */
	function generateStair(dungeon, tile) {
		if (!dungeon) {
			throw new Error('Parameter dungeon is required');
		}

		if (!tile) {
			throw new Error('Parameter tile is required');
		}

		const randomBuilding = Content.rooms[Utils.numberBetween(0, Content.rooms.length - 1)],
			randomLine = Utils.numberBetween(randomBuilding.initLine, randomBuilding.endLine),
			randomColumn = Utils.numberBetween(randomBuilding.initColumn, randomBuilding.endColumn);

		if (!Utils.scanRect(dungeon, randomLine - 1, randomColumn - 1, randomLine + 1, randomColumn + 1, Tiles.door, false)) {
			Utils.fillRect(tile, dungeon, randomLine, randomColumn);
		} else {
			return generateStairDown(dungeon);
		}

		if (tile === Tiles.stairUp) {
			Content.stairsUp.push(new BuildingModel(dungeon, randomLine, randomColumn));
		} else {
			Content.stairsDown.push(new BuildingModel(dungeon, randomLine, randomColumn));
		}

		return dungeon;
	}

	return {
		generateStair
	};
})();