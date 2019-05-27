window.onload = () => {
	if (Values.autoAdjustLinesAndColumns) {
		Values.lines = Math.floor(window.innerHeight / Values.tileSize);
		Values.columns = Math.floor(window.innerWidth / Values.tileSize);
		Values.maxRoomsQuantity = Math.floor(((Values.lines + Values.columns) / ((Values.roomMaxHeight + Values.roomMaxWidth + Values.roomMinHeight + Values.roomMinHeight) / 4)) / 0.5);

		console.log(Values);
	}

	console.log(`Creating dungeon with ${Values.maxRoomsQuantity} rooms of size ${Values.lines}X${Values.columns}...`);

	// Always generate with less 2 to add border walls later
	Values.dungeon = Dungeon.initiate(Values.lines - 2, Values.columns - 2);

	Values.dungeon = Dungeon.generateRoomsAndCorridors(Values.dungeon, Values.maxRoomsQuantity, true);

	Values.dungeon = Dungeon.generateDoors(Values.dungeon);

	Values.dungeon = Stair.generateStair(Values.dungeon, Tiles.stairDown);

	Values.dungeon = Stair.generateStair(Values.dungeon, Tiles.stairUp);

	Values.dungeon = Dungeon.addBorders(Values.dungeon);

	Print.printDungeonOnBody(Values.dungeon);

	console.log(`Dungeon generated with ${Content.rooms.length} rooms and ${Content.corridors.length} corridors.`);
};