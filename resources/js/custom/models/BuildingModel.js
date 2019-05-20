/* eslint-disable-next-line no-unused-vars */
function BuildingModel(dungeon, initLine, initColumn, endLine, endColumn) {
	this.dungeon = dungeon;
	this.initLine = initLine;
	this.initColumn = initColumn;
	this.endLine = endLine;
	this.endColumn = endColumn;

	/**
	 * Get all the buildable coordinates of the border area
	 *
	 * @author mauricio.araldi
	 * @since 0.4.0
	 *
	 * @param {integer} distanceFromRoom The distance that the buildable area needs to be from the room
	 * @return {Array<Array>} The buildable border areas
	 */
	this.getBuildableBorderAreas = (distanceFromRoom = 1) => {
		distanceFromRoom++;

		const borderAreas = [],
			borderInitLine = this.initLine - distanceFromRoom,
			borderEndLine = this.endLine + distanceFromRoom,
			borderInitColumn = this.initColumn - distanceFromRoom,
			borderEndColumn = this.endColumn + distanceFromRoom;

		for (let l = borderInitLine; l <= borderEndLine; l++) {
			for (let c = borderInitColumn; c <= borderEndColumn; c++) {
				if (l === borderInitLine || l === borderEndLine
					|| c === borderInitColumn || c === borderEndColumn) {
					if (l >= 0 && c >= 0 && l < this.dungeon.length && c < this.dungeon[0].length) {
						borderAreas.push([l, c]);
					}
				}
			}
		}

		return borderAreas;
	};
}