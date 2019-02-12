;(function ( $, window ) {

	/**
	 * This module controls stair interactions
	 *
	 * @author mauricio.araldi
	 * @since 22/06/2015
	 */
	App.Room = (function() {
	
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
		 * Generate the first room of the map. This function needs to be separated
		 * because it needs to surely generate a room, with no errors.
		 *
		 * @param map - The map where the room will be generated.
		 *
		 * @author mauricio.araldi
		 * @since 22/06/2015
		 */
		function generateFirstRoom(map) {
			//To ensure the position will be valid, get always the same position
			var line = Math.floor(map.length / 4),
				column = Math.floor(map[0].length / 4),
				width = App.Utils.numberBetween(App.Values.roomMinWidth, App.Values.roomMaxWidth),
				height = App.Utils.numberBetween(App.Values.roomMinHeight, App.Values.roomMaxHeight);
				
			//Draw first room
			App.Util.fillRect(App.Tiles.floor, map, line, column, line+width, column+height);
			App.Content.rooms.push( new Room(line, column, line+width, column+height) );
			
			return map;
		}

		/**
		 * Generate a new room on the map
		 *
		 * @param map - The map where the room will be generated.
		 * @param width - The width of the room to be generated.
		 * @param height - The height of the room to be generated.
		 *
		 * @author mauricio.araldi
		 * @since 23/06/2015
		 */
		function generateRoom(map, width, height) {
			var width = App.Utils.numberBetween(App.Values.roomMinWidth, App.Values.roomMaxWidth),
				height = App.Utils.numberBetween(App.Values.roomMinHeight, App.Values.roomMaxHeight),
				realWidth = width + 2, //Room Width + Walls
				realHeight = height + 2, //Room Height + Walls
				randomCordinates = App.Util.getRandomValidCordinates(map),
				randomLine = randomCordinates[0],
				randomColumn = randomCordinates[1];
				
			if ((randomLine == undefined || randomColumn == undefined)
				|| (realWidth < 0 || realHeight < 0)				 ) {
				return false;
			}
			
			if (map[randomLine][randomColumn] == App.Tiles.floor) {
				var finalHeight,
					finalWidth,
					x,
					y,
					roomX,
					roomY,
					directions = App.Util.getValidDirections(map, randomLine, randomColumn, ['T', 'R', 'B', 'L'], App.Tiles.wall);
					
				if (directions.indexOf('T') > -1) { //TOP
					finalHeight = randomLine - realHeight;
					y = -4; //2 for walls, 1 for the space itself
					roomY = -1;
				} else if (directions.indexOf('B') > -1) { //BOTTOM
					finalHeight = randomLine + realHeight;
					y = 2; //2 for the walls
					roomY = 1;
				}
				
				if (map[finalHeight] != undefined && App.Util.verifyAround(map, finalHeight, randomColumn, ['C'], App.Tiles.wall)) {
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
				
				if (App.Util.verifyAround(map, randomLine, finalWidth, ['C'], App.Tiles.wall)) {
					x += randomColumn;
					roomX += randomColumn;
				} else {
					return false;
				}
				
				if (App.Util.scanRect(map, y - 1, x - 1, (y + height) + 1, (x + width) + 1, App.Tiles.wall)) {
					map = App.Util.fillRect(App.Tiles.door, map, roomY, roomX, roomY, roomX);
					map = App.Util.fillRect(App.Tiles.floor, map, y, x, y + height, x + width);
					App.Content.rooms.push( new Room(y, x, y + height, x + width) );
				}
				
				return map;
			} 
			
			return false;
		}

		return {
			bindEvents : bindEvents,
			init : init,
			generateFirstRoom : generateFirstRoom,
			generateRoom : generateRoom
		}
	
	})();

	// DOM Ready -- Initialize the module
	$(function() {
		App.Room.bindEvents();
		App.Room.init();
	});

})( jQuery, window );