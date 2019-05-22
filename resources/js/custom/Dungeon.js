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
	 * @param {integer} maxTries The number of tries before returning dungeon
	 * @param {boolean} canInterpolate If the generated rooms can be interpolated
	 * @param {integer} [currentTry = 0] Current try
	 * @return {Array<Array<string>>} The filled dungeon
	 */
	function generateRoomsAndCorridors(dungeon, maxTries, canInterpolate, currentTry = 0) {
		const formatChance = Utils.numberBetween(1, 8),
			interpolateChance = canInterpolate ? Utils.numberBetween(1, 2) : 0;

		if (formatChance === 1) {
			Corridor.generate(dungeon, interpolateChance === 1);
		} else if (formatChance >= 2) {
			Room.generate(dungeon, interpolateChance === 1);
		}

		if (++currentTry === maxTries) {
			return dungeon;
		}

		return generateRoomsAndCorridors(dungeon, maxTries, canInterpolate, currentTry);
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
			buildingNeighbors = checkInterpolatedNeighbors(getBuildingNeighborsList(buildings));

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

	/**
	 * [getBuildingNeighborsList description]
	 * @author mauricio.araldi
	 * @param {[type]} buildings [description]
	 * @return {[type]} [description]
	 */
	function getBuildingNeighborsList(buildings) {
		const buildingNeighbors = [],
			buildingsToVerify = [...buildings];

		buildingsToVerify.forEach((building, index) => {
			building.borderAreasWithNeighbor = building.getBuildableBorderAreas(0);
			buildingNeighbors[index] = { originalIndex: index };
		});

		buildingsToVerify.forEach((building, index) => {
			for (let i = index + 1; i < buildingsToVerify.length; i++) {
				let neighbor = buildingsToVerify[i];

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

		return buildingNeighbors;
	}

	/**
	 * Check if neighbors are interpolated and mix them
	 * 
	 * @author mauricio.araldi
	 * @since 0.4.0
	 * 
	 * @param {Array<Object>} neighbors The neighbors to be checked
	 * @return {Array<Object>} Neighbors mixed with their interpolations
	 */
	function checkInterpolatedNeighbors(neighbors) {
		const interpolatedNeighbors = [...neighbors];

		for (let i = 0; i < interpolatedNeighbors.length; i++) {
			let currentNeighbor = interpolatedNeighbors[i];

			for (let j = i + 1; j < interpolatedNeighbors.length; j++) {
				let nextNeighbor = interpolatedNeighbors[i];

				if (currentNeighbor.initLine >= nextNeighbor.initLine
					&& currentNeighbor.initLine <= nextNeighbor.initLine
					&& currentNeighbor.initColumn >= nextNeighbor.initColumn
					&& currentNeighbor.initColumn <= nextNeighbor.endColumn) {
					//Overlaps
				}
			}
		}

		return interpolatedNeighbors;
	}

	/**
	 * Add walls as borders on the current dungeon
	 *
	 * @author mauricio.araldi
	 * @since 0.4.0
	 *
	 * @param {Array<Array<string>>} dungeon The dungeon in which to add borders
	 * @return {Array<Array<string>>} The dungeon with borders
	 */
	function addBorders(dungeon) {
		dungeon.forEach(line => {
			line.unshift(Tiles.wall);
			line.push(Tiles.wall)
		});

		dungeon = [Tiles.wall.repeat(dungeon[0].length).split(''), ...dungeon, Tiles.wall.repeat(dungeon[0].length).split('')];

		for (let key in Content) {
			Content[key].forEach(building => {
				building.initLine++;
				building.endLine++;
				building.initColumn++;
				building.endColumn++;
			});
		}

		return dungeon;
	}

	return {
		addBorders,
		initiate,
		generateDoors,
		generateRoomsAndCorridors
	};
})();