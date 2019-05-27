/* eslint-disable-next-line no-unused-vars */
const Values = {
		autoAdjustLinesAndColumns: true,
		dungeon: [],
		lines: 30,
		columns: 30,
		roomMinWidth: 2,
		roomMaxWidth: 6,
		roomMinHeight: 2,
		roomMaxHeight: 6,
		maxRoomsQuantity: 100,
		maxRandomCoordinatesTry: 20,
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