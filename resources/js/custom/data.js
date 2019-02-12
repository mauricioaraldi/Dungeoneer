$(function() {
	App.Values.map = App.Map.initiateMap(App.Values.lines, App.Values.columns);
	
	App.Values.map = App.Room.generateFirstRoom(App.Values.map);
	
	App.Values.map = App.Map.generateMap(App.Values.map, 1500);
	
	App.Values.map = App.Stair.generateStairDown(App.Values.map, 500);
	
	App.Values.map = App.Stair.generateStairUp(App.Values.map, 500);

	//App.Print.printMapOnBody(App.Values.map);

	App.Print.printColoredMapOnBody(App.Values.map);
});