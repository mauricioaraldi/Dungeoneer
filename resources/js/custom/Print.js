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
		const canvas = document.createElement('CANVAS'),
			ctx = canvas.getContext('2d');

		canvas.height = Values.lines * Values.tileSize;
		canvas.width = Values.columns * Values.tileSize;
			
		map.forEach(function(line, l) {
			line.forEach(function(tile, c) {
				let type;
				
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
						break;

					case Tiles.stairUp:
						type = 'stairUp';
						break;

					default:
						type = 'empty';
				}
				
				drawTile(type, c * Values.tileSize, l * Values.tileSize, ctx);
			});
		});

		setTimeout(() => {
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
		const url = `resources/images/tiles/${type}.png`,
			image = new Image();
			
		image.src = url;
		
		image.onload = () => ctx.drawImage(image, x, y, Values.tileSize, Values.tileSize);
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
		const div = document.createElement('DIV'),
			body = document.querySelector('body');

		div.css({
			'margin' : '10px',
			'font-size' : '20px',
			'line-height' : '16px'
		});

		for (const l in map) {
			const line = map[l];
			
			div.appendChild(line)
				  .appendChild('</br>');
		}

		body.innerHTML = '';
		body.appendChild(div);	
	}

	return {
		printColoredMapOnBody,
		printMapOnBody
	};
})();