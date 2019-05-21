window.onload = () => {
	// Always generate with less 2 to add border walls later
	Values.dungeon = Dungeon.initiate(Values.lines - 2, Values.columns - 2);

	Values.dungeon = Room.generateFirstRoom(Values.dungeon);

	Values.dungeon = Dungeon.generateRoomsAndCorridors(Values.dungeon, 20);

	Values.dungeon = Dungeon.generateDoors(Values.dungeon);

	// Values.dungeon = Stair.generateStairDown(Values.dungeon, 500);

	// Values.dungeon = Stair.generateStairUp(Values.dungeon, 500);

	// TODO - Add map borders

	Print.printDungeonOnBody(Values.dungeon);
};