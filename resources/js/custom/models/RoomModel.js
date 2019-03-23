/* eslint-disable-next-line no-unused-vars */
function RoomModel(initLine, initColumn, endLine, endColumn, buildableAreas) {
	this.prototype = BuildingModel(initLine, initColumn, endLine, endColumn, buildableAreas);
	this.type = BuildingTypes.ROOM;
}