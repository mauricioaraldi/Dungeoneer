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
	Directions = {
		BOTTOM: 'BOTTOM',
		BOTTOM_LEFT: 'BOTTOM_LEFT',
		BOTTOM_RIGHT: 'BOTTOM_RIGHT',
		CENTER: 'CENTER',
		LEFT: 'LEFT',
		RIGHT: 'RIGHT',
		TOP: 'TOP',
		TOP_LEFT: 'TOP_LEFT',
		TOP_RIGHT: 'TOP_RIGHT'
	},

	/* eslint-disable-next-line no-unused-vars */
	BuildingTypes = {
		CORRIDOR: 'CORRIDOR',
		ROOM: 'ROOM'
	};