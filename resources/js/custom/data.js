window.onload = () => {
	Values.map = Map.initiateMap(Values.lines, Values.columns);
	
	Values.map = Room.generateFirstRoom(Values.map);
	
	Values.map = Map.generateMap(Values.map, 3000);
	
	Values.map = Stair.generateStairDown(Values.map, 500);
	
	Values.map = Stair.generateStairUp(Values.map, 500);

	// Print.printMapOnBody(Values.map);
	Print.printColoredMapOnBody(Values.map);
};