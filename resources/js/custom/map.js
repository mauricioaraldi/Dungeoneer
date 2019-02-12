;(function ( $, window ) {

	/**
	 * This module controls map interactions
	 *
	 * @author mauricio.araldi
	 * @since 23/06/2015
	 */
	App.Map = (function() {
	
		/**
		 * Default function with all event bindings related to this module
		 *
		 * @author mauricio.araldi
		 * @since 23/06/2015
		 */
		function bindEvents() {
		}
		
		/**
		 * Default function that runs as soon as the page is loaded
		 * and events are binded (see bindEvents())
		 *
		 * @author mauricio.araldi
		 * @since 23/06/2015
		 */
		function init() {
		}

		/**
		 * Initiate the map
		 *
		 * @param lines - The number of lines of the map
		 * @param columns - The number of columns of the map
		 *
		 * @return map - A blank map
		 *
		 * @author mauricio.araldi
		 * @since 23/06/2015
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
					line.push(App.Tiles.wall);
				}
				
				//Pushes the line into the map
				newMap.push(line);
			}
			
			return newMap;
		}

		/**
		 * Generate rooms and corridors
		 *
		 * @param map - The map to be filled
		 * @param totalTries - The number of tries before returning map
		 * @param currentTry [not usable] - Current try
		 *
		 * @return map - The map filled
		 *
		 * @author mauricio.araldi
		 * @since 23/06/2015
		 */
		function generateMap(map, totalTries, currentTry) {
			if (currentTry == undefined) {
				currentTry = 0;
			} else if (currentTry == totalTries) {
				return map;
			}
			
			var chance = App.Utils.numberBetween(1, 8);
			
			if (chance == 1) {
				App.Corridor.generateCorridor(map);
			} else if (chance >= 2) {
				App.Room.generateRoom(map);
			}
			
			return generateMap(map, totalTries, ++currentTry);
		}

		return {
			bindEvents : bindEvents,
			init : init,
			initiateMap : initiateMap,
			generateMap : generateMap,
		}
	
	})();

	// DOM Ready -- Initialize the module
	$(function() {
		App.Map.bindEvents();
		App.Map.init();
	});

})( jQuery, window );