/**
 * This module controls general building interactions
 *
 * @author mauricio.araldi
 * @since 0.4.0
 */
/* eslint-disable-next-line no-unused-vars */
const Building = (() => {
	/**
	 * Generate a new building on the dungeon
	 *
	 * @author mauricio.araldi
	 * @since 0.4.0
	 *
	 * @param {Array<Array<string>>} dungeon The dungeon where the building will be generated.
	 * @param {integer} width The width of the building to be generated.
	 * @param {integer} height The height of the room to be generated.
	 * @param {boolean} [canBeJoined] If the room can be joined with other rooms
	 */
	function generate(dungeon, width, height, canBeJoined) {
		if (!width) {
			throw Error('Parameter width is required');
		}

		if (!height) {
			throw Error('Parameter height is required');
		}

		const buildableCoordinate = Utils.getRandomBuildableCoordinate(dungeon, width, height, canBeJoined),
			initLine = buildableCoordinate.line,
			initColumn = buildableCoordinate.column,
			endLine = initLine + height,
			endColumn = initColumn + width;

		dungeon = Utils.fillRect(
			Tiles.floor,
			dungeon,
			initLine,
			initColumn,
			endLine,
			endColumn
		);

		return new BuildingModel(
			dungeon,
			initLine,
			initColumn,
			endLine,
			endColumn
		);
	}

	return {
		generate
	};
})();