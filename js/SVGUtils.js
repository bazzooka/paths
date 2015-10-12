let SVGUtils = {
	getLastPosFrom: function(controls, fromIndexTmp){
		let lastX = "",
		lastY = "",
		fromIndex = fromIndexTmp ? fromIndexTmp : controls.length;
		for(let i = fromIndex - 1; i >= 0; i--){
			if(lastX === "" && controls[i].x && controls[i].x !== ""){
				lastX = controls[i].x;
			}

			if(lastY === "" && controls[i].y && controls[i].y !== ""){
				lastY = controls[i].y;
			}
		}
		return {
			x: lastX,
			y: lastY
		}
	}
}

module.exports = SVGUtils;