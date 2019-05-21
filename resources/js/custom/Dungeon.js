/**
 * This module controls dungeon interactions
 *
 * @author mauricio.araldi
 * @since 0.3.0
 */
/* eslint-disable-next-line no-unused-vars */
const Dungeon = (() => {
	/**
	 * Initiate the dungeon with only walls
	 *
	 * @author mauricio.araldi
	 * @since 0.3.0
	 *
	 * @param {integer} lines The number of lines to generate
	 * @param {integer} columns The number of columns to generate
	 * @return {Array<Array<string>>} An empty dungeon
	 */
	function initiate(lines, columns) {
		const dungeon = [];

		while (lines--) {
			dungeon.push(Tiles.wall.repeat(columns).split(''));
		}

		return dungeon;
	}

	/**
	 * Generate rooms and corridors
	 *
	 * @author mauricio.araldi
	 * @since 0.4.0
	 *
	 * @param {Array<Array<string>>} dungeon The dungeon to be filled
	 * @param {integer} totalTries The number of tries before returning dungeon
	 * @param {boolean} canInterpolate If the generated rooms can be interpolated
	 * @param {integer} [currentTry = 0] Current try
	 * @return {Array<Array<string>>} The filled dungeon
	 */
	function generateRoomsAndCorridors(dungeon, totalTries, canInterpolate, currentTry = 0) {
		const formatChance = Utils.numberBetween(1, 8),
			interpolateChance = canInterpolate ? Utils.numberBetween(1, 2) : 0;

		if (formatChance === 1) {
			Corridor.generate(dungeon, interpolateChance === 1);
		} else if (formatChance >= 2) {
			Room.generate(dungeon, interpolateChance === 1);
		}

		if (++currentTry === totalTries) {
			return dungeon;
		}

		return generateRoomsAndCorridors(dungeon, totalTries, canInterpolate, currentTry);
	}

	/**
	 * Generates doors between all rooms in the cave
	 *
	 * @author mauricio.araldi
	 * @since 0.4.0
	 *
	 * @param {Array<Array<string>>} dungeon The dungeon to have its doors generated
	 * @return {Array<Array<string>>} The dungeon with all doors
	 */
	function generateDoors(dungeon) {
		let buildings = [...Content.rooms, ...Content.corridors],
			buildingNeighbors = [];

		buildings.forEach((building, index) => {
			building.borderAreasWithNeighbor = building.getBuildableBorderAreas(0);
			buildingNeighbors[index] = { originalIndex: index };
		});

		buildings.forEach((building, index) => {
			for (let i = index + 1; i < buildings.length; i++) {
				let neighbor = buildings[i];

				building.borderAreasWithNeighbor.forEach(buildingArea => {
					neighbor.borderAreasWithNeighbor.forEach(neighborArea => {
						if (buildingArea[0] === neighborArea[0]
							&& buildingArea[1] === neighborArea[1]) {
							if (!buildingNeighbors[index][i]) {
								buildingNeighbors[index][i] = [];
							}

							if (!buildingNeighbors[i][index]) {
								buildingNeighbors[i][index] = [];
							}

							buildingNeighbors[index][i].push(buildingArea);
							buildingNeighbors[i][index].push(neighborArea);
						}
					});
				});
			}
		});

		while (buildingNeighbors.length) {
			buildingNeighbors.sort((a, b) => Object.keys(a).length - Object.keys(b).length);

			let building = buildingNeighbors[0],
				neighborIndex = Object.keys(building)[0],
				possibleAreas = building[neighborIndex],
				randomArea = Utils.numberBetween(0, possibleAreas.length - 1);

			Utils.fillRect(
				Tiles.door,
				dungeon,
				possibleAreas[randomArea][0],
				possibleAreas[randomArea][1]
			);

			buildingNeighbors.forEach(buildingToDeleteFrom => {
				delete buildingToDeleteFrom[building.originalIndex];
			});

			buildingNeighbors = buildingNeighbors.slice(1).filter(building => Object.keys(building).length > 1);
		}

		return dungeon;
	}

	return {
		initiate,
		generateDoors,
		generateRoomsAndCorridors
	};
})();