/**
 * This module controls corridor interactions
 *
 * @author mauricio.araldi
 * @since 0.3.0
 */
/* eslint-disable-next-line no-unused-vars */
const Corridor = (() => {
	/**
	 * Generate a new corridor on the dungeon
	 *
	 * @author mauricio.araldi
	 * @since 0.4.0
	 *
	 * @param {Array<Array<string>>} dungeon The dungeon where the corridor will be generated.
	 * @param {integer} [width] The width of the corridor to be generated.
	 * @param {integer} [height] The height of the corridor to be generated.
	 *
	 * @return {BuildingModel} The generated corridor
	 */
	function generate(dungeon, width, height) {
		const orientation = Utils.numberBetween(1, 2);

		if (orientation === 1) {
			width = Utils.numberBetween(Values.roomMinWidth, Values.roomMaxWidth);
			height = 1;
		} else {
			width = 1;
			height = Utils.numberBetween(Values.roomMinWidth, Values.roomMaxWidth);
		}

		const building = Building.generate(dungeon, width, height);

		building.type = BuildingTypes.CORRIDOR;

		Content.corridors.push(building);

		return building;
	}
	
	return {
		generate
	};
})();