/**
 * This module controls stair interactions
 *
 * @author mauricio.araldi
 * @since 22/06/2015
 */
Room = (() => {
	/**
	 * Generate the first room of the map. This function needs to be separated
	 * because it needs to surely generate a room, with no errors.
	 *
	 * @author mauricio.araldi
	 * @since 0.3.0
	 *
	 * @param {Array<Array<string>>} map The map where the room will be generated.
	 * @return {Array<Array<string>>} The map with the room
	 */
	function generateFirstRoom(map) {
		//To ensure the position will be valid, get always the same position
		var line = Math.floor(map.length / 4),
			column = Math.floor(map[0].length / 4),
			width = Utils.numberBetween(Values.roomMinWidth, Values.roomMaxWidth),
			height = Utils.numberBetween(Values.roomMinHeight, Values.roomMaxHeight);
			
		//Draw first room
		Utils.fillRect(Tiles.floor, map, line, column, line+width, column+height);
		Content.rooms.push( new RoomModel(line, column, line+width, column+height) );
		
		return map;
	}

	/**
	 * Generate a new room on the map
	 *
	 * @author mauricio.araldi
	 * @since 0.3.0
	 *
	 * @param {Array<Array<string>>} map The map where the room will be generated.
	 * @param {integer} width The width of the room to be generated.
	 * @param {integer} height The height of the room to be generated.
	 */
	function generateRoom(map, width, height) {
		var width = Utils.numberBetween(Values.roomMinWidth, Values.roomMaxWidth),
			height = Utils.numberBetween(Values.roomMinHeight, Values.roomMaxHeight),
			realWidth = width + 2, //Room Width + Walls
			realHeight = height + 2, //Room Height + Walls
			randomCordinates = Utils.getRandomValidCordinates(map),
			randomLine = randomCordinates[0],
			randomColumn = randomCordinates[1];
			
		if ((randomLine == undefined || randomColumn == undefined)
			|| (realWidth < 0 || realHeight < 0)				 ) {
			return false;
		}
		
		if (map[randomLine][randomColumn] == Tiles.floor) {
			var finalHeight,
				finalWidth,
				x,
				y,
				roomX,
				roomY,
				directions = Utils.getValidDirections(map, randomLine, randomColumn, ['T', 'R', 'B', 'L'], Tiles.wall);
				
			if (directions.indexOf('T') > -1) { //TOP
				finalHeight = randomLine - realHeight;
				y = -4; //2 for walls, 1 for the space itself
				roomY = -1;
			} else if (directions.indexOf('B') > -1) { //BOTTOM
				finalHeight = randomLine + realHeight;
				y = 2; //2 for the walls
				roomY = 1;
			}
			
			if (map[finalHeight] != undefined && Utils.verifyAround(map, finalHeight, randomColumn, ['C'], Tiles.wall)) {
				y += randomLine;
				roomY += randomLine;
			} else {
				return false;
			}
			
			if (directions.indexOf('R') > -1) { //RIGHT
				finalWidth = randomColumn - realWidth;
				x = -3; //2 for walls, 1 for space itself
				roomX = -2;
			} else if (directions.indexOf('L') > -1) { //LEFT
				finalWidth = randomColumn + realWidth;
				x = 2; //2 for the walls
				roomX = 2;
			}
			
			if (Utils.verifyAround(map, randomLine, finalWidth, ['C'], Tiles.wall)) {
				x += randomColumn;
				roomX += randomColumn;
			} else {
				return false;
			}
			
			if (Utils.scanRect(map, y - 1, x - 1, (y + height) + 1, (x + width) + 1, Tiles.wall)) {
				map = Utils.fillRect(Tiles.door, map, roomY, roomX, roomY, roomX);
				map = Utils.fillRect(Tiles.floor, map, y, x, y + height, x + width);
				Content.rooms.push( new RoomModel(y, x, y + height, x + width) );
			}
			
			return map;
		} 
		
		return false;
	}

	return {
		generateFirstRoom,
		generateRoom
	}
})();