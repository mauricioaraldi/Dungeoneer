;(function ( $, window ) {

	/**
	 * This module controls print interactions
	 *
	 * @author mauricio.araldi
	 * @since 22/06/2015
	 */
	App.Print = (function() {
	
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
		 * Print a coloured map on body
		 *
		 * @param map - The map to be printed
		 *
		 * @author mauricio.araldi
		 * @since 22/06/2015
		 */
		function printColoredMapOnBody(map) {
			var canvas = $('<canvas>'),
				ctx = canvas[0].getContext('2d');

			//Adjust canvas width and height
			canvas[0].height = App.Values.lines * App.Values.tileSize;
			canvas[0].width = App.Values.columns * App.Values.tileSize;
				
			//Runs trough map
			map.forEach(function(line, l) {
				line.forEach(function(tile, c) {
					var type;
					
					//Verify tile type
					switch (tile) {
						case App.Tiles.wall:
							type = 'wall';
							break;
						case App.Tiles.floor:
							type = 'floor';
							break;
						case App.Tiles.door:
							type = 'door';
							break;
						case App.Tiles.stairDown:
							type = 'stairDown';
							break
						case App.Tiles.stairUp:
							type = 'stairUp';
							break
						default:
							type = 'empty';
					}
					
					//Draw tile
					drawTile(type, c * App.Values.tileSize, l * App.Values.tileSize, ctx);
				});
			});
			
			//After all tiles have been drawned, append coloured map to body
			setTimeout(function() {
				$('body').append(canvas);
			}, 100);
		}

		/**
		 * Draw a tile in a specific position in a canvas context
		 *
		 * @param type - Tile type
		 * @param x - x position in canvas context
		 * @param y - y position in canvas context
		 * @param ctx - canvas context to receive the drawning
		 *
		 * @author mauricio.araldi
		 * @since 22/06/2015
		 */
		function drawTile(type, x, y, ctx) {
			var url = 'resources/images/tiles/'+type+'.png',
				image = new Image();
				
			image.src = url;
			
			image.onload = function() {
				ctx.drawImage(image, x, y, App.Values.tileSize, App.Values.tileSize);
			};
		}

		/**
		 * Print a raw map on body
		 *
		 * @param map - The map to be printed
		 *
		 * @author mauricio.araldi
		 * @since 22/06/2015
		 */
		function printMapOnBody(map) {
			var map = map,
				divMap = $('<div>');
				
			//Style the div that will contain the map
			divMap.css({
				'margin' : '10px',
				'font-size' : '20px',
				'line-height' : '16px'
			});
			
			//Runs trough map
			for (var l in map) {
				var line = map[l];
				
				divMap.append(line)
					  .append('</br>');
			}
			
			//Clears body
			$('body').empty();

			//Append the div with the map
			$('body').append(divMap);	
		}

		return {
			bindEvents : bindEvents,
			init : init,
			printColoredMapOnBody : printColoredMapOnBody,
			printMapOnBody : printMapOnBody
		}
	
	})();

	// DOM Ready -- Initialize the module
	$(function() {
		App.Print.bindEvents();
		App.Print.init();
	});

})( jQuery, window );