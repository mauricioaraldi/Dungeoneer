/**
 * This module controls stair interactions
 *
 * @author mauricio.araldi
 * @since 0.3.0
 */
/* eslint-disable-next-line no-unused-vars */
const Room = (() => {
	/**
	 * Generate the first room of the dungeon. This function needs to be separated
	 * because it needs to surely generate a room, with no errors.
	 *
	 * @author mauricio.araldi
	 * @since 0.3.0
	 *
	 * @param {Array<Array<string>>} dungeon The dungeon where the room will be generated.
	 * @return {Array<Array<string>>} The dungeon with the room
	 */
	function generateFirstRoom(dungeon) {
		// To ensure the position will be valid, get always the same position
		const line = Math.floor(dungeon.length / 4),
			column = Math.floor(dungeon[0].length / 4),
			width = Utils.numberBetween(Values.roomMinWidth, Values.roomMaxWidth),
			height = Utils.numberBetween(Values.roomMinHeight, Values.roomMaxHeight);

		Utils.fillRect(Tiles.floor, dungeon, line, column, line + width, column + height);
		Content.rooms.push(new RoomModel(line, column, line + width, column + height));

		return dungeon;
	}

	/**
	 * Generate a new room on the dungeon
	 *
	 * @author mauricio.araldi
	 * @since 0.3.0
	 *
	 * @param {Array<Array<string>>} dungeon The dungeon where the room will be generated.
	 * @param {integer} [width] The width of the room to be generated.
	 * @param {integer} [height] The height of the room to be generated.
	 */
	function generateRoom(dungeon, width, height) {
		const realWidth = width + 2, // Room Width + Walls
			realHeight = height + 2, // Room Height + Walls
			[randomLine, randomColumn] = Utils.getRandomValidCordinates(dungeon);

		if (!width) {
			width = Utils.numberBetween(Values.roomMinWidth, Values.roomMaxWidth);
		}

		if (!height) {
			height = Utils.numberBetween(Values.roomMinHeight, Values.roomMaxHeight);
		}

		if (
			(randomLine === undefined || randomColumn === undefined)
			|| (realWidth < 0 || realHeight < 0)
		) {
			return false;
		}

		if (dungeon[randomLine][randomColumn] === Tiles.floor) {
			const directions = Utils.getValidDirections(dungeon, randomLine, randomColumn, ['T', 'R', 'B', 'L'], Tiles.wall);

			let finalHeight,
				finalWidth,
				x,
				y,
				roomX,
				roomY;

			if (directions.indexOf('T') > -1) {
				finalHeight = randomLine - realHeight;
				y = -4; // 2 for walls, 1 for the space itself
				roomY = -1;
			} else if (directions.indexOf('B') > -1) {
				finalHeight = randomLine + realHeight;
				y = 2; // 2 for the walls
				roomY = 1;
			}

			if (dungeon[finalHeight] !== undefined && Utils.verifyAround(dungeon, finalHeight, randomColumn, ['C'], Tiles.wall)) {
				y += randomLine;
				roomY += randomLine;
			} else {
				return false;
			}

			if (directions.indexOf('R') > -1) {
				finalWidth = randomColumn - realWidth;
				x = -3; // 2 for walls, 1 for space itself
				roomX = -2;
			} else if (directions.indexOf('L') > -1) {
				finalWidth = randomColumn + realWidth;
				x = 2; //  for the walls
				roomX = 2;
			}

			if (Utils.verifyAround(dungeon, randomLine, finalWidth, ['C'], Tiles.wall)) {
				x += randomColumn;
				roomX += randomColumn;
			} else {
				return false;
			}

			if (Utils.scanRect(dungeon, y - 1, x - 1, (y + height) + 1, (x + width) + 1, Tiles.wall)) {
				dungeon = Utils.fillRect(Tiles.door, dungeon, roomY, roomX, roomY, roomX);
				dungeon = Utils.fillRect(Tiles.floor, dungeon, y, x, y + height, x + width);
				Content.rooms.push(new RoomModel(y, x, y + height, x + width));
			}

			return dungeon;
		}

		return false;
	}

	return {
		generateFirstRoom,
		generateRoom
	};
})();