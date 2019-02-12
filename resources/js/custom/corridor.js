;(function ( $, window ) {

	/**
	 * This module controls corridor interactions
	 *
	 * @author mauricio.araldi
	 * @since 22/06/2015
	 */
	App.Corridor = (function() {
	
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
		 * Generate a new room on the map
		 *
		 * @param map - The map where the corridor will be generated.
		 *
		 * @author mauricio.araldi
		 * @since 23/06/2015
		 */
		function generateCorridor(map) {
			var randomCordinates = App.Util.getRandomValidCordinates(map),
				randomLine = randomCordinates[0],
				randomColumn = randomCordinates[1],
				directions,
				width,
				height;
				
			//If random position is valid
			if (randomLine == undefined || randomColumn == undefined) {
				return false;
			}
			
			directions = App.Util.getValidDirections(map, randomLine, randomColumn, ['T', 'R', 'B', 'L'], App.Tiles.wall);

			if (directions.indexOf('T') > -1 || directions.indexOf('B') > -1) { //TOP OR BOTTOM
				height = App.Utils.numberBetween(App.Values.roomMinHeight, App.Values.roomMaxHeight);
			} else if (directions.indexOf('R') > -1 || directions.indexOf('L') > -1) { //RIGHT OR LEFT
				width = App.Utils.numberBetween(App.Values.roomMinWidth, App.Values.roomMaxWidth);
			}
			
			if (directions.indexOf('T') > -1) { //TOP
				var finalLine = randomLine - height;
				
				if (finalLine <= 1) {
					return false;
				}
				
				if (App.Util.scanRect(map, Math.min(randomLine, finalLine), randomColumn, Math.max(randomLine, finalLine) - 2, randomColumn, App.Tiles.wall) //If there's room for the corridor
					&& App.Util.scanRect(map, Math.min(randomLine, finalLine), randomColumn - 1, Math.max(randomLine, finalLine) - 2, randomColumn + 1, App.Tiles.wall)) { //If there is only wall on the sides of the corridor
					
					//-1 and -2 to draw the door and not override it
					map = App.Util.fillRect(App.Tiles.door, map, Math.max(randomLine, finalLine) - 1, randomColumn, Math.max(randomLine, finalLine) - 1, randomColumn);
					map = App.Util.fillRect(App.Tiles.floor, map, Math.min(randomLine, finalLine), randomColumn, Math.max(randomLine, finalLine) - 2, randomColumn);
					App.Content.corridors.push( new Corridor(Math.min(randomLine, finalLine), randomColumn, Math.max(randomLine, finalLine) - 2, randomColumn) );
				}
			} else if (directions.indexOf('B') > -1) { //BOTTOM
				var finalLine = randomLine + height;
				
				if (finalLine >= App.Values.lines - 2) {
					return false;
				}
				
				if (App.Util.scanRect(map, Math.min(randomLine, finalLine) + 2, randomColumn, Math.max(randomLine, finalLine), randomColumn, App.Tiles.wall) //If there's room for the corridor
					&& App.Util.scanRect(map, Math.min(randomLine, finalLine) + 2, randomColumn - 1, Math.max(randomLine, finalLine), randomColumn + 1, App.Tiles.wall)) { //If there is onyl wall on the sides of the corridor
					
					//+1 and +2 to draw the door and not override it
					map = App.Util.fillRect(App.Tiles.door, map, Math.min(randomLine, finalLine) + 1, randomColumn, Math.min(randomLine, finalLine) + 1, randomColumn);
					map = App.Util.fillRect(App.Tiles.floor, map, Math.min(randomLine, finalLine) + 2, randomColumn, Math.max(randomLine, finalLine), randomColumn);
					App.Content.corridors.push( new Corridor(Math.min(randomLine, finalLine) + 2, randomColumn, Math.max(randomLine, finalLine), randomColumn) );
				}
			} else if (directions.indexOf('R') > -1) { //RIGHT
				var finalColumn = randomColumn + width;
				
				if (finalColumn >= App.Values.columns - 2) {
					return false;
				}
				
				if (App.Util.scanRect(map, randomLine, Math.min(randomColumn, finalColumn) + 2, randomLine, Math.max(randomColumn, finalColumn), App.Tiles.wall) //If there's room for the corridor
					&& App.Util.scanRect(map, randomLine - 1, Math.min(randomColumn, finalColumn) + 2, randomLine + 1, Math.max(randomColumn, finalColumn), App.Tiles.wall)) { //If there is onyl wall on the sides of the corridor
					
					//+1 and +2 to draw the door and not override it
					map = App.Util.fillRect(App.Tiles.door, map, randomLine, Math.min(randomColumn, finalColumn) + 1, randomLine, Math.max(randomColumn, finalColumn));
					map = App.Util.fillRect(App.Tiles.floor, map, randomLine, Math.min(randomColumn, finalColumn) + 2, randomLine, Math.max(randomColumn, finalColumn));
					App.Content.corridors.push( new Corridor(randomLine, Math.min(randomColumn, finalColumn) + 2, randomLine, Math.max(randomColumn, finalColumn)) );
				}
			} else if (directions.indexOf('L') > -1) { //LEFT
				var finalColumn = randomColumn - width;
				
				if (finalColumn <= 1) {
					return false;
				}
				
				if (App.Util.scanRect(map, randomLine, Math.min(randomColumn, finalColumn), randomLine, Math.max(randomColumn, finalColumn) - 2, App.Tiles.wall) //If there's room for the corridor
					&& App.Util.scanRect(map, randomLine - 1, Math.min(randomColumn, finalColumn), randomLine + 1, Math.max(randomColumn, finalColumn) - 2, App.Tiles.wall)) { //If there is onyl wall on the sides of the corridor
					
					//-1 and -2 to draw the door and not override it
					map = App.Util.fillRect(App.Tiles.door, map, randomLine, Math.min(randomColumn, finalColumn), randomLine, Math.max(randomColumn, finalColumn) - 1);
					map = App.Util.fillRect(App.Tiles.floor, map, randomLine, Math.min(randomColumn, finalColumn), randomLine, Math.max(randomColumn, finalColumn) - 2);
					App.Content.corridors.push( new Corridor(randomLine, Math.min(randomColumn, finalColumn), randomLine, Math.max(randomColumn, finalColumn) - 2) );
				}
			}
			
			return map;
		}

		return {
			bindEvents : bindEvents,
			init : init,
			generateCorridor : generateCorridor
		}
	
	})();

	// DOM Ready -- Initialize the module
	$(function() {
		App.Corridor.bindEvents();
		App.Corridor.init();
	});

})( jQuery, window );