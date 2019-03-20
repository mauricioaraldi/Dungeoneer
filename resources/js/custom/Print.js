/**
 * This module controls print interactions
 *
 * @author mauricio.araldi
 * @since 0.3.0
 */
const Print = (function() {
	/**
	 * Print a coloured map on body
	 *
	 * @author mauricio.araldi
	 * @since 0.3.0
	 *
	 * @param {Array<Array<string>>} map The map to be printed
	 */
	function printColoredMapOnBody(map) {
		var canvas = document.createElement('CANVAS'),
			ctx = canvas.getContext('2d');

		//Adjust canvas width and height
		canvas.height = Values.lines * Values.tileSize;
		canvas.width = Values.columns * Values.tileSize;
			
		//Runs trough map
		map.forEach(function(line, l) {
			line.forEach(function(tile, c) {
				var type;
				
				//Verify tile type
				switch (tile) {
					case Tiles.wall:
						type = 'wall';
						break;
					case Tiles.floor:
						type = 'floor';
						break;
					case Tiles.door:
						type = 'door';
						break;
					case Tiles.stairDown:
						type = 'stairDown';
						break
					case Tiles.stairUp:
						type = 'stairUp';
						break
					default:
						type = 'empty';
				}
				
				//Draw tile
				drawTile(type, c * Values.tileSize, l * Values.tileSize, ctx);
			});
		});
		
		//After all tiles have been drawned, append coloured map to body
		setTimeout(function() {
			document.querySelector('body').appendChild(canvas);
		}, 100);
	}

	/**
	 * Draw a tile in a specific position in a canvas context
	 *
	 * @author mauricio.araldi
	 * @since 0.3.0
	 *
	 * @param {string} type Tile type
	 * @param {integer} x position in canvas context
	 * @param {integer} y position in canvas context
	 * @param {CanvasContext} canvas context to receive the drawning
	 */
	function drawTile(type, x, y, ctx) {
		var url = 'resources/images/tiles/'+type+'.png',
			image = new Image();
			
		image.src = url;
		
		image.onload = function() {
			ctx.drawImage(image, x, y, Values.tileSize, Values.tileSize);
		};
	}

	/**
	 * Print a raw map on body
	 *
	 * @author mauricio.araldi
	 * @since 0.3.0
	 *
	 * @param {Array<Array<string>>} map The map to be printed
	 */
	function printMapOnBody(map) {
		var map = map,
			divMap = document.createElement('DIV');
			
		//Style the div that will contain the map
		divMap.css({
			'margin' : '10px',
			'font-size' : '20px',
			'line-height' : '16px'
		});
		
		//Runs trough map
		for (var l in map) {
			var line = map[l];
			
			divMap.appendChild(line)
				  .appendChild('</br>');
		}
		
		//Clears body
		document.querySelector('body').innerHTML = '';

		//Append the div with the map
		document.querySelector('body').appendChild(divMap);	
	}

	return {
		printColoredMapOnBody,
		printMapOnBody
	}
})();