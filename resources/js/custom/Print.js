/**
 * This module controls print interactions
 *
 * @author mauricio.araldi
 * @since 0.3.0
 */
/* eslint-disable-next-line no-unused-vars */
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

		map.forEach((line, l) => {
			line.forEach((tile, c) => {
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
			document.querySelector('#loadingMessage').remove();
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
	function printRawMapOnBody(map) {
		const div = document.createElement('DIV'),
			body = document.querySelector('body');

		div.setAttribute('id', 'rawMapContainer');

		for (const l in map) {
			const line = document.createElement('SPAN'),
				br = document.createElement('BR');

			line.textContent = map[l].join('');

			div.appendChild(line).appendChild(br);
		}

		body.innerHTML = '';
		body.appendChild(div);
	}

	/**
	 * Prints a map in the body of the page
	 * 
	 * @author mauricio.araldi
	 * @since 0.3.0
	 * 
	 * @param {Array<Array<string>>} map The map to be printed
	 * @param {boolean} [colored = true] If the map should be printed as canvas or ASCII
	 */
	function printMapOnBody(map, colored = true) {
		if (colored) {
			return printColoredMapOnBody(map);
		}

		return printRawMapOnBody(map)
	}

	return {
		printColoredMapOnBody,
		printMapOnBody
	};
})();