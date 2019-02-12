;(function ( $, window ) {

	/**
	 * This module controls util interactions
	 *
	 * @author mauricio.araldi
	 * @since 23/06/2015
	 */
	App.Util = (function() {
	
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
		 * Get random cordinates from map, ensuring that they are valid
		 * to generate a room or a corridor
		 *
		 * @param map - The map from where to get cordinates
		 *
		 * @return [line, column] - Random valid cordinates from map
		 *
		 * @author mauricio.araldi
		 * @since 23/06/2015
		 */
		function getRandomValidCordinates(map) {
			var randomLine = App.Utils.numberBetween(0, map.length),
				randomColumn = App.Utils.numberBetween(0, map[0].length);
			
			//Verify if the random cordinate is a floor tile
			if (map[randomLine][randomColumn] == App.Tiles.floor) {
				var directions = getValidDirections(map, randomLine, randomColumn, ['T', 'R', 'B', 'L'], App.Tiles.wall);
				
				if (directions.length > 0) {
					return [randomLine, randomColumn];
				}
			}
			
			return false;
		}

		/**
		 * Get valid directions from a specific point of map, accordingly
		 * to what is expected
		 *
		 * @param map - The map from where to get cordinates
		 * @param line - The line cordinate of position
		 * @param column - The column cordinate of position
		 * @param directionsToTest - Directions to be verified
		 * @param expected - Directions expected to be valid (at least one)
		 *
		 * @return [...directions] - All expected tested valid directions
		 *
		 * @author mauricio.araldi
		 * @since 23/06/2015
		 */
		function getValidDirections(map, line, column, directionsToTest, expected) {
			var returnDirections = []

			for (var d in directionsToTest) {	
				var direction = [directionsToTest[d]];
				if (verifyAround(map, line, column, direction, expected)) {
					returnDirections.push(direction[0]);
				}
			}
			
			return returnDirections;
		}

		/**
		 * Scans a rect veryfing if the content is what is expected
		 *
		 * @param map - The map to be scanned
		 * @param initLine - Initial line of rect
		 * @param initColumn - Initial column of rect
		 * @param endLine - Final line of rect
		 * @param endColumn - Final column of rect
		 * @param expected - The expected content of rect
		 *
		 * @return boolean - True if the scanned rect contains expected content
		 *
		 * @author mauricio.araldi
		 * @since 23/06/2015
		 */
		function scanRect(map, initLine, initColumn, endLine, endColumn, expected) {
			for (var l=initLine; l <= endLine; l++) {
				for (var c=initColumn; c <= endColumn; c++) {
					if (map[l][c] != expected) {
						return false;
					}
				}
			}

			return true;
		}

		/**
		 * Scans a square around a point (8 tiles) for expected content
		 *
		 * @param map - The map to be scanned
		 * @param line - Line number of point to be scanned
		 * @param column - Column number of point to be scanned
		 * @param directions - Directions to be scanned
		 * @param expected - The expected content of scanned directions
		 *
		 * @return boolean - True if the scanned directions contains expected content
		 *
		 * @author mauricio.araldi
		 * @since 23/06/2015
		 */
		function verifyAround(map, line, column, directions, expected) {
			if ((line > 0 && line < App.Values.lines - 1)
				&&
				(column > 0 && column < App.Values.columns - 1)) {

				/* Top */
				if (directions.indexOf('TL') > -1) { //Top Left
					if (map[line-1][column-1] != expected) {
						return false;
					} 
				}
				
				if (directions.indexOf('T') > -1) { //Top
					if (map[line-1][column] != expected) {
						return false;
					} 
				}
				
				if (directions.indexOf('TR') > -1) { //Top Right
					if (map[line-1][column+1] != expected) {
						return false;
					} 
				}
				/* End Top */
				
				/* Middle */
				if (directions.indexOf('L') > -1) { //Left
					if (map[line][column-1] != expected) {
						return false;
					} 
				}
				
				if (directions.indexOf('C') > -1) { //Center
					if (map[line][column] != expected) {
						return false;
					} 
				}
				
				if (directions.indexOf('R') > -1) { //Right
					if (map[line][column+1] != expected) {
						return false;
					} 
				}
				/* End Middle */
				
				/* Bottom */
				if (directions.indexOf('BL') > -1) { //Bottom Left
					if (map[line+1][column-1] != expected) {
						return false;
					} 
				}
				
				if (directions.indexOf('B') > -1) { //Bottom
					if (map[line+1][column] != expected) {
						return false;
					} 
				}
				
				if (directions.indexOf('BR') > -1) { //Bottom Right
					if (map[line+1][column+1] != expected) {
						return false;
					} 
				}
				/* End Bottom */
				
				return true;
			} else {
				return false;
			}
		}

		/**
		 * Fills a rect with content
		 *
		 * @param content - The content to fill rect
		 * @param map - The map where to get the area
		 * @param initLine - Initial line of rect
		 * @param initColumn - Initial column of rect
		 * @param endLine - Final line of rect
		 * @param endColumn - Final column of rect
		 *
		 * @return map - Map with the rect filles
		 *
		 * @author mauricio.araldi
		 * @since 23/06/2015
		 */
		function fillRect(content, map, initLine, initColumn, endLine, endColumn) {
			for (var l=initLine; l <= endLine; l++) {
				for (var c=initColumn; c <= endColumn; c++) {
					map[l][c] = content;
				}
			}
			
			return map;
		}

		return {
			bindEvents : bindEvents,
			init : init,
			getRandomValidCordinates : getRandomValidCordinates,
			getValidDirections : getValidDirections,
			scanRect : scanRect,
			verifyAround : verifyAround,
			fillRect : fillRect
		}
	
	})();

	// DOM Ready -- Initialize the module
	$(function() {
		App.Util.bindEvents();
		App.Util.init();
	});

})( jQuery, window );