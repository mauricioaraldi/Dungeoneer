/* eslint-disable-next-line no-unused-vars */
const Values = {
		dungeon: [],
		lines: 36,
		columns: 95,
		roomMinWidth: 2,
		roomMaxWidth: 6,
		roomMinHeight: 2,
		roomMaxHeight: 6,
		tileSize: 20
	},

	/* eslint-disable-next-line no-unused-vars */
	Tiles = {
		door: '5',
		wall: '#',
		floor: '_',
		stairDown: 'V',
		stairUp: 'A'
	},

	/* eslint-disable-next-line no-unused-vars */
	Content = {
		rooms: [],
		corridors: [],
		stairsUp: [],
		stairsDown: []
	},

	/* eslint-disable-next-line no-unused-vars */
	BuildingTypes = {
		CORRIDOR: 'CORRIDOR',
		ROOM: 'ROOM'
	};