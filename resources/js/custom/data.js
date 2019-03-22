window.onload = () => {
	Values.map = Mapper.initiateMap(Values.lines, Values.columns);

	Values.map = Room.generateFirstRoom(Values.map);

	Values.map = Mapper.generateMap(Values.map, 2000);

	Values.map = Stair.generateStairDown(Values.map, 500);

	Values.map = Stair.generateStairUp(Values.map, 500);

	Print.printMapOnBody(Values.map);
};