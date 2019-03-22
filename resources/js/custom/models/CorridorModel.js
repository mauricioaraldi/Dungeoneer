/* eslint-disable-next-line no-unused-vars */
function CorridorModel(initLine, initColumn, endLine, endColumn, buildableAreas) {
	this = BuildingModel(initLine, initColumn, endLine, endColumn, buildableAreas);
	this.type = BuildingTypes.CORRIDOR;
}