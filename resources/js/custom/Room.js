/**
 * This module controls stair interactions
 *
 * @author mauricio.araldi
 * @since 0.3.0
 */
/* eslint-disable-next-line no-unused-vars */
const Room = (() => {
	/**
	 * Generate a new room on the dungeon
	 *
	 * @author mauricio.araldi
	 * @since 0.4.0
	 *
	 * @param {Array<Array<string>>} dungeon The dungeon where the room will be generated.
	 * @param {integer} [width] The width of the room to be generated.
	 * @param {integer} [height] The height of the room to be generated.
	 * @param {boolean} [interpolate] If the room should be interpolated with other
	 *
	 * @return {BuildingModel} The generated room
	 */
	function generate(dungeon, width, height, interpolate) {
		if (!width) {
			width = Utils.numberBetween(Values.roomMinWidth, Values.roomMaxWidth);
		}

		if (!height) {
			height = Utils.numberBetween(Values.roomMinHeight, Values.roomMaxHeight);
		}

		const building = Building.generate(dungeon, width, height, interpolate);

		building.type = BuildingTypes.ROOM;

		Content.rooms.push(building);

		return building;
	}

	return {
		generate
	};
})();