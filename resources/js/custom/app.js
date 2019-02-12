App = {
	Values: {
		map: [],
		lines: 35,
		columns: 60,
		roomMinWidth: 2,
		roomMaxWidth: 10,
		roomMinHeight: 2,
		roomMaxHeight: 10,
		tileSize: 20,
	},
	
	Tiles: {
		door: '5',
		wall: '#',
		floor: '_',
		stairDown: 'V',
		stairUp: 'A',
	},

	Content: {
		rooms: [],
		corridors: [],
		stairsUp: [],
		stairsDown: [],
	},
	
	Utils: {
		numberBetween : function(min, max) { //TODO Find a better logic
			var num = Math.random(); //Generate random number
			num = num * max; //Limitate it to the maximum
			num = Math.floor(num) + min; //Adds the minimum
			
			//Verify if is not above the max
			if (num > max) {
				return max; //If it is, returns max itself
			}
			
			return num;
		},
	}
};