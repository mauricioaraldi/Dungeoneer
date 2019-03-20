/**
 * This module controls corridor interactions
 *
 * @author mauricio.araldi
 * @since 0.3.0
 */
const Corridor = (function() {
	/**
	 * Generate a new corridor on the map
	 *
	 * @author mauricio.araldi
	 * @since 0.3.0
	 *
	 * @param {Array<Array<string>>} map The map where the corridor will be generated.
	 */
	function generateCorridor(map) {
		var randomCordinates = Utils.getRandomValidCordinates(map),
			randomLine = randomCordinates[0],
			randomColumn = randomCordinates[1],
			directions,
			width,
			height;
			
		//If random position is valid
		if (randomLine == undefined || randomColumn == undefined) {
			return false;
		}
		
		directions = Utils.getValidDirections(map, randomLine, randomColumn, ['T', 'R', 'B', 'L'], Tiles.wall);

		if (directions.indexOf('T') > -1 || directions.indexOf('B') > -1) { //TOP OR BOTTOM
			height = Utils.numberBetween(Values.roomMinHeight, Values.roomMaxHeight);
		} else if (directions.indexOf('R') > -1 || directions.indexOf('L') > -1) { //RIGHT OR LEFT
			width = Utils.numberBetween(Values.roomMinWidth, Values.roomMaxWidth);
		}
		
		if (directions.indexOf('T') > -1) { //TOP
			var finalLine = randomLine - height;
			
			if (finalLine <= 1) {
				return false;
			}
			
			if (Utils.scanRect(map, Math.min(randomLine, finalLine), randomColumn, Math.max(randomLine, finalLine) - 2, randomColumn, Tiles.wall) //If there's room for the corridor
				&& Utils.scanRect(map, Math.min(randomLine, finalLine), randomColumn - 1, Math.max(randomLine, finalLine) - 2, randomColumn + 1, Tiles.wall)) { //If there is only wall on the sides of the corridor
				
				//-1 and -2 to draw the door and not override it
				map = Utils.fillRect(Tiles.door, map, Math.max(randomLine, finalLine) - 1, randomColumn, Math.max(randomLine, finalLine) - 1, randomColumn);
				map = Utils.fillRect(Tiles.floor, map, Math.min(randomLine, finalLine), randomColumn, Math.max(randomLine, finalLine) - 2, randomColumn);
				Content.corridors.push( new CorridorModel(Math.min(randomLine, finalLine), randomColumn, Math.max(randomLine, finalLine) - 2, randomColumn) );
			}
		} else if (directions.indexOf('B') > -1) { //BOTTOM
			var finalLine = randomLine + height;
			
			if (finalLine >= Values.lines - 2) {
				return false;
			}
			
			if (Utils.scanRect(map, Math.min(randomLine, finalLine) + 2, randomColumn, Math.max(randomLine, finalLine), randomColumn, Tiles.wall) //If there's room for the corridor
				&& Utils.scanRect(map, Math.min(randomLine, finalLine) + 2, randomColumn - 1, Math.max(randomLine, finalLine), randomColumn + 1, Tiles.wall)) { //If there is onyl wall on the sides of the corridor
				
				//+1 and +2 to draw the door and not override it
				map = Utils.fillRect(Tiles.door, map, Math.min(randomLine, finalLine) + 1, randomColumn, Math.min(randomLine, finalLine) + 1, randomColumn);
				map = Utils.fillRect(Tiles.floor, map, Math.min(randomLine, finalLine) + 2, randomColumn, Math.max(randomLine, finalLine), randomColumn);
				Content.corridors.push( new CorridorModel(Math.min(randomLine, finalLine) + 2, randomColumn, Math.max(randomLine, finalLine), randomColumn) );
			}
		} else if (directions.indexOf('R') > -1) { //RIGHT
			var finalColumn = randomColumn + width;
			
			if (finalColumn >= Values.columns - 2) {
				return false;
			}
			
			if (Utils.scanRect(map, randomLine, Math.min(randomColumn, finalColumn) + 2, randomLine, Math.max(randomColumn, finalColumn), Tiles.wall) //If there's room for the corridor
				&& Utils.scanRect(map, randomLine - 1, Math.min(randomColumn, finalColumn) + 2, randomLine + 1, Math.max(randomColumn, finalColumn), Tiles.wall)) { //If there is onyl wall on the sides of the corridor
				
				//+1 and +2 to draw the door and not override it
				map = Utils.fillRect(Tiles.door, map, randomLine, Math.min(randomColumn, finalColumn) + 1, randomLine, Math.max(randomColumn, finalColumn));
				map = Utils.fillRect(Tiles.floor, map, randomLine, Math.min(randomColumn, finalColumn) + 2, randomLine, Math.max(randomColumn, finalColumn));
				Content.corridors.push( new CorridorModel(randomLine, Math.min(randomColumn, finalColumn) + 2, randomLine, Math.max(randomColumn, finalColumn)) );
			}
		} else if (directions.indexOf('L') > -1) { //LEFT
			var finalColumn = randomColumn - width;
			
			if (finalColumn <= 1) {
				return false;
			}
			
			if (Utils.scanRect(map, randomLine, Math.min(randomColumn, finalColumn), randomLine, Math.max(randomColumn, finalColumn) - 2, Tiles.wall) //If there's room for the corridor
				&& Utils.scanRect(map, randomLine - 1, Math.min(randomColumn, finalColumn), randomLine + 1, Math.max(randomColumn, finalColumn) - 2, Tiles.wall)) { //If there is onyl wall on the sides of the corridor
				
				//-1 and -2 to draw the door and not override it
				map = Utils.fillRect(Tiles.door, map, randomLine, Math.min(randomColumn, finalColumn), randomLine, Math.max(randomColumn, finalColumn) - 1);
				map = Utils.fillRect(Tiles.floor, map, randomLine, Math.min(randomColumn, finalColumn), randomLine, Math.max(randomColumn, finalColumn) - 2);
				Content.corridors.push( new CorridorModel(randomLine, Math.min(randomColumn, finalColumn), randomLine, Math.max(randomColumn, finalColumn) - 2) );
			}
		}
		
		return map;
	}

	return {
		generateCorridor
	}
})();