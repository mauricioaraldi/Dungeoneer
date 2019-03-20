const Values = {
	map: [],
	lines: 47,
	columns: 95,
	roomMinWidth: 2,
	roomMaxWidth: 6,
	roomMinHeight: 2,
	roomMaxHeight: 6,
	tileSize: 20
};

const Tiles = {
	door: '5',
	wall: '#',
	floor: '_',
	stairDown: 'V',
	stairUp: 'A'
};

const Content = {
	rooms: [],
	corridors: [],
	stairsUp: [],
	stairsDown: []
};