/**
 * This module controls stair interactions
 *
 * @author mauricio.araldi
 * @since 0.3.0
 */
/* eslint-disable-next-line no-unused-vars */
const Room = (() => {
	/**
	 * Generate the first room of the dungeon. This function is separated
	 * because it needs to surely generate a room, with no errors.
	 *
	 * @author mauricio.araldi
	 * @since 0.4.0
	 *
	 * @param {Array<Array<string>>} dungeon The dungeon where the room will be generated.
	 * @return {Array<Array<string>>} The dungeon with the room
	 */
	function generateFirstRoom(dungeon) {
		if (!dungeon) {
			throw Error('Parameter dungeon is required');
		}

		let dungeonWithFirstRoom;

		while (!dungeonWithFirstRoom) {
			dungeonWithFirstRoom = generateRoom(dungeon);
		}

		return dungeon;
	}

	/**
	 * Generate a new room on the dungeon
	 *
	 * @author mauricio.araldi
	 * @since 0.4.0
	 *TODO
	 * @param {Array<Array<string>>} dungeon The dungeon where the room will be generated.
	 * @param {integer} [width] The width of the room to be generated.
	 * @param {integer} [height] The height of the room to be generated.
	 */
	function generateRoom(dungeon, width, height) {
		if (!width) {
			width = Utils.numberBetween(Values.roomMinWidth, Values.roomMaxWidth);
		}

		if (!height) {
			height = Utils.numberBetween(Values.roomMinHeight, Values.roomMaxHeight);
		}

		const buildableCoordinate = Utils.getRandomBuildableCoordinate(dungeon, width, height),
			buildableLine = buildableCoordinate.line,
			buildableColumn = buildableCoordinate.column;

		dungeon = Utils.fillRect(
			Tiles.door,
			dungeon,
			buildableLine,
			buildableColumn
		);

		dungeon = Utils.fillRect(
			Tiles.floor,
			dungeon,
			buildableLine,
			buildableColumn,
			buildableLine + height,
			buildableColumn + width
		);

		Content.rooms.push(
			new RoomModel(
				buildableLine,
				buildableColumn,
				buildableLine + height,
				buildableColumn + width,
				Utils.getBordersCoordinates(
					dungeon,
					buildableLine,
					buildableColumn,
					buildableLine + height,
					buildableColumn + width
				)
			)
		);

		console.log(Content.rooms);
		return dungeon;
	}

	return {
		generateFirstRoom,
		generateRoom
	};
})();