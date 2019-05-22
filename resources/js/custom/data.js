window.onload = () => {
	// Always generate with less 2 to add border walls later
	Values.dungeon = Dungeon.initiate(Values.lines - 2, Values.columns - 2);

	Values.dungeon = Room.generateFirstRoom(Values.dungeon);

	Values.dungeon = Dungeon.generateRoomsAndCorridors(Values.dungeon, 30);

	Values.dungeon = Dungeon.generateDoors(Values.dungeon);

	Values.dungeon = Stair.generateStair(Values.dungeon, Tiles.stairDown);

	Values.dungeon = Stair.generateStair(Values.dungeon, Tiles.stairUp);

	Values.dungeon = Dungeon.addBorders(Values.dungeon);

	Print.printDungeonOnBody(Values.dungeon);
};