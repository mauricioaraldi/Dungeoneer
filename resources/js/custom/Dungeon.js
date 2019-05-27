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
	 * @param {Array<Error>} [errors = 0] Errors that happened during creation
	 * @return {Array<Array<string>>} The filled dungeon
	 */
	function generateRoomsAndCorridors(dungeon, maxTries, canInterpolate, currentTry = 0, errors = []) {
		const formatChance = Utils.numberBetween(1, 8),
			interpolateChance = canInterpolate ? Utils.numberBetween(1, 5) : 0;

		try {
			if (formatChance === 1) {
				Corridor.generate(dungeon, interpolateChance === 1);
			} else if (formatChance >= 2) {
				Room.generate(dungeon, interpolateChance === 1);
			}
		} catch (error) {
			if (++currentTry === maxTries) {
				console.log(`${errors.length} happened during rooms and corridors creation.`);
				return dungeon;
			}

			errors.push(error);
		}

		if (++currentTry === maxTries) {
			console.log(`${errors.length} happened during rooms and corridors creation.`);
			return dungeon;
		}

		return generateRoomsAndCorridors(dungeon, maxTries, canInterpolate, currentTry, errors);
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
			buildingNeighbors = checkInterpolatedNeighbors(getBuildingNeighborsList(buildings))
					.filter(building => Object.keys(building.neighbors).length);

		while (buildingNeighbors.length) {
			buildingNeighbors.sort((a, b) => Object.keys(a.neighbors).length - Object.keys(b.neighbors).length);

			let building = buildingNeighbors[0],
				neighborIndex = parseInt(Object.keys(building.neighbors)[0]),
				neighbor = buildingNeighbors.find(buildingNeighbor => buildingNeighbor.originalIndex === neighborIndex),
				possibleAreas = building.neighbors[neighborIndex],
				randomArea = Utils.numberBetween(0, possibleAreas.length - 1);

			Utils.fillRect(
				Tiles.door,
				dungeon,
				possibleAreas[randomArea][0],
				possibleAreas[randomArea][1]
			);

			buildingNeighbors.forEach(buildingNeighbor => {
				delete buildingNeighbor.neighbors[building.originalIndex];
			});

			building.interpolates.forEach(buildingInterpolateIndex => {
				let buildingInterpolate = buildingNeighbors.find(
						buildingNeighbor => buildingNeighbor.originalIndex === buildingInterpolateIndex
					);

				if (!buildingInterpolate) {
					return;
				}

				delete buildingInterpolate.neighbors[neighbor.originalIndex];
				delete neighbor.neighbors[buildingInterpolateIndex];

				neighbor.interpolates.forEach(neighborInterpolateIndex => {
					delete buildingInterpolate.neighbors[neighborInterpolateIndex];
				});
			});

			neighbor.interpolates.forEach(neighborInterpolateIndex => {
				let neighborInterpolate = buildingNeighbors.find(
						buildingNeighbor => buildingNeighbor.originalIndex === neighborInterpolateIndex
					);

				if (!neighborInterpolate) {
					return;
				}

				delete neighborInterpolate.neighbors[building.originalIndex];
				delete building.neighbors[neighborInterpolateIndex];

				building.interpolates.forEach(buildingInterpolateIndex => {
					delete neighborInterpolate.neighbors[buildingInterpolateIndex];
				});
			});

			buildingNeighbors = buildingNeighbors.slice(1).filter(building => Object.keys(building.neighbors).length);
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
			buildingNeighbors[index] = { originalIndex: index, building, neighbors: {} };
		});

		buildingsToVerify.forEach((building, index) => {
			for (let i = index + 1; i < buildingsToVerify.length; i++) {
				let neighbor = buildingsToVerify[i];

				building.borderAreasWithNeighbor.forEach(buildingArea => {
					neighbor.borderAreasWithNeighbor.forEach(neighborArea => {
						if (buildingArea[0] === neighborArea[0]
							&& buildingArea[1] === neighborArea[1]) {
							if (!buildingNeighbors[index].neighbors[i]) {
								buildingNeighbors[index].neighbors[i] = [];
							}

							if (!buildingNeighbors[i].neighbors[index]) {
								buildingNeighbors[i].neighbors[index] = [];
							}

							buildingNeighbors[index].neighbors[i].push(buildingArea);
							buildingNeighbors[i].neighbors[index].push(neighborArea);
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
	 * @return {Array<Object>} Neighbors with interpolation info
	 */
	function checkInterpolatedNeighbors(neighbors) {
		if (neighbors.length < 2) {
			return neighbors;
		}

		for (let i = 0; i < neighbors.length; i++) {
			let currentNeighbor = neighbors[i];

			for (let j = i + 1; j < neighbors.length; j++) {
				let nextNeighbor = neighbors[j];

				if (!currentNeighbor.interpolates) {
					currentNeighbor.interpolates = new Set();
				}

				if (!nextNeighbor.interpolates) {
					nextNeighbor.interpolates = new Set();
				}

				if (
					currentNeighbor.building.initLine - 1 <= nextNeighbor.building.endLine &&
					currentNeighbor.building.endLine + 1 >= nextNeighbor.building.initLine &&
					currentNeighbor.building.initColumn - 1 <= nextNeighbor.building.endColumn &&
					currentNeighbor.building.endColumn + 1 >= nextNeighbor.building.initColumn
				) {
					if (currentNeighbor.building.initLine - 1 === nextNeighbor.building.endLine
						&& currentNeighbor.building.initColumn - 1 === nextNeighbor.building.endColumn) {
						continue;
					}

					if (currentNeighbor.building.initLine - 1 === nextNeighbor.building.endLine
						&& currentNeighbor.building.endColumn + 1 === nextNeighbor.building.initColumn) {
						continue;
					}

					if (currentNeighbor.building.endLine + 1 === nextNeighbor.building.initLine
						&& currentNeighbor.building.endColumn + 1 === nextNeighbor.building.initColumn) {
						continue;
					}

					if (currentNeighbor.building.endLine + 1 === nextNeighbor.building.initLine
						&& currentNeighbor.building.initColumn - 1 === nextNeighbor.building.endColumn) {
						continue;
					}

					currentNeighbor.interpolates.add(nextNeighbor.originalIndex);
					nextNeighbor.interpolates.add(currentNeighbor.originalIndex);
				}
			}
		}

		neighbors.forEach(building => {
			building.interpolates.forEach(interpolationIndex => {
				neighbors[interpolationIndex].interpolates.forEach(index => {
					building.interpolates.add(index);
					delete building.neighbors[index];
				});
			});
		});
		
		return neighbors;
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