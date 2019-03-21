const Values = {
		map: [],
		lines: 47,
		columns: 95,
		roomMinWidth: 2,
		roomMaxWidth: 6,
		roomMinHeight: 2,
		roomMaxHeight: 6,
		tileSize: 20
	},

	Tiles = {
		door: '5',
		wall: '#',
		floor: '_',
		stairDown: 'V',
		stairUp: 'A'
	},

	Content = {
		rooms: [],
		corridors: [],
		stairsUp: [],
		stairsDown: []
	};