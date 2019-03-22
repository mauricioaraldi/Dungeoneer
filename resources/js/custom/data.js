window.onload = () => {
	Values.dungeon = Dungeon.initiate(Values.lines, Values.columns);

	Values.dungeon = Room.generateFirstRoom(Values.dungeon);

	Values.dungeon = Dungeon.generateRoomsAndCorridors(Values.dungeon, 2000);

	Values.dungeon = Stair.generateStairDown(Values.dungeon, 500);

	Values.dungeon = Stair.generateStairUp(Values.dungeon, 500);

	Print.printDungeonOnBody(Values.dungeon);
};