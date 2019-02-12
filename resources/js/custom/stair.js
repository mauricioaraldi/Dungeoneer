;(function ( $, window ) {

	/**
	 * This module controls stair interactions
	 *
	 * @author mauricio.araldi
	 * @since 22/06/2015
	 */
	App.Stair = (function() {
	
		/**
		 * Default function with all event bindings related to this module
		 *
		 * @author mauricio.araldi
		 * @since 22/06/2015
		 */
		function bindEvents() {
		}
		
		/**
		 * Default function that runs as soon as the page is loaded
		 * and events are binded (see bindEvents())
		 *
		 * @author mauricio.araldi
		 * @since 22/06/2015
		 */
		function init() {
		}

		/**
		 * Generates a stair down in map
		 *
		 * @param map - The map where to draw a stair down
		 * @param totalTries - Number of tries before timing out the generation
		 * @param currentTry - Number of current try
		 *
		 * @author mauricio.araldi
		 * @since 22/06/2015
		 */
		function generateStairDown(map, totalTries, currentTry) {
			//Controle the generation timeout
			if (currentTry == undefined) {
				currentTry = 0;
			} else if (currentTry == totalTries) { //Timeout
				console.error('FAILED TO GENERATE STAIR DOWN');
				return map;
			}

			//Get random position
			var randomLine = App.Utils.numberBetween(0, map.length),
				randomColumn = App.Utils.numberBetween(0, map[0].length);
			
			//Verify if random position is a valid position for the stair down
			if (map[randomLine][randomColumn] == App.Tiles.floor) {
				//Verify floor tiles around random position
				var directions = App.Util.getValidDirections(map, randomLine, randomColumn, ['T', 'R', 'B', 'L'], App.Tiles.floor);
				
				//If there is at least one floor tile, is valid
				if (directions.length > 0) {
					map[randomLine][randomColumn] = App.Tiles.stairDown;
				} else {
					return generateStairDown(map, totalTries, ++currentTry);
				}
			} else {
				return generateStairDown(map, totalTries, ++currentTry);
			}
			
			return map;
		}

		/**
		 * Generates a stair up in map
		 *
		 * @param map - The map where to draw a stair up
		 * @param totalTries - Number of tries before timing out the generation
		 * @param currentTry - Number of current try
		 *
		 * @author mauricio.araldi
		 * @since 22/06/2015
		 */
		function generateStairUp(map, totalTries, currentTry) {
			//Controle the generation timeout
			if (currentTry == undefined) {
				currentTry = 0;
			} else if (currentTry == totalTries) { //Timeout
				console.error('FAILED TO GENERATE STAIR UP');
				return map;
			}

			//Get random position
			var randomLine = App.Utils.numberBetween(0, map.length),
				randomColumn = App.Utils.numberBetween(0, map[0].length);
			
			//Verify if random position is a valid position for the stair up
			if (map[randomLine][randomColumn] == App.Tiles.floor) {
				//Verify floor tiles around random position
				var directions = App.Util.getValidDirections(map, randomLine, randomColumn, ['T', 'R', 'B', 'L'], App.Tiles.floor);
				
				//If there is at least one floor tile, is valid
				if (directions.length > 0) {
					var initColumn = randomColumn - App.Values.roomMaxWidth < 0 ? 0 : randomColumn - App.Values.roomMaxWidth, 
						initLine = randomLine - App.Values.roomMaxHeight < 0 ? 0 : randomLine - App.Values.roomMaxHeight,
						endColumn = randomColumn + App.Values.roomMaxWidth, 
						endLine = randomLine + App.Values.roomMaxHeight,
						hasStairDown = false;
						
						endColumn = endColumn > map[0].length - 1 ? map[0].length - 1 : endColumn;
						endLine = endLine > map.length - 1 ? map.length - 1 : endLine;
					
					//Verify stair bounds, to see if there is at least one max room size of distance from stair down
					for (var l=initLine; l <= endLine; l++) {
						for (var c=initColumn; c <= endColumn; c++) {
							if (map[l][c] == App.Tiles.stairDown) {
								hasStairDown = true;
							}
						}
					}
					
					//If the position is valid, generate room
					if (!hasStairDown) {
						map[randomLine][randomColumn] = App.Tiles.stairUp;
					} else {
						return generateStairUp(map, totalTries, ++currentTry);
					}
				} else {
					return generateStairUp(map, totalTries, ++currentTry);
				}
			} else {
				return generateStairUp(map, totalTries, ++currentTry);
			}
			
			return map;
		}

		return {
			bindEvents : bindEvents,
			init : init,
			generateStairDown : generateStairDown,
			generateStairUp : generateStairUp
		}
	
	})();

	// DOM Ready -- Initialize the module
	$(function() {
		App.Stair.bindEvents();
		App.Stair.init();
	});

})( jQuery, window );