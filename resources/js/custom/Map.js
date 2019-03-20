/**
 * This module controls map interactions
 *
 * @author mauricio.araldi
 * @since 0.3.0
 */
Map = (() => {
	/**
	 * Initiate the map
	 *
	 * @author mauricio.araldi
	 * @since 0.3.0
	 *
	 * @param {integer} lines The number of lines of the map
	 * @param {integer} columns The number of columns of the map
	 * @return {Array<Array<string>>} A blank map
	 */
	function initiateMap(lines, columns) {
		var newMap = [];
		
		//Generate lines
		for (var l=0; l < lines; l++) {
			var line = [];
			
			//Generate columns
			for (var c=0; c < columns; c++) {
				var column = line[c];
				
				//Initialize cells with an wall. Pushes the cell into the line
				line.push(Tiles.wall);
			}
			
			//Pushes the line into the map
			newMap.push(line);
		}
		
		return newMap;
	}

	/**
	 * Generate rooms and corridors
	 *
	 * @author mauricio.araldi
	 * @since 0.3.0
	 *
	 * @param {Array<Array<string>>} map The map to be filled
	 * @param {integer} totalTries The number of tries before returning map
	 * @param {integer} [currentTry = 0] Current try
	 * @return {Array<Array<string>>} The filled map
	 */
	function generateMap(map, totalTries, currentTry = 0) {
		var chance = Utils.numberBetween(1, 8);
		
		if (chance == 1) {
			Corridor.generateCorridor(map);
		} else if (chance >= 2) {
			Room.generateRoom(map);
		}

		if (++currentTry == totalTries) {
			return map;
		}
		
		return generateMap(map, totalTries, currentTry);
	}

	return {
		initiateMap,
		generateMap
	}
})();