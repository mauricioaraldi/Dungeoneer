/**
 * This module controls corridor interactions
 *
 * @author mauricio.araldi
 * @since 0.3.0
 */
/* eslint-disable-next-line no-unused-vars */
const Corridor = (() => {
	/**
	 * Generate a new corridor on the dungeon
	 *
	 * @author mauricio.araldi
	 * @since 0.3.0
	 *
	 * @param {Array<Array<string>>} dungeon The dungeon where the corridor will be generated.
	 */
	function generateCorridor(dungeon) {
		const [randomLine, randomColumn] = Utils.getRandomValidCordinates(dungeon);

		let width,
			height;

		if (randomLine === undefined || randomColumn === undefined) {
			return false;
		}

		const directions = Utils.getValidDirections(dungeon, randomLine, randomColumn, ['T', 'R', 'B', 'L'], Tiles.wall);

		if (directions.indexOf('T') > -1 || directions.indexOf('B') > -1) {
			height = Utils.numberBetween(Values.roomMinHeight, Values.roomMaxHeight);
		} else if (directions.indexOf('R') > -1 || directions.indexOf('L') > -1) {
			width = Utils.numberBetween(Values.roomMinWidth, Values.roomMaxWidth);
		}

		if (directions.indexOf('T') > -1) {
			const finalLine = randomLine - height;

			if (finalLine <= 1) {
				return false;
			}

			const hasRoomForCorridor = Utils.scanRect(
					dungeon,
					Math.min(randomLine, finalLine),
					randomColumn,
					Math.max(randomLine, finalLine) - 2,
					randomColumn,
					Tiles.wall
				),
				hasOnlyWallsAroundCorridor = Utils.scanRect(
					dungeon,
					Math.min(randomLine, finalLine),
					randomColumn - 1,
					Math.max(randomLine, finalLine) - 2,
					randomColumn + 1,
					Tiles.wall
				);

			if (hasRoomForCorridor && hasOnlyWallsAroundCorridor) {
				// -1 and -2 to draw the door and not override it
				dungeon = Utils.fillRect(
					Tiles.door,
					dungeon,
					Math.max(randomLine, finalLine) - 1,
					randomColumn,
					Math.max(randomLine, finalLine) - 1,
					randomColumn
				);

				dungeon = Utils.fillRect(
					Tiles.floor,
					dungeon,
					Math.min(randomLine, finalLine),
					randomColumn,
					Math.max(randomLine, finalLine) - 2,
					randomColumn
				);

				Content.corridors.push(
					new CorridorModel(
						Math.min(randomLine, finalLine),
						randomColumn,
						Math.max(randomLine, finalLine) - 2,
						randomColumn
					)
				);
			}
		} else if (directions.indexOf('B') > -1) {
			const finalLine = randomLine + height;

			if (finalLine >= Values.lines - 2) {
				return false;
			}

			const hasRoomForCorridor = Utils.scanRect(
					dungeon,
					Math.min(randomLine, finalLine) + 2,
					randomColumn,
					Math.max(randomLine, finalLine),
					randomColumn,
					Tiles.wall
				),
				hasOnlyWallsAroundCorridor = Utils.scanRect(
					dungeon,
					Math.min(randomLine, finalLine) + 2,
					randomColumn - 1,
					Math.max(randomLine, finalLine),
					randomColumn + 1,
					Tiles.wall
				);

			if (hasRoomForCorridor && hasOnlyWallsAroundCorridor) {
				// +1 and +2 to draw the door and not override it
				dungeon = Utils.fillRect(
					Tiles.door,
					dungeon,
					Math.min(randomLine, finalLine) + 1,
					randomColumn,
					Math.min(randomLine, finalLine) + 1,
					randomColumn
				);

				dungeon = Utils.fillRect(
					Tiles.floor,
					dungeon,
					Math.min(randomLine, finalLine) + 2,
					randomColumn,
					Math.max(randomLine, finalLine),
					randomColumn
				);

				Content.corridors.push(
					new CorridorModel(
						Math.min(randomLine, finalLine) + 2,
						randomColumn,
						Math.max(randomLine, finalLine),
						randomColumn
					)
				);
			}
		} else if (directions.indexOf('R') > -1) {
			const finalColumn = randomColumn + width;

			if (finalColumn >= Values.columns - 2) {
				return false;
			}

			const hasRoomForCorridor = Utils.scanRect(
					dungeon,
					randomLine,
					Math.min(randomColumn, finalColumn) + 2,
					randomLine,
					Math.max(randomColumn, finalColumn),
					Tiles.wall
				),
				hasOnlyWallsAroundCorridor = Utils.scanRect(
					dungeon,
					randomLine - 1,
					Math.min(randomColumn, finalColumn) + 2,
					randomLine + 1,
					Math.max(randomColumn, finalColumn),
					Tiles.wall
				);

			if (hasRoomForCorridor && hasOnlyWallsAroundCorridor) {
				// +1 and +2 to draw the door and not override it
				dungeon = Utils.fillRect(
					Tiles.door,
					dungeon,
					randomLine,
					Math.min(randomColumn, finalColumn) + 1,
					randomLine,
					Math.max(randomColumn, finalColumn)
				);

				dungeon = Utils.fillRect(
					Tiles.floor,
					dungeon,
					randomLine,
					Math.min(randomColumn, finalColumn) + 2,
					randomLine,
					Math.max(randomColumn, finalColumn)
				);

				Content.corridors.push(
					new CorridorModel(
						randomLine,
						Math.min(randomColumn, finalColumn) + 2,
						randomLine,
						Math.max(randomColumn, finalColumn)
					)
				);
			}
		} else if (directions.indexOf('L') > -1) {
			const finalColumn = randomColumn - width;

			if (finalColumn <= 1) {
				return false;
			}

			const hasRoomForCorridor = Utils.scanRect(
					dungeon,
					randomLine,
					Math.min(randomColumn, finalColumn),
					randomLine,
					Math.max(randomColumn, finalColumn) - 2,
					Tiles.wall
				),
				hasOnlyWallsAroundCorridor = Utils.scanRect(
					dungeon,
					randomLine - 1,
					Math.min(randomColumn, finalColumn),
					randomLine + 1,
					Math.max(randomColumn, finalColumn) - 2,
					Tiles.wall
				);

			if (hasRoomForCorridor && hasOnlyWallsAroundCorridor) {
				// -1 and -2 to draw the door and not override it
				dungeon = Utils.fillRect(
					Tiles.door,
					dungeon,
					randomLine,
					Math.min(randomColumn, finalColumn),
					randomLine,
					Math.max(randomColumn, finalColumn) - 1
				);

				dungeon = Utils.fillRect(
					Tiles.floor,
					dungeon,
					randomLine,
					Math.min(randomColumn, finalColumn),
					randomLine,
					Math.max(randomColumn, finalColumn) - 2
				);

				Content.corridors.push(
					new CorridorModel(
						randomLine,
						Math.min(randomColumn, finalColumn),
						randomLine,
						Math.max(randomColumn, finalColumn) - 2
					)
				);
			}
		}

		return dungeon;
	}

	return {
		generateCorridor
	};
})();